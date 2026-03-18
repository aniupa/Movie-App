// import autocannon from "autocannon";
// import dotenv from "dotenv";
// import fs from "fs";
// dotenv.config();

// const port = process.env.PORT || 4000;

// // Load movies
// const movies = JSON.parse(fs.readFileSync("./movies.json"));

// // Your auth cookie token
// const TOKEN = process.env.AUTH_COOKIE_TOKEN;

// // Counter to rotate movie data
// let index = 0;

// function getNextMovie() {
//   const movie = movies[index % movies.length];
//   index++;
//   return JSON.stringify(movie);
// }

// const instance = autocannon(
//   {
//     url: `http://localhost:${port}/api/movies/`,
//     connections: 50, // number of concurrent users
//     duration: 30, // seconds
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Cookie: `token=${TOKEN}`, // send auth cookie
//     },
//     requests: [
//       {
//         setupRequest: (req) => {
//           req.body = getNextMovie();
//           return req;
//         },
//       },
//     ],
//   },
//   finishedBench,
// );

// function finishedBench(err, res) {
//   if (err) console.error(err);
//   console.log("Load test finished");
//   console.log(res);
// }

import {connectDB} from '../src/configs/db/db.js'
import dotenv from "dotenv";
import {movieModel} from "../src/models/movie.model.js";
import mongoose from 'mongoose';

dotenv.config();

const TMDB_KEY = process.env.TMDB_KEY;
// const MONGO_DB_URI = process.env.MONGO_DB_URI;

// config
const BATCH_SIZE = 5;       // parallel requests
const DELAY = 300;          // ms (rate limit safety)
const MAX_RETRIES = 3;

// 🔹 Utility: delay
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

// 🔹 Retry wrapper
const fetchWithRetry = async (url, retries = MAX_RETRIES) => {
  try {
    const res = await fetch(url);

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    return await res.json();
  } catch (err) {
    if (retries > 0) {
      console.log("🔁 Retrying...", url);
      await sleep(500);
      return fetchWithRetry(url, retries - 1);
    }
    throw err;
  }
};

// 🔹 Smart matching
const findBestMatch = (results, movie) => {
  if (!results?.length) return null;

  const title = movie.title.toLowerCase();

  // 1. exact match
  let match = results.find(
    (m) => m.title.toLowerCase() === title
  );

  // 2. partial match
  if (!match) {
    match = results.find((m) =>
      m.title.toLowerCase().includes(title)
    );
  }

  // 3. fallback first result
  return match || results[0];
};

const processMovie = async (movie) => {
  try {
    console.log(`🎬 Processing: ${movie.title}`);

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&query=${encodeURIComponent(
      movie.title
    )}`;

    const data = await fetchWithRetry(url);

    const match = findBestMatch(data.results, movie);

    if (!match) {
      console.log(`❌ No match: ${movie.title}`);
      return;
    }

    // update only required fields
    movie.tmdbId = match.id;
    movie.imgUrl = match.poster_path;

    movie.thumbnail = match.backdrop_path;

    await movie.save();

    console.log(`✅ Updated: ${movie.title} → ${match.id}`);
  } catch (err) {
    console.log(`❌ Error (${movie.title}):`, err.message);
  }

  await sleep(DELAY);
};

const backfillTMDB = async () => {
  try {
  await mongoose.connect(process.env.MONGO_DB_URI, {
  maxPoolSize: 100,        // increase pool
  minPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000
});
    console.log("connected to DB successfully");

    const movies = await movieModel.find({
      $or: [{ tmdbId: { $exists: false } }, { tmdbId: null }],
    });

    console.log(`📦 Found ${movies.length} movies to process\n`);

    for (let i = 0; i < movies.length; i += BATCH_SIZE) {
      const batch = movies.slice(i, i + BATCH_SIZE);

      await Promise.all(batch.map(processMovie));

      console.log(
        `📊 Progress: ${Math.min(i + BATCH_SIZE, movies.length)}/${movies.length}\n`
      );
    }

    console.log("🎉 Backfill complete");
    process.exit(0);
  } catch (err) {
    console.error("Fatal error:",process.env.MONGO_DB_URI, err);
    process.exit(1);
  }
};

backfillTMDB();
import autocannon from "autocannon";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

const port = process.env.PORT || 4000;

// Load movies
const movies = JSON.parse(fs.readFileSync("./movies.json"));

// Your auth cookie token
const TOKEN = process.env.AUTH_COOKIE_TOKEN;

// Counter to rotate movie data
let index = 0;

function getNextMovie() {
  const movie = movies[index % movies.length];
  index++;
  return JSON.stringify(movie);
}

const instance = autocannon(
  {
    url: `http://localhost:${port}/api/movies/`,
    connections: 50, // number of concurrent users
    duration: 30, // seconds
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `token=${TOKEN}`, // send auth cookie
    },
    requests: [
      {
        setupRequest: (req) => {
          req.body = getNextMovie();
          return req;
        },
      },
    ],
  },
  finishedBench,
);

function finishedBench(err, res) {
  if (err) console.error(err);
  console.log("Load test finished");
  console.log(res);
}

import autocannon from "autocannon";
import fs from "fs";

// Load movies
const movies = JSON.parse(fs.readFileSync("./movies.json"));

// Your auth cookie token
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NzVlMDBlYWUwY2M5ZjRjNDVhYzMwYSIsImlhdCI6MTc2OTgxNTUzNH0.2gOUXuV8BSvSvg1dhFnngPP1k4XXl6wkgskh3hZXfbs";

// Counter to rotate movie data
let index = 0;

function getNextMovie() {
  const movie = movies[index % movies.length];
  index++;
  return JSON.stringify(movie);
}

const instance = autocannon({
  url: "http://localhost:4000/api/movies/",
  connections: 50,        // number of concurrent users
  duration: 30,           // seconds
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Cookie": `token=${TOKEN}`   // send auth cookie
  },
  requests: [
    {
      setupRequest: (req) => {
        req.body = getNextMovie();
        return req;
      }
    }
  ]
}, finishedBench);

function finishedBench(err, res) {
  if (err) console.error(err);
  console.log("Load test finished");
  console.log(res);
}

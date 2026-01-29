import autocannon from "autocannon";
import axios from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";


// Create cookie jar
const jar = new CookieJar();

const client = wrapper(axios.create({ jar, withCredentials: true }));

const BASE_URL = "http://localhost:3000";

// 🔐 Admin login to get auth cookie
async function login() {
  console.log("Logging in as admin...");

  await client.post(`${BASE_URL}/api/auth/user/login`, {
    email: "admin@gmail.com",
    password: "admin@123",
  });

  const cookies = await jar.getCookies(BASE_URL);
  const cookieHeader = cookies.map(c => `${c.key}=${c.value}`).join("; ");

  console.log("Login success. Cookie acquired.");
  return cookieHeader;
}

// 🎬 Random movie generator
function generateMovie() {
  const rand = Math.floor(Math.random() * 100000);

  return JSON.stringify({
    title: `Load Test Movie ${rand}`,
    description: "Autocannon performance testing movie data",
    rating: +(Math.random() * 10).toFixed(1),
    releaseYear: 1980 + Math.floor(Math.random() * 45),
    duration: 80 + Math.floor(Math.random() * 60),
    imgUrl: "https://picsum.photos/200/300",
  });
}

// 🚀 Run load test
async function run() {
  const cookieHeader = await login();

  console.log("Starting autocannon test...\n");

  autocannon({
    url: `${BASE_URL}/api/movies`,
    method: "POST",
    connections: 20,        // concurrent users
    duration: 30,           // seconds
    pipelining: 1,
    headers: {
      "Content-Type": "application/json",
      "Cookie": cookieHeader,
    },
    requests: [
      {
        body: generateMovie(),
      },
    ],
  }, console.log);
}

run();

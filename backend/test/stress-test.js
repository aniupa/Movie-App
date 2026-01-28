import autocannon from "autocannon";

const targets = [
  {
    method: "GET",
    path: "/api/movies"
  },
  {
    method: "GET",
    path: "/api/movies/sort?rating=1"
  },
  {
    method: "POST",
    path: "/api/auth/user/login",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "ani2@gmail.com", password: "test" })
  }
];

autocannon({
  url: "http://localhost:3000",
  connections: 50,
  duration: 30,
  requests: targets
}, console.log);

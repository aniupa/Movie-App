import autocannon from "autocannon";
import fs from "fs";

const users = JSON.parse(fs.readFileSync("./register.json"));
let i = 0;

const instance = autocannon({
  url: "http://localhost:3000/api/auth/user/register",
  connections: 20,
  duration: 20,
  method: "POST",
  headers: { "Content-Type": "application/json" },
  setupRequest: (req) => {
    req.body = JSON.stringify(users[i % users.length]);
    i++;
    return req;
  }
}, console.log);

autocannon.track(instance);

import { Queue } from "bullmq";
import { redisConnection } from "../redis.js";


export const movieQueue = new Queue("movieQueue", {
  connection: redisConnection,
});

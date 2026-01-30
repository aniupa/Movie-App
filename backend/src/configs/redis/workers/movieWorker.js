import { Worker } from "bullmq";
import { redisConnection } from "../redis.js";
import { movieModel } from "../../../models/movie.model.js";
import { connectDB } from "../../db/db.js";

connectDB();

const worker = new Worker(
  "movieQueue",
  async (job) => {
    if (job.name === "ADD_MOVIE") {

      await movieModel.create(job.data);

      console.log("Movie saved to DB");
    }
  },
  {
    connection: redisConnection,
  },
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job.id} failed:`, err.message);
});

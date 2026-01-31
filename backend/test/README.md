To test the Redis-based lazy insertion and background worker flow, follow the steps below:

1️⃣ Validate Test Data

Ensure that the movies.json file contains valid JSON data and is properly formatted.

2️⃣ Admin Authentication

Log in as an admin user in the application.
After login, copy the value of the authentication cookie and add it to your backend .env file:

AUTH_COOKIE_TOKEN=your_admin_cookie_token_here

3️⃣ Redis Configuration

Make sure your backend .env file contains a valid Redis connection string:

REDIS_URL=redis://default:password@host:port

4️⃣ Start Backend Services

Open two separate terminals in the backend directory and run:

Terminal 1

npm run dev


Terminal 2

npm run worker


This will start the API server and the background worker that processes movie creation jobs from Redis.

5️⃣ Navigate to Load Test Folder

Open a new terminal and move to the test directory:

cd ./test/

6️⃣ Run the Load Test Script

Start the load test to simulate multiple movie insert requests:

node loadTest.js


This script will push movie data into the API, which will then be queued in Redis and processed asynchronously by the worker for insertion into MongoDB.

This confirms that the lazy insertion pipeline (API → Redis → Worker → MongoDB) is functioning correctly.
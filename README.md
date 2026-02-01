Great idea — a solid README will score you major points in evaluation. Here’s a **clean, professional README.md** you can directly use for your project. It reflects your **Redis queue + MongoDB lazy insertion architecture** and matches assignment requirements. 

---

# 🎬 MERN Stack Movie Application

**Role-Based Access Control + Scalable Backend Architecture**

A full-stack movie management system built using the **MERN stack** with **JWT authentication**, **admin role control**, and a **Redis-powered distributed queue** for scalable data insertion.

🔗 **Live Demo:** https://movieapp-vert-tau.vercel.app  
📦 **Backend API:** https://movie-app-y9ax.onrender.com  
🧠 **Tech Stack:** React | Node | Express | MongoDB | Redis

---

## 🚀 Features

### 👤 User Features

* View movie list with pagination
* Search movies by title or description
* Sort movies by:

  * Rating
  * Release Year
  * Duration
* Full-text search using MongoDB text index

### 👑 Admin Features

* Add new movies
* Edit existing movie details
*  delete movies

### 🔐 Authentication & Authorization

* JWT-based login system
* Role-based access control (User / Admin)
* Protected admin routes

---

## 🧠 Scalable Backend Architecture

Instead of directly inserting movie data into MongoDB, the system uses **Redis + BullMQ** for **lazy insertion**:

```
Admin POST /movies
        │
        ▼
Express API
        │
        ▼
Redis Queue (BullMQ)
        │
        ▼
Background Worker
        │
        ▼
MongoDB (movieModel.create)
```

### Benefits

✔ Non-blocking API
✔ Better performance under load
✔ Automatic retry for failed jobs
✔ Scalable background processing

---

## 🏗️ Tech Stack

| Layer          | Technology                       |
| -------------- | -------------------------------- |
| Frontend       | React.js + Material UI           |
| Backend        | Node.js + Express.js             |
| Database       | MongoDB + Mongoose               |
| Queue System   | Redis + BullMQ                   |
| Authentication | JWT                              |
| Deployment     | Vercel / Railway / MongoDB Atlas |

---

## 📁 Project Structure (Backend)

```
backend/
│── src/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── queues/
│   ├── configs/
│         ├── db/
│   │     └── redis/
│   │           ├── queue.js
│   │           ├── redis.js
│   │           └── workers/
│   │                 └── movieWorker.js
│   └── app.js
│
│── .env
│── package.json
```

---

## ⚙️ Environment Variables (.env)

```

MONGO_URI=your_mongodb_connection_string

REDIS_URL=redis://default:password@host:port
ADMIN_EMAIL=your_email
ADMIN_PASSWORD=your_password

JWT_SECRET=your_secret_key
```

---

## 🖥️ Running the Project

### 1️⃣ Install Dependencies

```bash
cd backend
npm install
```

### 2️⃣ Start API Server

```bash
npm run server
```

### 3️⃣ Start Background Worker

```bash
npm run worker
```

---

## 📡 API Endpoints

| Method | Route          | Access | Description        |
| ------ | -------------- | ------ | ------------------ |
| GET    | /movies        | Public | Get all movies     |
| GET    | /movies/sort   | Public | Sorted results     |
| POST   | /movies        | Admin  | Add movie (queued) |
| PUT    | /movies/:id    | Admin  | Edit movie         |
| DELETE | /movies/:id    | Admin  |      delete        |

---

## 🗄️ Movie Schema

Key indexed fields for performance:

* Title (text index)
* Description (text index)
* Rating
* Release Year
* Duration

---

## 🔄 Queue Worker

The worker runs separately and processes movie creation jobs:

```bash
npm run worker
```

It connects to MongoDB independently and saves movie data from the queue.

---

## 🌍 Deployment Notes

| Service  | Platform         |
| -------- | ---------------- |
| Frontend | Vercel           |
| Backend  | Railway / Render |
| Database | MongoDB Atlas    |
| Redis    | Redis Cloud      |

---

## 🧪 Performance Considerations

* MongoDB indexes for search & sorting
* Background processing using Redis
* Non-blocking API responses
* Scalable worker architecture

---

## 📌 Evaluation Checklist Covered

✔ Role-based access
✔ Secure JWT authentication
✔ Optimized queries & indexes
✔ Distributed queue for scalability
✔ Fully structured backend
✔ Production-style architecture

---

## 👨‍💻 Author

Developed as part of MERN stack assignment focusing on **scalable system design** and **secure role-based access control**.


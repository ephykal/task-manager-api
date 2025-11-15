# 🧠 Task Manager API Project

This is a backend RESTful API for managing tasks, built with **Node.js**, **Express**, and **TypeScript**. It was developed as part of a technical assessment and showcases clean architecture, proper validation, in-memory data handling, error management, and good API design practices.

---

## 📌 Project Objectives

- Design a well-structured REST API for task management
- Support full CRUD operations on tasks
- Include input validation and proper error handling
- Demonstrate good coding style and REST principles
- Bonus: Add pagination, filtering, and middleware usage

---

## 📦 Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **Joi** (input validation)
- **uuid** (unique task IDs)

---

## ✅ Features Implemented

- Full CRUD: Create, Read, Update, Delete tasks
- Filter by status: `GET /tasks?status=completed`
- Pagination support: `GET /tasks?page=1&limit=10`
- Input validation with **Joi**
- In-memory data storage (no DB)
- Custom middlewares:
  - **Logger** – logs every request
  - **Error handler** – centralizes error responses
- UUID validation for all task IDs

---

## 🔗 API Endpoints

| Method | Endpoint         | Description                           |
| ------ | ---------------- | ------------------------------------- |
| GET    | `/api/tasks`     | Get all tasks (with optional filters) |
| GET    | `/api/tasks/:id` | Get a single task by ID               |
| POST   | `/api/tasks`     | Create a new task                     |
| PUT    | `/api/tasks/:id` | Update a task                         |
| DELETE | `/api/tasks/:id` | Delete a task                         |

### Query Filters

- `status`: `"pending"`, `"in-progress"`, `"completed"`
- `page`: integer (pagination)
- `limit`: integer (pagination)

---

## 🛠️ How to Run Locally

### Prerequisites

- Node.js (v18+)
- npm

### Setup

```bash
# Clone the repository
git clone https://github.com/ephykal/task-manager-api.git
cd task-manager-api

# Install dependencies
npm install

# Run the server
npm run dev
```

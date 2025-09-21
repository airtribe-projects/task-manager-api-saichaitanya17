# Task Manager API

A simple **Node.js + Express** based Task Manager API that supports **CRUD operations**, **filtering**, **sorting**, and **priority-based retrieval** of tasks.

---

## 🚀 Features

- Create, Read, Update, and Delete (CRUD) tasks.
- Filter tasks by completion status (`completed=true` or `completed=false`).
- Sort tasks by ID (ascending/descending).
- Retrieve tasks by priority level (`low`, `medium`, `high`).
- Input validation for creating and updating tasks.
- Middleware-based logging and response formatting.

---

## 📂 Project Structure

```
.
├── app.js         # Main Express server
├── package.json   # Dependencies and scripts
└── README.md      # Project documentation
```

---

## ⚙️ Setup Instructions

1. **Clone the repository** (or copy the project files).
   ```bash
   git clone <your-repo-url>
   cd task-manager-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   node app.js
   ```

4. The server will run on:
   ```
   http://localhost:3000
   ```

---

## 📌 API Endpoints

### 1. Root
- **GET /**  
  Returns a hello message.  
  **Response:**  
  ```json
  "Helloworld project 1 crud operations"
  ```

---

### 2. Get All Tasks
- **GET /api/v1/tasks**  
  Retrieves all tasks.  
  **Query Parameters:**
  - `completed=true|false` → Filter by completion.
  - `sort=asc|desc` → Sort by task `id`.

  **Example:**  
  ```
  GET /api/v1/tasks?completed=true&sort=desc
  ```

---

### 3. Get Task by ID
- **GET /api/v1/tasks/:id**  
  Retrieves a task by its ID.  
  **Response (404 if not found):**
  ```json
  { "message": "Task not found" }
  ```

---

### 4. Get Tasks by Priority
- **GET /api/v1/tasks/priority/:level**  
  Retrieves tasks by priority (`low`, `medium`, `high`).  
  **Example:**  
  ```
  GET /api/v1/tasks/priority/high
  ```

---

### 5. Create Task
- **POST /api/v1/tasks**  
  Creates a new task.  
  **Request Body:**
  ```json
  {
    "title": "New Task",
    "description": "Details of the task",
    "completed": false,
    "priority": "medium"
  }
  ```
  **Validation:**
  - `title` and `description` are required.
  - `completed` must be boolean (if provided).
  - `priority` must be one of: `low`, `medium`, `high`.

---

### 6. Update Task
- **PUT /api/v1/tasks/:id**  
  Updates an existing task.  
  **Request Body:**
  ```json
  {
    "title": "Updated Title",
    "description": "Updated description",
    "completed": true,
    "priority": "high"
  }
  ```
  **Validation:**
  - Same as `POST`.

---

### 7. Delete Task
- **DELETE /api/v1/tasks/:id**  
  Deletes a task by ID.  
  **Response (404 if not found):**
  ```json
  { "message": "task not found" }
  ```

---

## 🧪 Testing the API

You can test the API using:

- **Postman**
  - Import requests and send requests to `http://localhost:3000`.
- **cURL**
  ```bash
  curl -X GET http://localhost:3000/api/v1/tasks
  curl -X POST http://localhost:3000/api/v1/tasks        -H "Content-Type: application/json"        -d '{"title":"Test","description":"Demo","completed":false,"priority":"low"}'
  ```

---

## ✅ Example Task Object

```json
{
  "id": 1,
  "title": "Write project proposal",
  "description": "Draft the initial project proposal and share with the team",
  "completed": false,
  "priority": "high"
}
```

---

## 📖 License

This project is for **learning/demo purposes**.  
Feel free to extend and use it as needed.

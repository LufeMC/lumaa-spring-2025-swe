# Full-Stack Coding Challenge


## App features
- Nest JS 
- Protected routes
- CORS
- Error handling
- Password hashing
- JWT token auth

## Backend Setup (NestJS)

1. **Installing PostgreSQL (Mac)**:
   ```bash
   brew install postgresql
   ```

2. **Starting PostgreSQL (Mac)**:
   ```bash
   brew services start postgresql
   ```

3. **Creating the Database**:
   ```sql
   CREATE DATABASE task_manager;
   ```

4. **Set Your Environment Variables**:
   Create a `.env` file in the root of the backend folder with the following variables:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=your_username
   DB_PASSWORD=your_db_password
   DB_DATABASE=task_management
   JWT_SECRET=your_secret
   ```

5. **Starting the Nest Backend Server**:
   ```bash
   cd backend
   npm install
   nest start
   ```

   The API root route is available at:  
   `http://localhost:3000/api/v1/`

---

## API Documentation

### Base URL
All API endpoints are prefixed with the base URL:
```
http://localhost:3000/api/v1/tasks
```

Authentication is required for all endpoints. Include the JWT token in the `Authorization` header:
```
Authorization: Bearer <your_jwt_token>
```

---

### 1. Get All Tasks
Retrieves a list of all tasks for the authenticated user.

- **Endpoint**: `GET /tasks`
- **Authentication**: Required (JWT)
- **Response**:
  - **Status Code**: `200 OK`
  - **Body**:
    ```json
    [
      {
        "id": 1,
        "title": "Task Title",
        "description": "Task Description",
        "isComplete": false
      },
      {
        "id": 2,
        "title": "Another Task",
        "description": "Another Description",
        "isComplete": true
      }
    ]
    ```

---

### 2. Create a New Task
Creates a new task for the authenticated user.

- **Endpoint**: `POST /tasks`
- **Authentication**: Required (JWT)
- **Request Body**:
  ```json
  {
    "title": "New Task Title",
    "description": "New Task Description"
  }
  ```
- **Response**:
  - **Status Code**: `201 Created`
  - **Body**:
    ```json
    {
      "id": 3,
      "title": "New Task Title",
      "description": "New Task Description",
      "isComplete": false
    }
    ```

---

### 3. Update an Existing Task
Updates an existing task by its ID.

- **Endpoint**: `PUT /tasks/:id`
- **Authentication**: Required (JWT)
- **Path Parameter**:
  - `id`: The ID of the task to update.
- **Request Body**:
  ```json
  {
    "title": "Updated Task Title",
    "description": "Updated Task Description",
    "isComplete": true
  }
  ```
- **Response**:
  - **Status Code**: `200 OK`
  - **Body**:
    ```json
    {
      "id": 1,
      "title": "Updated Task Title",
      "description": "Updated Task Description",
      "isComplete": true
    }
    ```

---

### 4. Delete a Task
Deletes a task by its ID.

- **Endpoint**: `DELETE /tasks/:id`
- **Authentication**: Required (JWT)
- **Path Parameter**:
  - `id`: The ID of the task to delete.
- **Response**:
  - **Status Code**: `200 OK`
  - **Body**:
    ```json
    {
      "message": "Task deleted successfully"
    }
    ```

---

### Error Responses
For all endpoints, the following error responses may occur:

#### Unauthorized Access
- **Status Code**: `401 Unauthorized`
- **Body**:
  ```json
  {
    "message": "Unauthorized"
  }
  ```

#### Task Not Found
- **Status Code**: `404 Not Found`
- **Body**:
  ```json
  {
    "message": "Task not found"
  }
  ```

#### Validation Errors
If the request body does not meet validation requirements (e.g., missing required fields), the following response will be returned:
- **Status Code**: `400 Bad Request`
- **Body**:
  ```json
  {
    "message": ["title should not be empty", "description must be a string"]
  }
  ```

---

### Example Usage with `curl`

#### Get All Tasks
```bash
curl -X GET http://localhost:3000/api/v1/tasks \
-H "Authorization: Bearer <your_jwt_token>"
```

#### Create a New Task
```bash
curl -X POST http://localhost:3000/api/v1/tasks \
-H "Authorization: Bearer <your_jwt_token>" \
-H "Content-Type: application/json" \
-d '{"title": "New Task", "description": "This is a new task"}'
```

#### Update a Task
```bash
curl -X PUT http://localhost:3000/api/v1/tasks/1 \
-H "Authorization: Bearer <your_jwt_token>" \
-H "Content-Type: application/json" \
-d '{"title": "Updated Task", "description": "Updated description", "isComplete": true}'
```

#### Delete a Task
```bash
curl -X DELETE http://localhost:3000/api/v1/tasks/1 \
-H "Authorization: Bearer <your_jwt_token>"
```

---

## Frontend (Vite, TypeScript)

1. **Starting the App**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Expectations
> at least $2500 / month

## Video

Here’s how you can include the video demo link in a `.md` (Markdown) file. You can create a new file, for example, `video-demo.md`, and add the following content:

---

# Video Demo

A brief screen recording of the Task Management application is available below. The video demonstrates the following features:

- User registration and login.
- Creating, updating, and deleting tasks.

You can view the video demo by clicking the link below:

[Watch Video Demo](https://drive.google.com/file/d/19Q5bdkoDiIzprWUJleogNgY09ObqvT28/view?usp=sharing)

# Task Manager API Documentation

## Base URL
```
http://localhost:3000
```

## Authentication
All task-related endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### Authentication

#### Register User
```http
POST /auth/register
```

Request Body:
```json
{
  "username": "string (min: 3, max: 50)",
  "password": "string (min: 6, max: 50)"
}
```

Response (201):
```json
{
  "token": "string (JWT)"
}
```

Error Responses:
- 400: Username already exists
- 500: Error creating user

#### Login User
```http
POST /auth/login
```

Request Body:
```json
{
  "username": "string",
  "password": "string"
}
```

Response (200):
```json
{
  "token": "string (JWT)"
}
```

Error Responses:
- 401: Invalid credentials
- 500: Error logging in

### Tasks

#### Get All Tasks
```http
GET /tasks
```

Response (200):
```json
[
  {
    "id": "number",
    "title": "string",
    "description": "string (optional)",
    "isComplete": "boolean",
    "userId": "number"
  }
]
```

Error Responses:
- 401: Unauthorized
- 500: Error fetching tasks

#### Create Task
```http
POST /tasks
```

Request Body:
```json
{
  "title": "string (required, max: 100)",
  "description": "string (optional, max: 500)",
  "isComplete": "boolean (default: false)"
}
```

Response (201):
```json
{
  "id": "number",
  "title": "string",
  "description": "string",
  "isComplete": "boolean",
  "userId": "number"
}
```

Error Responses:
- 400: Invalid input
- 401: Unauthorized
- 500: Error creating task

#### Update Task
```http
PUT /tasks/:id
```

Request Body (all fields optional):
```json
{
  "title": "string",
  "description": "string",
  "isComplete": "boolean"
}
```

Response (200):
```json
{
  "id": "number",
  "title": "string",
  "description": "string",
  "isComplete": "boolean",
  "userId": "number"
}
```

Error Responses:
- 400: Invalid input
- 401: Unauthorized
- 404: Task not found
- 500: Error updating task

#### Delete Task
```http
DELETE /tasks/:id
```

Response (204): No content

Error Responses:
- 401: Unauthorized
- 404: Task not found
- 500: Error deleting task

## Error Response Format
All error responses follow this format:
```json
{
  "message": "string (error description)"
}
```

## Rate Limiting
- Maximum 100 requests per minute per IP
- Maximum 1000 requests per hour per user

## Notes
- All timestamps are in ISO 8601 format
- All IDs are integers
- The API uses JSON for request and response bodies
- UTF-8 encoding is used for all text 
# API Documentation

## Base URL
```
http://localhost:8080/api/v1
```

## Authentication
All API endpoints except `/auth/*` require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## API Endpoints

### Authentication

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe",
    "role": "PATIENT"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
    "email": "user@example.com",
    "password": "password123"
}
```

### Users

#### Get User Profile
```http
GET /users/profile
Authorization: Bearer <token>
```

#### Update User Profile
```http
PUT /users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
    "name": "John Doe",
    "phone": "+1234567890",
    "address": "123 Main St"
}
```

### Doctors

#### List Doctors
```http
GET /doctors
Authorization: Bearer <token>
Query Parameters:
- specialty (optional)
- availability (optional)
- rating (optional)
```

#### Get Doctor Details
```http
GET /doctors/{doctorId}
Authorization: Bearer <token>
```

#### Get Doctor Schedule
```http
GET /doctors/{doctorId}/schedule
Authorization: Bearer <token>
Query Parameters:
- date (YYYY-MM-DD)
```

### Appointments

#### Create Appointment
```http
POST /appointments
Authorization: Bearer <token>
Content-Type: application/json

{
    "doctorId": "doctor123",
    "date": "2024-03-20",
    "time": "14:30",
    "reason": "Regular checkup"
}
```

#### List User Appointments
```http
GET /appointments
Authorization: Bearer <token>
Query Parameters:
- status (PENDING/APPROVED/CANCELLED)
- date (YYYY-MM-DD)
```

#### Update Appointment
```http
PUT /appointments/{appointmentId}
Authorization: Bearer <token>
Content-Type: application/json

{
    "status": "CANCELLED",
    "reason": "Emergency"
}
```

### Chat

#### Send Message
```http
POST /chat/messages
Authorization: Bearer <token>
Content-Type: application/json

{
    "recipientId": "user123",
    "content": "Hello, how can I help you?",
    "type": "TEXT"
}
```

#### Get Chat History
```http
GET /chat/messages
Authorization: Bearer <token>
Query Parameters:
- recipientId
- limit (default: 50)
- before (timestamp)
```

## WebSocket Endpoints

### Chat Connection
```
ws://localhost:8080/ws/chat
```

### Real-time Updates
```
ws://localhost:8080/ws/updates
```

## Error Responses

All error responses follow this format:
```json
{
    "timestamp": "2024-03-19T10:30:00Z",
    "status": 400,
    "error": "Bad Request",
    "message": "Invalid input",
    "path": "/api/v1/appointments"
}
```

Common HTTP Status Codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Rate Limiting

API requests are limited to:
- 100 requests per minute for authenticated users
- 20 requests per minute for unauthenticated users

## Pagination

List endpoints support pagination with the following query parameters:
- page (default: 0)
- size (default: 20)
- sort (field,direction)

Example:
```
GET /doctors?page=0&size=10&sort=name,asc
```

## Data Models

### User
```json
{
    "id": "string",
    "email": "string",
    "name": "string",
    "role": "PATIENT|DOCTOR|ADMIN",
    "phone": "string",
    "address": "string",
    "createdAt": "datetime",
    "updatedAt": "datetime"
}
```

### Doctor
```json
{
    "id": "string",
    "userId": "string",
    "specialty": "string",
    "qualification": "string",
    "experience": "number",
    "rating": "number",
    "availability": {
        "monday": ["09:00-17:00"],
        "tuesday": ["09:00-17:00"],
        // ... other days
    }
}
```

### Appointment
```json
{
    "id": "string",
    "doctorId": "string",
    "patientId": "string",
    "date": "date",
    "time": "time",
    "status": "PENDING|APPROVED|CANCELLED",
    "reason": "string",
    "notes": "string",
    "createdAt": "datetime",
    "updatedAt": "datetime"
}
```

### Message
```json
{
    "id": "string",
    "senderId": "string",
    "recipientId": "string",
    "content": "string",
    "type": "TEXT|IMAGE|FILE",
    "status": "SENT|DELIVERED|READ",
    "createdAt": "datetime"
}
``` 
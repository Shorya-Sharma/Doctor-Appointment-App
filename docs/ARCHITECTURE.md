# System Architecture

## Overview

The Doctor Appointment App is built using a microservices architecture with the following components:

1. Frontend (React Native Mobile App)
2. Backend (Spring Boot)
3. Database (MongoDB)
4. Real-time Communication (WebSocket)
5. Authentication (JWT)

## Architecture Diagram

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  React Native   │◄────┤  Spring Boot    │◄────┤    MongoDB      │
│    Mobile App   │     │    Backend      │     │    Database     │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        ▲                        ▲
        │                        │
        │                        │
        │                        │
┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │
│   WebSocket     │     │   JWT Auth      │
│   Connection    │     │   Service       │
│                 │     │                 │
└─────────────────┘     └─────────────────┘
```

## Component Details

### 1. Frontend (React Native)

#### Structure
```
mobile/
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── screens/        # Screen components
│   │   ├── navigation/     # Navigation configuration
│   │   ├── services/       # API and WebSocket services
│   │   ├── store/          # State management
│   │   ├── utils/          # Helper functions
│   │   └── types/          # TypeScript type definitions
│   ├── android/            # Android specific code
│   └── ios/               # iOS specific code
```

#### Key Features
- Cross-platform mobile development
- Real-time updates using WebSocket
- Offline support with local storage
- Push notifications
- Secure authentication
- Responsive UI design

### 2. Backend (Spring Boot)

#### Structure
```
backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   ├── controllers/    # REST endpoints
│   │   │   ├── services/       # Business logic
│   │   │   ├── repositories/   # Data access
│   │   │   ├── models/         # Data models
│   │   │   ├── config/         # Configuration
│   │   │   └── security/       # Security config
│   │   └── resources/
│   │       └── application.yml # App configuration
│   └── test/                   # Unit tests
```

#### Key Features
- RESTful API endpoints
- WebSocket support for real-time communication
- JWT-based authentication
- MongoDB integration
- Request validation
- Error handling
- Rate limiting
- Caching

### 3. Database (MongoDB)

#### Collections
- Users
- Doctors
- Appointments
- Messages
- Notifications

#### Indexes
```javascript
// Users Collection
db.users.createIndex({ "email": 1 }, { unique: true })
db.users.createIndex({ "phone": 1 })

// Doctors Collection
db.doctors.createIndex({ "specialty": 1 })
db.doctors.createIndex({ "rating": -1 })

// Appointments Collection
db.appointments.createIndex({ "doctorId": 1, "date": 1 })
db.appointments.createIndex({ "patientId": 1, "status": 1 })

// Messages Collection
db.messages.createIndex({ "senderId": 1, "recipientId": 1 })
db.messages.createIndex({ "createdAt": -1 })
```

### 4. Real-time Communication

#### WebSocket Endpoints
- `/ws/chat` - Real-time chat
- `/ws/updates` - Appointment updates
- `/ws/notifications` - Push notifications

#### Message Types
```typescript
interface WebSocketMessage {
  type: 'CHAT' | 'APPOINTMENT' | 'NOTIFICATION';
  payload: any;
  timestamp: number;
}
```

### 5. Security

#### Authentication Flow
1. User login/register
2. JWT token generation
3. Token validation middleware
4. Role-based access control

#### Security Measures
- HTTPS/TLS encryption
- Password hashing (BCrypt)
- JWT token expiration
- Rate limiting
- Input validation
- CORS configuration

## Data Flow

### Appointment Booking Flow
1. User searches for doctors
2. Selects available time slot
3. Creates appointment request
4. Doctor receives notification
5. Doctor approves/rejects
6. User receives confirmation

### Chat Flow
1. User initiates chat
2. WebSocket connection established
3. Real-time message exchange
4. Message persistence in MongoDB
5. Offline message handling

## Scalability

### Horizontal Scaling
- Stateless backend services
- Load balancing
- Database sharding
- Caching layer

### Performance Optimization
- Database indexing
- Query optimization
- Connection pooling
- Response compression

## Monitoring

### Metrics
- API response times
- Error rates
- Database performance
- WebSocket connections
- Memory usage
- CPU utilization

### Logging
- Application logs
- Error logs
- Access logs
- Audit logs

## Deployment

### Development
- Local development environment
- Docker containers
- Hot reloading
- Debug tools

### Production
- Cloud deployment
- CI/CD pipeline
- Automated testing
- Blue-green deployment
- Health checks
- Backup strategy

## Future Considerations

### Planned Features
- Video consultations
- Payment integration
- Prescription management
- Medical records
- Analytics dashboard

### Technical Improvements
- Microservices split
- Message queue integration
- Redis caching
- CDN integration
- Mobile app optimization 
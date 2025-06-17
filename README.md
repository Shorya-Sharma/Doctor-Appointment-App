# Doctor Appointment App

A full-stack application for managing doctor appointments, built with Spring Boot and React Native.

## 🏗️ Tech Stack

### Backend
- Java 17
- Spring Boot 3.4.3
- Spring Security
- Spring Data MongoDB
- WebSocket Support
- JWT Authentication
- Google API Client

### Frontend
- React Native
- TypeScript
- Jest for Testing
- ESLint & Prettier for Code Quality

### Database
- MongoDB

### Infrastructure
- Docker & Docker Compose
- Maven for Backend Build
- npm for Frontend Dependencies

## 🚀 Getting Started

### Prerequisites
- Docker and Docker Compose
- Java 17 JDK
- Node.js 18 or later
- npm or yarn
- MongoDB (if running locally)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Shorya-Sharma/Doctor-Appointment-App
   cd Doctor-Appointment-App
   ```

2. Environment Setup:
   - Backend: Create a `.env` file in the `backend` directory with necessary configurations
   - Frontend: Create a `.env` file in the `mobile` directory for React Native configurations

3. Using Docker Compose (Recommended):
   ```bash
   # Build and start all services
   docker-compose up --build

   # Run in detached mode
   docker-compose up -d

   # View logs
   docker-compose logs -f
   ```

4. Manual Setup (Alternative):

   Backend:
   ```bash
   cd backend
   ./mvnw clean install
   ./mvnw spring-boot:run
   ```

   Frontend:
   ```bash
   cd mobile
   npm install
   npm start
   ```

## 📱 Application Structure

```
Doctor-Appointment-App/
├── backend/                 # Spring Boot Backend
│   ├── src/                # Source code
│   ├── pom.xml            # Maven dependencies
│   └── Dockerfile         # Backend container config
├── mobile/                 # React Native Frontend
│   ├── src/               # Source code
│   ├── android/           # Android specific code
│   ├── ios/               # iOS specific code
│   └── Dockerfile         # Frontend container config
└── docker-compose.yml     # Multi-container setup
```

## 🔧 Development

### Backend Development
- The backend runs on port 8080
- API documentation available at `/swagger-ui.html` (if configured)
- MongoDB runs on port 27017

### Frontend Development
- Metro bundler runs on port 3000
- For iOS development:
  ```bash
  cd mobile/ios
  pod install
  ```
- For Android development:
  ```bash
  cd mobile/android
  ./gradlew assembleDebug
  ```

### Running Tests
Backend:
```bash
cd backend
./mvnw test
```

Frontend:
```bash
cd mobile
npm test
```

## 🔐 Environment Variables

### Backend (.env)
```
SPRING_DATA_MONGODB_URI=mongodb://localhost:27017/medikart
SPRING_PROFILES_ACTIVE=dev
JWT_SECRET=your-secret-key
```

### Frontend (.env)
```
REACT_NATIVE_PACKAGER_HOSTNAME=localhost
REACT_NATIVE_PACKAGER_PORT=3000
API_URL=http://localhost:8080
```

## 🐳 Docker Commands

### Useful Docker Commands
```bash
# Build images
docker-compose build

# Start services
docker-compose up

# Stop services
docker-compose down

# View logs
docker-compose logs -f [service-name]

# Rebuild a specific service
docker-compose up -d --build [service-name]
```

## 📦 Deployment

### Production Deployment
1. Update environment variables for production
2. Build production images:
   ```bash
   docker-compose -f docker-compose.prod.yml up --build
   ```

### Scaling
- Backend can be scaled horizontally:
  ```bash
  docker-compose up -d --scale backend=3
  ```

## 🔍 Monitoring and Logging

- Backend logs: `docker-compose logs -f backend`
- Frontend logs: `docker-compose logs -f frontend`
- MongoDB logs: `docker-compose logs -f mongodb`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Your Name - Shorya Sharma

## 🙏 Acknowledgments

- Spring Boot Team
- React Native Community
- MongoDB Team


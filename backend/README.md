# University Management System - Backend

## Prerequisites
- Java 17 or higher
- Maven 3.6+ (or use Maven Wrapper)

## Running the Application

### Option 1: Using Maven (if installed)
```bash
mvn spring-boot:run
```

### Option 2: Using Maven Wrapper (recommended)
```bash
# On Windows
mvnw.cmd spring-boot:run

# On Linux/Mac
./mvnw spring-boot:run
```

### Option 3: Using IDE
1. Open the project in IntelliJ IDEA or Eclipse
2. Right-click on `UniversityManagementApplication.java`
3. Select "Run" or "Debug"

### Option 4: Build and Run JAR
```bash
mvn clean package
java -jar target/university-management-0.0.1-SNAPSHOT.jar
```

## Default Admin User
- Username: `admin`
- Password: `adminpass`

The admin user is automatically created on first startup.

## API Endpoints
- Login: `POST http://localhost:8080/api/auth/login`
- All other endpoints require authentication (JWT token)

## Configuration
- Server Port: 8080
- Database: H2 (in-memory)
- H2 Console: http://localhost:8080/h2-console
  - JDBC URL: `jdbc:h2:mem:universitydb`
  - Username: `sa`
  - Password: `password`

## Troubleshooting

### Port 8080 already in use
Change the port in `src/main/resources/application.properties`:
```
server.port=8081
```
(Remember to update frontend API URL accordingly)

### Cannot connect from frontend
1. Make sure backend is running on port 8080
2. Check CORS configuration in `SecurityConfig.java`
3. Verify frontend is running on `http://localhost:4200`


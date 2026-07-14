@echo off
echo Starting University Management System Backend...
echo.
echo Checking Java installation...
java -version
echo.
echo If you see Java version above, you can proceed.
echo.
echo To run the backend, you have these options:
echo.
echo Option 1: Install Maven and run:
echo   mvn spring-boot:run
echo.
echo Option 2: Use an IDE (IntelliJ IDEA or Eclipse):
echo   1. Open the backend folder in your IDE
echo   2. Right-click on UniversityManagementApplication.java
echo   3. Select Run or Debug
echo.
echo Option 3: Download Maven Wrapper from:
echo   https://maven.apache.org/wrapper/
echo.
echo The backend should start on http://localhost:8080
echo Default admin credentials: admin / adminpass
echo.
pause


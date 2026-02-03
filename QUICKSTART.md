# NEPKART Quick Start Guide

## Prerequisites
- Node.js (v16+) and npm
- Java 17+
- Maven 3.6+

## Quick Setup

### 1. Start the Backend (Java Spring Boot)

```bash
cd backend
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### 2. Start the Frontend (React)

In a new terminal:

```bash
cd frontend
npm install
npm start
```

The frontend will start on `http://localhost:3000`

## Access Points

- **Frontend Application**: http://localhost:3000
- **Backend API**: http://localhost:8080/api
- **H2 Database Console**: http://localhost:8080/h2-console
  - JDBC URL: `jdbc:h2:mem:nepkartdb`
  - Username: `sa`
  - Password: (leave empty)

## Sample Data

The backend automatically initializes with 8 sample products on first run:
- Wai Wai Noodles
- Churpi
- Gundruk (Out of Stock)
- Momo Masala
- Dhaka Topi
- Copper Jug
- Prayer Wheel
- Rice Bag (5kg)

## Testing the Application

1. Browse products on the home page
2. Click on a product to see details
3. Add items to cart
4. Proceed to checkout
5. View admin dashboard at `/admin` to see inventory management

## Troubleshooting

### Backend won't start
- Ensure Java 17+ is installed: `java -version`
- Check if port 8080 is available

### Frontend won't start
- Ensure Node.js is installed: `node -v`
- Run `npm install` in the frontend directory
- Check if port 3000 is available

### API connection issues
- Ensure backend is running before starting frontend
- Check CORS configuration in backend
- Verify API base URL in `frontend/src/services/api.js`

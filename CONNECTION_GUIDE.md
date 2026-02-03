# How to Connect PostgreSQL Database with NEPKART Website

## Step-by-Step Connection Guide

### **Step 1: Update PostgreSQL Password**

Open the file: `backend/src/main/resources/application.properties`

Find this line:
```properties
spring.datasource.password=your_password
```

**Replace `your_password` with your actual PostgreSQL password.**

For example, if your PostgreSQL password is `mypassword123`, change it to:
```properties
spring.datasource.password=mypassword123
```

---

### **Step 2: Verify PostgreSQL is Running**

Make sure PostgreSQL is running on your system:

**On macOS:**
```bash
brew services list
# Look for postgresql to see if it's running
```

**On Linux:**
```bash
sudo systemctl status postgresql
```

**On Windows:**
Check Services (services.msc) for PostgreSQL service

---

### **Step 3: Verify Database Exists**

Connect to PostgreSQL and verify:
```bash
psql -U postgres
```

Then run:
```sql
\l
```

You should see `nepkartdb` in the list. If not, create it:
```sql
CREATE DATABASE nepkartdb;
```

---

### **Step 4: Start the Backend Server**

Open a **new terminal window** and run:

```bash
cd /Users/satchit/CURSOR/backend
mvn spring-boot:run
```

**Wait for:** You should see messages like:
```
Started NepkartApplication in X.XXX seconds
```

**If you see errors:**
- Check that PostgreSQL password is correct in `application.properties`
- Make sure PostgreSQL is running
- Verify database `nepkartdb` exists

---

### **Step 5: Start the Frontend Server**

Open **another new terminal window** and run:

```bash
cd /Users/satchit/CURSOR/frontend
npm install
npm start
```

**Wait for:** Browser should automatically open to `http://localhost:3000`

---

### **Step 6: Test the Connection**

1. **Open your browser** and go to: `http://localhost:3000`

2. **You should see:**
   - NEPKART homepage
   - Products displayed (Wai Wai, Churpi, etc.)
   - No errors in the browser console

3. **Test API Connection:**
   - Open browser developer tools (F12)
   - Go to Network tab
   - Refresh the page
   - Look for API calls to `http://localhost:8080/api/products`
   - They should return status `200 OK`

4. **Test Admin Dashboard:**
   - Go to: `http://localhost:3000/admin`
   - You should see the inventory dashboard with all products

---

## Troubleshooting

### **Error: "Connection refused" or "Cannot connect to database"**

**Solution:**
1. Check PostgreSQL is running: `psql -U postgres`
2. Verify password in `application.properties`
3. Check database exists: `\l` in psql
4. Verify connection string: `jdbc:postgresql://localhost:5432/nepkartdb`

### **Error: "Table does not exist"**

**Solution:**
- Make sure you ran all the CREATE TABLE commands in PostgreSQL
- Check tables exist: `\dt` in psql (while connected to nepkartdb)

### **Error: "Port 8080 already in use"**

**Solution:**
- Stop other applications using port 8080
- Or change port in `application.properties`: `server.port=8081`

### **Error: "Port 3000 already in use"**

**Solution:**
- Stop other React apps
- Or use different port: `PORT=3001 npm start`

### **Frontend shows "Failed to load products"**

**Solution:**
1. Make sure backend is running (check terminal)
2. Check backend URL in `frontend/src/services/api.js` is `http://localhost:8080/api`
3. Check CORS is enabled in backend
4. Check browser console for specific error messages

---

## Quick Test Commands

### **Test Backend API Directly:**

Open a new terminal and run:
```bash
curl http://localhost:8080/api/products
```

You should see JSON data with all products.

### **Check Backend Logs:**

Look at the backend terminal - you should see SQL queries being executed:
```
Hibernate: select product0_.id as id1_0_, product0_.category as category2_0_ ...
```

---

## Summary

✅ **Database:** PostgreSQL running with `nepkartdb` database  
✅ **Backend:** Java Spring Boot running on `http://localhost:8080`  
✅ **Frontend:** React app running on `http://localhost:3000`  
✅ **Connection:** Frontend → Backend → PostgreSQL  

Once all three are running, your website is fully connected!

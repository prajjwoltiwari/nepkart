# PostgreSQL Database Setup Guide for NEPKART

## Quick Reference: All Tables and Columns

### **Table 1: products**
| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | BIGSERIAL | PRIMARY KEY | Auto-increment ID |
| sku | VARCHAR(255) | UNIQUE, NOT NULL | Product SKU (e.g., NEP-FOOD-001) |
| name | VARCHAR(255) | NOT NULL | Product name |
| category | VARCHAR(100) | NOT NULL | Food, Clothing, Religious, Decor |
| price | NUMERIC(10,2) | NOT NULL, CHECK > 0 | Product price |
| stock | INTEGER | NOT NULL, CHECK >= 0 | Current stock quantity |
| low_stock_threshold | INTEGER | NOT NULL, CHECK >= 0 | Threshold for low stock alert |
| weight | NUMERIC(5,2) | NOT NULL, CHECK > 0 | Weight in kg |
| origin | VARCHAR(255) | NOT NULL | Origin location |
| description | TEXT | NULL | Product description |
| image_url | VARCHAR(500) | NULL | Product image URL |

### **Table 2: customers**
| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | BIGSERIAL | PRIMARY KEY | Auto-increment ID |
| first_name | VARCHAR(255) | NOT NULL | Customer first name |
| last_name | VARCHAR(255) | NOT NULL | Customer last name |
| email | VARCHAR(255) | UNIQUE, NOT NULL | Customer email |
| phone | VARCHAR(50) | NOT NULL | Customer phone |
| address | VARCHAR(500) | NOT NULL | Street address |
| city | VARCHAR(100) | NOT NULL | City |
| state | VARCHAR(100) | NOT NULL | State |
| zip_code | VARCHAR(20) | NOT NULL | ZIP code |

### **Table 3: orders**
| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | BIGSERIAL | PRIMARY KEY | Auto-increment ID |
| order_id | VARCHAR(255) | UNIQUE, NOT NULL | Order ID (e.g., NEP-1234567890) |
| customer_id | BIGINT | NOT NULL, FK → customers.id | Reference to customer |
| subtotal | NUMERIC(10,2) | NOT NULL, CHECK >= 0 | Order subtotal |
| shipping_cost | NUMERIC(10,2) | NOT NULL, CHECK >= 0 | Shipping cost |
| total | NUMERIC(10,2) | NOT NULL, CHECK >= 0 | Total amount |
| order_date | TIMESTAMP | NOT NULL, DEFAULT NOW() | Order date/time |
| status | VARCHAR(50) | NOT NULL, DEFAULT 'PENDING' | PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED |

### **Table 4: order_items**
| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | BIGSERIAL | PRIMARY KEY | Auto-increment ID |
| order_id | BIGINT | NOT NULL, FK → orders.id | Reference to order |
| product_id | BIGINT | NOT NULL, FK → products.id | Reference to product |
| quantity | INTEGER | NOT NULL, CHECK > 0 | Quantity ordered |
| price | NUMERIC(10,2) | NOT NULL, CHECK > 0 | Price at time of order |

---

## Step-by-Step Setup Commands

### **Step 1: Connect to PostgreSQL**
```bash
psql -U postgres
```
(Or use your PostgreSQL username)

### **Step 2: Create Database**
```sql
CREATE DATABASE nepkartdb;
```

### **Step 3: Connect to the Database**
```sql
\c nepkartdb;
```

### **Step 4: Run the Setup Script**
```sql
\i /path/to/postgresql_setup.sql
```

Or copy and paste the SQL commands from `postgresql_setup.sql` file.

---

## Individual Table Creation Commands

If you prefer to create tables one by one:

### **Create Products Table**
```sql
CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY,
    sku VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price NUMERIC(10, 2) NOT NULL CHECK (price > 0),
    stock INTEGER NOT NULL CHECK (stock >= 0),
    low_stock_threshold INTEGER NOT NULL CHECK (low_stock_threshold >= 0),
    weight NUMERIC(5, 2) NOT NULL CHECK (weight > 0),
    origin VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(500)
);
```

### **Create Customers Table**
```sql
CREATE TABLE customers (
    id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50) NOT NULL,
    address VARCHAR(500) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    zip_code VARCHAR(20) NOT NULL
);
```

### **Create Orders Table**
```sql
CREATE TABLE orders (
    id BIGSERIAL PRIMARY KEY,
    order_id VARCHAR(255) UNIQUE NOT NULL,
    customer_id BIGINT NOT NULL,
    subtotal NUMERIC(10, 2) NOT NULL CHECK (subtotal >= 0),
    shipping_cost NUMERIC(10, 2) NOT NULL CHECK (shipping_cost >= 0),
    total NUMERIC(10, 2) NOT NULL CHECK (total >= 0),
    order_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE RESTRICT
);
```

### **Create Order Items Table**
```sql
CREATE TABLE order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    price NUMERIC(10, 2) NOT NULL CHECK (price > 0),
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
);
```

---

## Useful PostgreSQL Commands

### **View All Tables**
```sql
\dt
```

### **View Table Structure**
```sql
\d products
\d customers
\d orders
\d order_items
```

### **View All Data in a Table**
```sql
SELECT * FROM products;
SELECT * FROM customers;
SELECT * FROM orders;
SELECT * FROM order_items;
```

### **Count Rows**
```sql
SELECT COUNT(*) FROM products;
SELECT COUNT(*) FROM customers;
SELECT COUNT(*) FROM orders;
```

### **View Low Stock Products**
```sql
SELECT * FROM products 
WHERE stock > 0 AND stock <= low_stock_threshold;
```

### **View Out of Stock Products**
```sql
SELECT * FROM products WHERE stock = 0;
```

### **View Orders with Customer Info**
```sql
SELECT o.*, c.first_name, c.last_name, c.email 
FROM orders o 
JOIN customers c ON o.customer_id = c.id;
```

### **View Order Items with Product Details**
```sql
SELECT oi.*, p.name as product_name, p.sku 
FROM order_items oi 
JOIN products p ON oi.product_id = p.id 
WHERE oi.order_id = 1;
```

---

## Update Backend Configuration

After setting up PostgreSQL, update `application.properties`:

```properties
# PostgreSQL Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/nepkartdb
spring.datasource.username=postgres
spring.datasource.password=your_password
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA Configuration
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=true
```

Make sure to add PostgreSQL driver to `pom.xml`:
```xml
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

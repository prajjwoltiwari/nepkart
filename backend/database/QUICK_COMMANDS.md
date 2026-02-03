# PostgreSQL Quick Commands for NEPKART

## All-in-One Setup (Copy & Paste)

```sql
-- Connect to PostgreSQL first: psql -U postgres

-- Create database
CREATE DATABASE nepkartdb;
\c nepkartdb;

-- Create products table
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

-- Create customers table
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

-- Create orders table
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

-- Create order_items table
CREATE TABLE order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    price NUMERIC(10, 2) NOT NULL CHECK (price > 0),
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
);

-- Insert sample products
INSERT INTO products (sku, name, category, price, stock, low_stock_threshold, weight, origin, description, image_url) VALUES
('NEP-FOOD-001', 'Wai Wai Noodles', 'Food', 2.99, 150, 20, 0.10, 'Kathmandu, Nepal', 'Authentic Nepali instant noodles', 'https://via.placeholder.com/300x250?text=Wai+Wai'),
('NEP-FOOD-002', 'Churpi', 'Food', 8.99, 45, 10, 0.20, 'Himalayan Region, Nepal', 'Traditional hard cheese', 'https://via.placeholder.com/300x250?text=Churpi'),
('NEP-FOOD-003', 'Gundruk', 'Food', 6.99, 0, 15, 0.30, 'Nepal', 'Fermented leafy vegetable', 'https://via.placeholder.com/300x250?text=Gundruk'),
('NEP-FOOD-004', 'Momo Masala', 'Food', 4.99, 30, 10, 0.15, 'Kathmandu, Nepal', 'Spice mix for momos', 'https://via.placeholder.com/300x250?text=Momo+Masala'),
('NEP-CLOTH-001', 'Dhaka Topi', 'Clothing', 24.99, 20, 5, 0.10, 'Nepal', 'Traditional Nepali cap', 'https://via.placeholder.com/300x250?text=Dhaka+Topi'),
('NEP-DECOR-001', 'Copper Jug', 'Decor', 45.99, 12, 3, 2.50, 'Patan, Nepal', 'Handcrafted copper jug', 'https://via.placeholder.com/300x250?text=Copper+Jug'),
('NEP-REL-001', 'Prayer Wheel', 'Religious', 35.99, 8, 2, 1.20, 'Tibet/Nepal', 'Traditional prayer wheel', 'https://via.placeholder.com/300x250?text=Prayer+Wheel'),
('NEP-FOOD-005', 'Rice Bag (5kg)', 'Food', 12.99, 25, 5, 5.00, 'Terai, Nepal', 'Premium Basmati rice', 'https://via.placeholder.com/300x250?text=Rice+Bag');
```

## Quick View Commands

```sql
-- View all tables
\dt

-- View table structure
\d products
\d customers
\d orders
\d order_items

-- View all products
SELECT * FROM products;

-- View all customers
SELECT * FROM customers;

-- View all orders
SELECT * FROM orders;

-- View low stock products
SELECT * FROM products WHERE stock > 0 AND stock <= low_stock_threshold;

-- View out of stock products
SELECT * FROM products WHERE stock = 0;
```

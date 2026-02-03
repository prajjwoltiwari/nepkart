-- ============================================
-- NEPKART PostgreSQL Setup - Copy & Paste
-- Run these commands line by line in psql shell
-- ============================================

-- Step 1: Create Database (if not exists)
CREATE DATABASE nepkartdb;

-- Step 2: Connect to Database
\c nepkartdb

-- Step 3: Create Products Table
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

-- Step 4: Create Customers Table
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

-- Step 5: Create Orders Table
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

-- Step 6: Create Order Items Table
CREATE TABLE order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    price NUMERIC(10, 2) NOT NULL CHECK (price > 0),
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
);

-- Step 7: Create Indexes for Performance
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_orders_order_id ON orders(order_id);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);

-- Step 8: Insert Sample Products
INSERT INTO products (sku, name, category, price, stock, low_stock_threshold, weight, origin, description, image_url) VALUES
('NEP-FOOD-001', 'Wai Wai Noodles', 'Food', 2.99, 150, 20, 0.10, 'Kathmandu, Nepal', 'Authentic Nepali instant noodles loved by millions. Made with premium ingredients and traditional recipes.', 'https://via.placeholder.com/300x250?text=Wai+Wai');

INSERT INTO products (sku, name, category, price, stock, low_stock_threshold, weight, origin, description, image_url) VALUES
('NEP-FOOD-002', 'Churpi', 'Food', 8.99, 45, 10, 0.20, 'Himalayan Region, Nepal', 'Traditional hard cheese from the Himalayas. A protein-rich snack that lasts for months.', 'https://via.placeholder.com/300x250?text=Churpi');

INSERT INTO products (sku, name, category, price, stock, low_stock_threshold, weight, origin, description, image_url) VALUES
('NEP-FOOD-003', 'Gundruk', 'Food', 6.99, 0, 15, 0.30, 'Nepal', 'Fermented leafy vegetable, a staple in Nepali cuisine. Rich in probiotics and flavor.', 'https://via.placeholder.com/300x250?text=Gundruk');

INSERT INTO products (sku, name, category, price, stock, low_stock_threshold, weight, origin, description, image_url) VALUES
('NEP-FOOD-004', 'Momo Masala', 'Food', 4.99, 30, 10, 0.15, 'Kathmandu, Nepal', 'Spice mix for authentic momos. Perfect blend of Himalayan spices.', 'https://via.placeholder.com/300x250?text=Momo+Masala');

INSERT INTO products (sku, name, category, price, stock, low_stock_threshold, weight, origin, description, image_url) VALUES
('NEP-CLOTH-001', 'Dhaka Topi', 'Clothing', 24.99, 20, 5, 0.10, 'Nepal', 'Traditional Nepali cap, handwoven with intricate patterns. A symbol of Nepali culture.', 'https://via.placeholder.com/300x250?text=Dhaka+Topi');

INSERT INTO products (sku, name, category, price, stock, low_stock_threshold, weight, origin, description, image_url) VALUES
('NEP-DECOR-001', 'Copper Jug', 'Decor', 45.99, 12, 3, 2.50, 'Patan, Nepal', 'Handcrafted copper water jug. Beautiful traditional design with health benefits.', 'https://via.placeholder.com/300x250?text=Copper+Jug');

INSERT INTO products (sku, name, category, price, stock, low_stock_threshold, weight, origin, description, image_url) VALUES
('NEP-REL-001', 'Prayer Wheel', 'Religious', 35.99, 8, 2, 1.20, 'Tibet/Nepal', 'Traditional Tibetan prayer wheel. Handcrafted with intricate details.', 'https://via.placeholder.com/300x250?text=Prayer+Wheel');

INSERT INTO products (sku, name, category, price, stock, low_stock_threshold, weight, origin, description, image_url) VALUES
('NEP-FOOD-005', 'Rice Bag (5kg)', 'Food', 12.99, 25, 5, 5.00, 'Terai, Nepal', 'Premium Basmati rice from the Terai region. Long grain, aromatic, and delicious.', 'https://via.placeholder.com/300x250?text=Rice+Bag');

-- Step 9: Verify Tables Created
\dt

-- Step 10: View All Products
SELECT * FROM products;

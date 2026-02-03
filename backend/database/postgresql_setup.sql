-- ============================================
-- NEPKART PostgreSQL Database Setup Script
-- ============================================

-- Step 1: Create Database (Run this in psql as superuser)
-- CREATE DATABASE nepkartdb;
-- \c nepkartdb;

-- Step 2: Create all tables

-- ============================================
-- TABLE 1: products
-- ============================================
CREATE TABLE IF NOT EXISTS products (
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

-- ============================================
-- TABLE 2: customers
-- ============================================
CREATE TABLE IF NOT EXISTS customers (
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

-- ============================================
-- TABLE 3: orders
-- ============================================
CREATE TABLE IF NOT EXISTS orders (
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

-- ============================================
-- TABLE 4: order_items
-- ============================================
CREATE TABLE IF NOT EXISTS order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    price NUMERIC(10, 2) NOT NULL CHECK (price > 0),
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
);

-- ============================================
-- Create Indexes for Better Performance
-- ============================================
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_sku ON products(sku);
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_order_id ON orders(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);

-- ============================================
-- Insert Sample Data
-- ============================================

-- Insert Products
INSERT INTO products (sku, name, category, price, stock, low_stock_threshold, weight, origin, description, image_url) VALUES
('NEP-FOOD-001', 'Wai Wai Noodles', 'Food', 2.99, 150, 20, 0.10, 'Kathmandu, Nepal', 'Authentic Nepali instant noodles loved by millions. Made with premium ingredients and traditional recipes.', 'https://via.placeholder.com/300x250?text=Wai+Wai'),
('NEP-FOOD-002', 'Churpi', 'Food', 8.99, 45, 10, 0.20, 'Himalayan Region, Nepal', 'Traditional hard cheese from the Himalayas. A protein-rich snack that lasts for months.', 'https://via.placeholder.com/300x250?text=Churpi'),
('NEP-FOOD-003', 'Gundruk', 'Food', 6.99, 0, 15, 0.30, 'Nepal', 'Fermented leafy vegetable, a staple in Nepali cuisine. Rich in probiotics and flavor.', 'https://via.placeholder.com/300x250?text=Gundruk'),
('NEP-FOOD-004', 'Momo Masala', 'Food', 4.99, 30, 10, 0.15, 'Kathmandu, Nepal', 'Spice mix for authentic momos. Perfect blend of Himalayan spices.', 'https://via.placeholder.com/300x250?text=Momo+Masala'),
('NEP-CLOTH-001', 'Dhaka Topi', 'Clothing', 24.99, 20, 5, 0.10, 'Nepal', 'Traditional Nepali cap, handwoven with intricate patterns. A symbol of Nepali culture.', 'https://via.placeholder.com/300x250?text=Dhaka+Topi'),
('NEP-DECOR-001', 'Copper Jug', 'Decor', 45.99, 12, 3, 2.50, 'Patan, Nepal', 'Handcrafted copper water jug. Beautiful traditional design with health benefits.', 'https://via.placeholder.com/300x250?text=Copper+Jug'),
('NEP-DECOR-002', 'Prayer Wheel', 'Decor', 35.99, 8, 2, 1.20, 'Tibet/Nepal', 'Traditional Tibetan prayer wheel. Handcrafted with intricate details.', 'https://via.placeholder.com/300x250?text=Prayer+Wheel'),
('NEP-FOOD-005', 'Rice Bag (5kg)', 'Food', 12.99, 25, 5, 5.00, 'Terai, Nepal', 'Premium Basmati rice from the Terai region. Long grain, aromatic, and delicious.', 'https://via.placeholder.com/300x250?text=Rice+Bag'),
('NEP-DECOR-003', 'Brass Panas Lamps', 'Decor', 129.99, 15, 3, 2.80, 'Patan, Nepal', 'Handcrafted brass panas lamps. Traditional Nepali design with intricate patterns. Perfect for home decoration.', 'https://via.placeholder.com/300x250?text=Brass+Panas+Lamps'),
('NEP-DECOR-004', '3-Set Moon Singing Bowl', 'Decor', 59.99, 20, 5, 1.50, 'Tibet/Nepal', 'Set of three handcrafted Tibetan singing bowls. Each bowl produces a unique harmonic sound. Used for meditation and decoration.', 'https://via.placeholder.com/300x250?text=Singing+Bowl'),
('NEP-DECOR-005', 'Tibetan Rug', 'Decor', 134.99, 10, 2, 3.50, 'Tibet/Nepal', 'Authentic Tibetan handwoven rug. Beautiful traditional patterns and colors. Adds warmth and cultural elegance to any room.', 'https://via.placeholder.com/300x250?text=Tibetan+Rug'),
('NEP-DECOR-006', 'Antique Peacock Window', 'Decor', 179.99, 8, 2, 4.20, 'Kathmandu, Nepal', 'Vintage-style peacock window frame. Intricate woodwork featuring traditional Nepali peacock motifs. A stunning decorative piece.', 'https://via.placeholder.com/300x250?text=Peacock+Window')
ON CONFLICT (sku) DO NOTHING;

-- ============================================
-- Useful Queries
-- ============================================

-- View all products
-- SELECT * FROM products;

-- View products by category
-- SELECT * FROM products WHERE category = 'Food';

-- View low stock products
-- SELECT * FROM products WHERE stock > 0 AND stock <= low_stock_threshold;

-- View out of stock products
-- SELECT * FROM products WHERE stock = 0;

-- View all customers
-- SELECT * FROM customers;

-- View all orders with customer info
-- SELECT o.*, c.first_name, c.last_name, c.email 
-- FROM orders o 
-- JOIN customers c ON o.customer_id = c.id;

-- View order items with product details
-- SELECT oi.*, p.name as product_name, p.sku 
-- FROM order_items oi 
-- JOIN products p ON oi.product_id = p.id 
-- WHERE oi.order_id = 1;

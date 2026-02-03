-- Adds tax column to orders for ZIP-based tax
ALTER TABLE orders
ADD COLUMN IF NOT EXISTS tax NUMERIC(10, 2) NOT NULL DEFAULT 0.00;


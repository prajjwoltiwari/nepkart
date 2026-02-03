-- Fix image_url column to support base64 images (can be 50KB+)
ALTER TABLE products ALTER COLUMN image_url TYPE TEXT;

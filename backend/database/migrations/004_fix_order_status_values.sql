-- Fix order status values to match new enum
-- This migration updates old status values to the new enum values

-- Map old statuses to new ones:
UPDATE orders SET status = 'RECEIVED' WHERE status = 'PENDING';
UPDATE orders SET status = 'IN_PROGRESS' WHERE status = 'PROCESSING';
UPDATE orders SET status = 'SHIPPED' WHERE status IN ('SHIPPED', 'DELIVERED');
UPDATE orders SET status = 'RECEIVED' WHERE status = 'CANCELLED';

-- Set default for any NULL or invalid values
UPDATE orders SET status = 'RECEIVED' WHERE status IS NULL OR status NOT IN ('RECEIVED', 'IN_PROGRESS', 'SHIPPED');

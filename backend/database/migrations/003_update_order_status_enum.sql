-- Update order status enum values
-- Map old statuses to new ones:
-- PENDING -> RECEIVED
-- PROCESSING -> IN_PROGRESS
-- SHIPPED -> SHIPPED (same)
-- DELIVERED -> SHIPPED (treat as shipped)
-- CANCELLED -> RECEIVED (reset to received)

UPDATE orders SET status = 'RECEIVED' WHERE status = 'PENDING';
UPDATE orders SET status = 'IN_PROGRESS' WHERE status = 'PROCESSING';
UPDATE orders SET status = 'SHIPPED' WHERE status IN ('SHIPPED', 'DELIVERED');
UPDATE orders SET status = 'RECEIVED' WHERE status = 'CANCELLED';

-- Note: The enum type in PostgreSQL will be updated automatically by Hibernate
-- when the application starts with ddl-auto=update

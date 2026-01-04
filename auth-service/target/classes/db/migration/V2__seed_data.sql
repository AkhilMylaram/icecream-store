-- Admin@123 (Placeholder hash, replace in production)
INSERT INTO users (email, password_hash, role, is_active)
VALUES ('admin@icecream.com', '$2a$10$......................................................', 'ADMIN', true);

-- User@123 (Placeholder hash, replace in production)
INSERT INTO users (email, password_hash, role, is_active)
VALUES ('user@icecream.com', '$2a$10$......................................................', 'USER', true);

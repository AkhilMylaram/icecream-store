-- Create schemas
CREATE SCHEMA IF NOT EXISTS auth_schema;
CREATE SCHEMA IF NOT EXISTS public;

-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_id VARCHAR(255),
    is_active BOOLEAN DEFAULT true
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
    id BIGSERIAL PRIMARY KEY,
    user_email VARCHAR(255) NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT REFERENCES orders(id) ON DELETE CASCADE,
    product_id BIGINT REFERENCES products(id),
    quantity INTEGER DEFAULT 1
);

-- Insert sample products
INSERT INTO products (name, description, price, image_id, is_active) VALUES
('Classic Vanilla Bean', 'Creamy and rich, made with real vanilla beans from Madagascar.', 5.99, 'vanilla-1', true),
('Decadent Chocolate Fudge', 'A deep, dark chocolate experience with swirls of fudge.', 6.50, 'chocolate-1', true),
('Strawberry Swirl', 'Fresh strawberry ice cream with chunks of real, ripe berries.', 6.25, 'strawberry-1', true),
('Mint Chocolate Chip', 'Cool mint ice cream loaded with rich chocolate chips.', 6.25, 'mint-1', true),
('Cookie Dough Delight', 'Vanilla ice cream packed with chunks of chocolate chip cookie dough.', 6.75, 'cookie-dough-1', true),
('Salted Caramel Craze', 'A perfect balance of sweet and salty with a gooey caramel ribbon.', 6.75, 'salted-caramel-1', true),
('Perfect Pistachio', 'Rich, nutty pistachio ice cream with real pistachio pieces.', 6.50, 'pistachio-1', true),
('Coffee Heaven', 'Rich and aromatic coffee-flavored ice cream.', 6.25, 'coffee-1', true);

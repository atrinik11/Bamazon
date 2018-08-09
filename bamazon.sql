-- Dropping the database if it exists
DROP DATABASE IF EXISTS bamazon;

-- Creating a database name bamazon
CREATE DATABASE bamazon;

-- Using the database
USE bamazon;

-- Creating table products which will hold all the product details
CREATE TABLE products(
    item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
    Product_name VARCHAR(100) NOT NULL,
    Department_name VARCHAR(100) NOT NULL,
    Price DECIMAL(10, 4) NOT NULL,
    Stock_quantity INTEGER(10) NOT NULL,
    PRIMARY KEY(item_id)
);




-- Inserting data into the product table..
INSERT INTO products(Product_name, Department_name, Price, Stock_quantity)
VALUES ("Samsung Gear S3 Frontier Smartwatch", "Wearable Technology", 297, 100);

INSERT INTO products(Product_name, Department_name, Price, Stock_quantity)
VALUES ("Apple Series3 Smartwatch", "Wearable Technology", 250, 150);

INSERT INTO products(Product_name, Department_name, Price, Stock_quantity)
VALUES ("Fitbit Blaze Smartwatch", "Wearable Technology", 297, 200);

INSERT INTO products(Product_name, Department_name, Price, Stock_quantity)
VALUES ("The Nut Job2: Nutty by Nature", "Movies & TV", 7, 100);

INSERT INTO products(Product_name, Department_name, Price, Stock_quantity)
VALUES ("The Wizard of Oz", "Movies & TV", 10, 90);

INSERT INTO products(Product_name, Department_name, Price, Stock_quantity)
VALUES ("Jurassic World", "Movies & TV", 15, 100);

INSERT INTO products(Product_name, Department_name, Price, Stock_quantity)
VALUES ("Nintendo Switch", "Video Games", 297, 50);

INSERT INTO products(Product_name, Department_name, Price, Stock_quantity)
VALUES ("Xbox One S 1TB Console- Starter Bundle", "Video Games", 297, 30);

INSERT INTO products(Product_name, Department_name, Price, Stock_quantity)
VALUES ("PlayStation 4 Pro 1TB Limited Edition Console", "Video Games", 297, 20);

INSERT INTO products(Product_name, Department_name, Price, Stock_quantity)
VALUES ("Tea Tree Special Shampoo", "Beauty & Personal Care", 34, 100);

INSERT INTO products(Product_name, Department_name, Price, Stock_quantity)
VALUES ("Paul Mitchell Shampoo", "Beauty & Personal Care", 11.50, 200);

INSERT INTO products(Product_name, Department_name, Price, Stock_quantity)
VALUES ("Oribe Shampoo", "Beauty & Personal Care", 50, 100);

INSERT INTO products(Product_name, Department_name, Price, Stock_quantity)
VALUES ("LEGO Classic Medium Creative Brick Box", "Toys & Games", 30, 100);

INSERT INTO products(Product_name, Department_name, Price, Stock_quantity)
VALUES ("Mini Drone", "Toys & Games", 30, 50);

INSERT INTO products(Product_name, Department_name, Price, Stock_quantity)
VALUES ("Giant UNO", "Toys & Games", 20, 300);

INSERT INTO products(Product_name, Department_name, Price, Stock_quantity)
VALUES ("Godiva Chocolatier Classic", "Chocolates & Candys", 16, 50);

INSERT INTO products(Product_name, Department_name, Price, Stock_quantity)
VALUES ("Haribo Gold-Bears Gummi", "Chocolates & Candys", 11.99, 200);

INSERT INTO products(Product_name, Department_name, Price, Stock_quantity)
VALUES ("JOLLY Rancher Hard Candy", "Chocolates & Candys", 11.99, 100);


--  Creating table departments which will hold all the department details
CREATE TABLE departments(
    department_id INTEGER(10) AUTO_INCREMENT NOT NULL,
    Department_name VARCHAR(100) NOT NULL,
    Over_head_costs INTEGER(10) NOT NULL,
    PRIMARY KEY(department_id)
);

-- Modifying the products table: adding a new column product_sales
ALTER TABLE products ADD COLUMN Product_sales INTEGER AFTER Stock_quantity;


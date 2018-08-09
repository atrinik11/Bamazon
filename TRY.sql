SELECT * FROM products;
SELECT CONCAT(`Prefix` + `Item_id`) AS ITEM_ID, Product_name, Department_name, Price, Stock_quantity FROM products;

SELECT * FROM products WHERE Stock_quantity < 5;

USE top_songsdb;

select * from top5000;
use bamazon;

UPDATE products SET stock_quantity =  (Stock_quantity + 10) WHERE item_id = 4;
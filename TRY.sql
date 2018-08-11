
SELECT * FROM products;

SELECT * FROM products WHERE Stock_quantity < 5;

use bamazon;

UPDATE products SET stock_quantity =  (Stock_quantity + 10) WHERE item_id = 4;
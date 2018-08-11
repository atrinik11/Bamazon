# Bamazon
Creating an Amazon-like storefront with the MySQL. The app will take in orders from customers and deplete stock from the store's inventory.

How the app works:

BamazonCustomer:
In the bamazonCustomer, it will display the inventory with all the items available. And ask for the item_id of the product which the customer wants to buy and the quantity. 
If the the product the customer wants to buy is low in stock or out of stock, it throws an error msg. But if it is in stock, the app prompt if the customer wants to proceed with the order.
If the customer select 'yes', then the order is placed and displays a summary where the product name, price of the product, quantity ordered and the total price is displayed. Along with that the database is also updated.
Then the app prompts if the customer wants to continue shopping or wants to exit. If the customer select 'yes', then the app takes the customer to the main page where the inventory is displayed. And if the customer select 'no', then the customer exits out of the app.


BamazonManager:
When the bamazonManager app is ran in command prompt, it will display a list of activity for the manager to do. The list:
    * View the inventory list.
    * Low inventory.
    * Add stock to inventory.
    * Add new product.

When the manager select the inventory list, it displays the inventory list which is same as the inventory list displayed for the customer.

When the manager select the low inventory, it displays the products whose quantities are less than 5. If there is no such product then, it displays a message like "There are sufficient stock.".

When the manager select the add inventory, the manager is able to add new stock to the existing inventory. The manager has to enter the item_id of the product for which the quantity has to be added. This update is also reflected in the bamazon database.

When the manager select the new product, the manager is able to add new product to the product table. The app prompts for the product name, department name, price and the quantity to be added. The app updates the database with the new product and displays the item-id generated for the product added.


Technologies Used:

Language: JavaScript.

Environment: Node JS.

Database: MySQL,

Method:

First created github repo called bamazon and cloned to the local computer.

Then created a database called bamazon_db using MySQL, which have a table called products with 5 cloumns like
    * Item_id - datatype is integer, auto-incremented and is the primary key for the table.
    * Product_name -datatype is varchar, not null,
    * Department_name - datatype is varchar, not null,
    * Price - datatype is float, not null,
    * Stock - datatype is integer, not null.

Then populated the table with required datas, using the sql syntax INSERT INTO.

Then established a SQL connection with the node.js environment. 

All the above sql code are written in bamazon.sql file.

Then the bamazon.sql file is ran in SQL workbench to populate the database.

The next step is to install inquirer, sql npm packages.

Once all the above steps are done, the application can be ran in the node.js environment.

For the bamazonCustomer application to run:
    node bamazonCustomer.js 
has to be typed in the command prompt.

For the bamazonManager application to run:
    node bamazonManager.js
has to be typed in the command prompt.


Installation:
	Before running the app in the command line we need to install the following npm packages:
		SQL:  npm install sql
		inquirer : npm install inquirer


Command in command line:
Bamazon Customer: node bamazonCustomer.js
Bamazon Manager: node bamazonManager.js


Demo of the application: Pls download the video to watch.

Link for the bamazonCustomer.js:
https://drive.google.com/file/d/1DU54B7RNgdbg2vYwHo-H5-32vl7NdhLx/view?usp=sharing

Link for the bamazonManager.js:
https://drive.google.com/file/d/1XbzDbbRLyR8r4ZLSgCq7qbtP68OWVBVF/view?usp=sharing
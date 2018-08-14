var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console.table");

//Defining the mySQL connection parameters..............
var connection = mysql.createConnection({
    host : "localhost",
    port : 3306,
    user : "root",
    password : "",
    database : "bamazon"
});


//Establishing a connection with MySQL.................
connection.connect(function(error) {
    if (error) throw error;
    console.log("Connected as Id: " + connection.threadId + "\n");
    //calling the runstart function where the options for the managers will be displayed.............
    runManagerAction();
});

function runManagerAction() {
    inquirer.prompt({
        name : "menu",
        type : "list",
        message : "Select the activity you want to do.",
        choices : [
            "View Products for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product",
            "Want to Exit Bamazon?"
        ]
    }).then(function(answer) {
        switch(answer.menu) {
            case "View Products for Sale":
                productForSale();
            break;
            case "View Low Inventory":
                lowInventory();
            break;
            case "Add to Inventory":
                addInventory();
            break;
            case "Add New Product":
                newProduct();
            break;
            case "Want to Exit Bamazon?":
                returnToMenu();
            break;
        }
    });
}

function productForSale() {
    var query = "SELECT * FROM products";

    connection.query(query, function(error, response) {
        var productDisplay = response;
        var inventory = [];
        if(error) throw error;
        //console.log(productDisplay);
        for(i = 0; i < productDisplay.length; i++){
            inventory.push({
                "Item_id" : productDisplay[i].item_id,
                "Product Name" : productDisplay[i].Product_name, 
                "Department Name" : productDisplay[i].Department_name,
                "Price: $" : productDisplay[i].Price ,
                "Stock" : productDisplay[i].Stock_quantity
            });
        }
        console.table(inventory);
        returnToMenu();
    });

}

function lowInventory() {
    var query = "SELECT * FROM products WHERE Stock_quantity < 5";

    connection.query(query, function(error, response) {
        //var lowQuantity = response; 
        if(error) throw error;
        if(response.length === 0){
            console.log("There are sufficient stock");
            returnToMenu();
        } else{
            console.log("\n" + "*******The following products are low in quantity:*******" + "\n");
            var low = [];
            for(var i = 0; i < response.length; i++) {
                low.push({
                    "Item_id" : response[i].item_id,
                "Product Name" : response[i].Product_name,
                "Price: $" : response[i].Price,
                "Stock" : response[i].Stock_quantity
                });                
            }
            console.table(low);
        returnToMenu();
        }
    });
}

function addInventory() {
    inquirer.prompt({
        name : "action",
        type : "list",
        message : "Do you want to add items to the existing inventory?",
        choices : [
            "Yes",
            "No"
        ]
    }).then( function(answer) {
        switch(answer.action){
            case "Yes" :
                //code here.....
                addQuantity();
            break;
            case "No": 
                returnToMenu();
            break;
        }
    });
}

function newProduct() {
    inquirer.prompt([
        {
            name: "Product_name",
            type: "input",
            message: "Pls enter the product name you want to add."
        },
        {
            name: "Department_name",
            type: "input",
            message: "Pls enter the department the product belongs to."
        },
        {
            name: "Price",
            type: "input",
            message: "Pls enter the price of the product."
        },
        {
            name: "Stock_quantity",
            type: "input",
            message: "Pls enter the quantity."
        }
    ]).then(function(input) {
        var product = input.Product_name;
        var dept = input.Department_name;
        var price = input.Price;
        var quantity = input.Stock_quantity;
        console.log("\n" + "====================================================="+"\n"+
        "       Adding new product: \n -------------------------------------------------- " +"\n" + 
        "       Product_name: " + product + "\n" + 
        "       Department_name: " + dept + "\n" +
        "       Price: $" + price + "\n" +
        "       Stock_quantity: " + quantity + "\n" + "======================================================");
        var addProduct = "INSERT INTO products(Product_name, Department_name, Price, Stock_quantity) VALUES(?,?,?,?)";

        connection.query(addProduct, [product, dept, price, quantity], function(error, response){
            if(error) throw error;
            //console.log(response);
            console.log("       New product has been added to the product inventory with the item_id: " + response.insertId + "\n---------------------------------------------------------------------------------\n");
            returnToMenu();
        });
    });

}



function addQuantity() {
    inquirer.prompt([
        {
            name : "item_id",
            type : "input",
            message : "Enter the item_id for adding stock.",
            validate : function(value){
                if(isNaN(value) === false){
                    return true;
                }
                return false;
            }
        },
        {  
            name : "quantity",
            type : "input",
            message : "Enter the quantity you want to add.",
            validate : function(value){
                if(isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }]).then(function(answer) {

            var item = answer.item_id;
            var quantity = parseInt(answer.quantity);
            var query = "SELECT * FROM products WHERE ?";
            
            connection.query(query, {item_id : item}, function(error, response){
                if(error) throw error;
                //console.log(response.item_id);

                if(response.length === 0 ) {
                    console.log("*******Invalid Id. Pls enter a valid item_id.*******");
                    runManagerAction();
                } else {
                    var productDetail = response;
                    console.log("\n------------------------------------------\n"+ 
                    "       Product to be updated: " + productDetail[0].Product_name + "\n" +
                    "       Stock available: " + productDetail[0].Stock_quantity + "\n" +
                    "       Quantity to be added: " + quantity +
                    "\n----------------------------------------");
                    
                    inquirer.prompt({
                        name : "action",
                        type : "list",
                        message : "Do you want to proceed?",
                        choices : [
                            "Yes",
                            "No"
                        ]
                    }).then(function(answer){
                        switch(answer.action) {
                            case "Yes" :
                                //code here;
                                //var updateQuantity =  productDetail[0].Stock_quantity + quantity;
                                //console.log("productDetail: " + productDetail[0].Stock_quantity);
                                var updateStockQuantity = "UPDATE products SET stock_quantity = " + (productDetail[0].Stock_quantity + quantity) + " WHERE item_id = " + item;
                                //console.log(updateStockQuantity);

                                //console.log("stock: " + productDetail[0].Stock_quantity + "\n"+ 
                                //"quantity: " + quantity);
                                connection.query(updateStockQuantity, function(error, response) {
                                    var updatedStock = response;
                                    if(error) throw error;
                                    //console.log(updatedStock[0]);
                                    console.log("\n-------------------------------------------------------------\n" + "       New Stock available for the item id: " + item + " is "+  (productDetail[0].Stock_quantity + quantity) + "\n-------------------------------------------------------------");
                                    returnToMenu();
                                });
                            break;
                            case "No" : 
                                returnToMenu();
                            break;
                        }
                    });
                }
            });     
        });
}


function returnToMenu() {
    inquirer.prompt({
        name : "action",
        type : "list",
        message : "Do you want to go to main menu?",
        choices : [
            "Yes",
            "No"
        ]
    }).then( function(answer) {
        switch(answer.action) {
            case "Yes" :
                runManagerAction();
            break;
            case "No" : 
                connection.end();
            break;
        }
    });
}



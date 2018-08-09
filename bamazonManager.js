var mysql = require("mysql");
var inquirer = require("inquirer");

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
        if(error) throw error;
        //console.log(productDisplay);
                
        for(i = 0; i < productDisplay.length; i++){

            //console.log("Department: " + productDisplay[i].Department_name);
            if(productDisplay[i].Department_name === "Wearable Technology"){
                console.log("Department: " + productDisplay[i].Department_name);
                displayProduct();
            } else if (productDisplay[i].Department_name === "Movies & TV"){
                console.log("Department: " + productDisplay[i].Department_name);
                displayProduct();
            }else if (productDisplay[i].Department_name === "Video Games"){
                console.log("Department: " + productDisplay[i].Department_name);
                displayProduct();
            } else if (productDisplay[i].Department_name === "Beauty & Personal Care"){
                console.log("Department: " + productDisplay[i].Department_name);
                displayProduct();
            }else if(productDisplay[i].Department_name === "Toys & Games"){
                console.log("Department: " + productDisplay[i].Department_name);
                displayProduct();
            } else {
                console.log("Department: " + productDisplay[i].Department_name);
              displayProduct();
            }
        }
        returnToMenu();
        function displayProduct(){
            //console.log("Department: " + productDisplay[i].Department_name + "\n");
            //for (var i = 0; i < productDisplay.length; i++){
                console.log("==========================================================================================="+"\n"+"\n"+
                "       Item_id: " + productDisplay[i].item_id + "\n" +
                "       Product Name: " + productDisplay[i].Product_name + "\n" +
                "       Price: $" + productDisplay[i].Price + "\n" +
                "       Stock: " + productDisplay[i].Stock_quantity+"\n"+ "\n"+
                "=========================================================================================="+"\n"
                );
            //}
        }
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
            console.log("\n" + "The following products are low in quantity:" + "\n");
            for(var i = 0; i < response.length; i++) {
                console.log("\n"+ 
                "==========================================================================================="+"\n"+"\n"+
                "       Item_id: " + response[i].item_id + "\n" +
                "       Product Name: " + response[i].Product_name + "\n" +
                "       Price: $" + response[i].Price + "\n" +
                "       Stock: " + response[i].Stock_quantity+"\n"+ "\n"+
                "=========================================================================================="
                );
            }
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
        "Adding new product: \n ---------------------------------------- " +"\n" + "       Product_name: " + product + "\n" +
        "       Department_name: " + dept + "\n" +
        "       Price: $" + price + "\n" +
        "       Stock_quantity: " + quantity + "\n" + "======================================================");
        var addProduct = "INSERT INTO products(Product_name, Department_name, Price, Stock_quantity) VALUES(?,?,?,?)";

        connection.query(addProduct, {Product_name: product, Department_name: dept, Price: price, Stock_quantity: quantity}, function(error, response){ //HERE IS THE ERROR
            if(error) throw error;
            console.log("New product has been added to the product inventory with the item_id: " + response[0].item_id);
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
            var quantity = answer.quantity;
            var query = "SELECT * FROM products WHERE ?";
            
            connection.query(query, {item_id : item}, function(error, response){
                if(error) throw error;

                if(response.length === 0) {
                    console.log("       Invalid Id. Pls enter a valid item_id.");
                    runManagerAction();
                } else {
                    var productDetail = response;
                    console.log("\n" + "Product to be updated: " + productDetail[0].Product_name + "\n" +
                    "Stock available: " + productDetail[0].Stock_quantity + "\n" +
                    "Quantity to be added: " + quantity);
                    
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
                                var updateStockQuantity = "UPDATE products SET Stock_quantity = " + (productDetail[0].Stock_quantity + quantity) + "WHERE item_id = " + item;

                                console.log("stock: " + productDetail[0].Stock_quantity + "\n"+ 
                                "quantity: " + quantity);
                                connection.query(updateStockQuantity, function(error, response) { ///ERROR IS HERE
                                    var updatedStock = response;
                                    if(error) throw error;
                                    console.log(updatedStock[0]);
                                    console.log((updatedStock[0].Stock_quantity) + " Stock are available for the item id: " + item );
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



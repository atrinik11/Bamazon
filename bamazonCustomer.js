var mysql = require("mysql");
var inquirer = require("inquirer");
//import Table from "cli-table";

var connection = mysql.createConnection({
    host : "localhost",
    port : 3306,
    user : "root",
    password : "",
    database : "bamazon"
});

connection.connect(function(error) {
    if(error) throw error;
    console.log("Connected as Id: " + connection.threadId + "\n");
    runMenu();
});

//Creating a menu function which will be displayed when the js file in runned in the command line........
function runMenu() {
    var query = "SELECT * FROM products";
    connection.query(query,function(error, response) {
        if (error) throw error;
        console.log("************************************************************************************************************************\n");
        for(var i = 0; i < response.length; i++){
            console.log(
                "\n"+
                "       Item_id: " + response[i].item_id + 
                "   || Product Name: " + response[i].Product_name + 
                "   || Department Name: " + response[i].Department_name +
                "   || Price: $ " + response[i].Price +
                "   || Stock: " + response[i].Stock_quantity+"\n"
            );
        }      
        console.log("\n**********************************************************************************************************************\n");
        //Calling the userOrderInput function to carry out the transaction process..
        userOrderInput();
    });         
}

function userOrderInput(response) {

    inquirer.prompt([
        {
            name: "item_id",
            type: "input",
            message: "Enter the item number you want to buy?",
            validate : function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
            
        },
        {
            name: "quantity",
            type: "input",
            message: "Enter the quantity you want to purchase: ",
            validate : function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ]).then(function(input) {
            var item = input.item_id;
            var quantity = input.quantity;
            var query = "SELECT * FROM products WHERE ?";

            connection.query(query, {item_id: item}, function(error, response) {
                if(error) throw error;
    
                if(response.length === 0 ) {
                    console.log("       Invalid Item_id. Pls enter a valid Item_id.");
                        runMenu();
                } else {
                    if(quantity > response[0].Stock_quantity) {
                        console.log("\n----------------------------------------------------------------------------------------------------------------------------------------\n" + "       Your Product is out of stock, pls come back latter to place order or modify your order. Sorry for the inconvinience" +
                        "\n----------------------------------------------------------------------------------------------------------------------------------------");
                        afterOrder();
                    } else {
                        var productDetail = response;
                        console.log("\n");
                        //console.log("User requires: " + quantity + " quantity products.");
                        console.log("       Product name: " + productDetail[0].Product_name);
                        console.log("       Product price: $ " + productDetail[0].Price);
                        console.log("       In stock: " + productDetail[0].Stock_quantity + " quantities");                       
                        console.log("       Your product is in stock! You can place your order!");
    
                        inquirer.prompt({
                            name : "action",
                            type : "list",
                            message : "Do you want to place the order?",
                            choices : [
                                "Yes",
                                "No"
                            ]
                        }).then( function(answer) {
                            switch(answer.action) {
                                case "Yes" :
                                //Update the product table
                                var updateProductTable = "UPDATE products SET Stock_quantity = " + (productDetail[0].Stock_quantity - quantity) + " WHERE item_id = " + item;
                                    
                                connection.query(updateProductTable, function(error, data) {
                                   
                                    //Declaring a variable to hold the total price of the product the customer orders where the decimal will be till 2 places.
                                    var totalPrice = parseFloat((productDetail[0].Price * quantity).toFixed(2));
                                    if (error) throw error;
                              
                                    console.log("\n"+"\n" + "=============================================" + "\n"+
                                    "       Your order has been placed." + "\n" +
                                    "       Your order Summary: " + "\n" +
                                    "=============================================" + "\n" +
                                    "       Product: " + productDetail[0].Product_name + "\n" + 
                                    "       Quantity Ordered: " + quantity + "\n" + 
                                    "       Total Price: $ " + totalPrice + "\n" + "=============================================");
                                        
                                    //Calling afterOrder function asking user if they want to continue shopping. if yes then runmenu() will be called, if no then the database connection will end.
                                
                                    afterOrder();
                                
                                })
                                break;
                                case "No" : 
                                    connection.end();
                                break;
                            }
                        });
                    }
                }
            });
        });
}

function afterOrder() {
    inquirer.prompt({
        name : "action",
        type : "list",
        message : "Do you want to continue shopping?",
        choices : [
            "Yes",
            "No"
        ]
    }).then( function(answer) {
        switch(answer.action) {
            case "Yes" :
                runMenu();
            break;
            case "No" : 
                connection.end();
            break;
        }
    });
}


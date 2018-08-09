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
    inquirer.prompt({
        name : "menu",
        type : "list",
        message : "Which Department you want to shop today?",
        choices: [
            "Wearable Technology",
            "Movies & TV",
            "Video Games",
            "Beauty & Personal Care",
            "Toys & Games",
            "Chocolates & Candys",
            "Want to Exit Bamazon?"
        ]
    }).then(function(answer) {
        switch(answer.menu) {
            case "Wearable Technology":
                searchWearableTechnology();
            break;
            case "Movies & TV":
                searchMoviesTv();
            break;
            case "Video Games":
                searchVideoGames();
            break;
            case "Beauty & Personal Care" :
                searchBeautyPersonalCare();
            break;
            case "Toys & Games" :
                searchToysGames();
            break;
            case "Chocolates & Candys" :
                searchChocolatesCandys();
            break;
            case "Want to Exit Bamazon?" :
                afterOrder();
            break;
        }
    });
}

function searchWearableTechnology() {
    var query = "SELECT * FROM products WHERE Department_name = 'Wearable Technology'";
   
    connection.query(query,function(error, res) {
        if (error) throw error;
        for(var i = 0; i < res.length; i++){
            console.log(
                "==========================================================================================="+"\n"+"\n"+
                "       Item_id: " + res[i].item_id + 
                "   || Product Name: " + res[i].Product_name + 
                "   || Price: $" + res[i].Price +
                "   || Stock: " + res[i].Stock_quantity+"\n"+ "\n"+
                "=========================================================================================="
            );
        }      
        //Calling the userOrderInput function to carry out the transaction process..
        userOrderInput();
    });   
}

function searchMoviesTv() {
    var query = "SELECT * FROM products WHERE Department_name = 'Movies & TV'";
    connection.query(query,function(error, res) {
        if (error) throw error;
        for(var i = 0; i < res.length; i++){
            console.log(
                "=========================================================================================="+"\n"+"\n"+
                "       Item_id: " + res[i].item_id + 
                "   || Product Name: " + res[i].Product_name + 
                "   || Price: $" + res[i].Price +
                "   || Stock: " + res[i].Stock_quantity+"\n"+ "\n"+
                "=========================================================================================="
            );
        }      
        //Calling the userOrderInput function to carry out the transaction process..
        userOrderInput();
    });         
}

function searchVideoGames() {
    var query = "SELECT * FROM products WHERE Department_name = 'Video Games'";
    connection.query(query,function(error, res) {
        if (error) throw error;
        for(var i = 0; i < res.length; i++){
            console.log(
                "=========================================================================================="+"\n"+"\n"+
                "       Item_id: " + res[i].item_id + 
                "   || Product Name: " + res[i].Product_name + 
                "   || Price: $" + res[i].Price +
                "   || Stock: " + res[i].Stock_quantity+"\n"+ "\n"+
                "=========================================================================================="
            );
        }      
        //Calling the userOrderInput function to carry out the transaction process..
        userOrderInput();
    });   
}

function searchBeautyPersonalCare() {
    var query = "SELECT * FROM products WHERE Department_name = 'Beauty & Personal Care'";
    connection.query(query,function(error, res) {
        if (error) throw error;
        for(var i = 0; i < res.length; i++){
            console.log(
                "=========================================================================================="+"\n"+"\n"+
                "       Item_id: " + res[i].item_id + 
                "   || Product Name: " + res[i].Product_name + 
                "   || Price: $" + res[i].Price +
                "   || Stock: " + res[i].Stock_quantity+"\n"+ "\n"+
                "=========================================================================================="
            );
        }      
        //Calling the userOrderInput function to carry out the transaction process..
        userOrderInput();
    });   
}

function searchToysGames() {
    var query = "SELECT * FROM products WHERE Department_name = 'Toys & Games'";
    connection.query(query,function(error, res) {
        if (error) throw error;
        for(var i = 0; i < res.length; i++){
            console.log(
                "=========================================================================================="+"\n"+"\n"+
                "       Item_id: " + res[i].item_id + 
                "   || Product Name: " + res[i].Product_name + 
                "   || Price: $" + res[i].Price +
                "   || Stock: " + res[i].Stock_quantity+"\n"+ "\n"+
                "=========================================================================================="
            );
        }      
        //Calling the userOrderInput function to carry out the transaction process..
        userOrderInput();
    });   
}

function searchChocolatesCandys() {
    var query = "SELECT * FROM products WHERE Department_name = 'Chocolates & Candys'";
    connection.query(query,function(error, res) {
        if (error) throw error;
        for(var i = 0; i < res.length; i++){
            console.log(
                "=========================================================================================="+"\n"+"\n"+
                "       Item_id: " + res[i].item_id + 
                "   || Product Name: " + res[i].Product_name + 
                "   || Price: $" + res[i].Price +
                "   || Stock: " + res[i].Stock_quantity+"\n"+ "\n"+
                "=========================================================================================="
            );
        }      
        //Calling the userOrderInput function to carry out the transaction process..
        userOrderInput();
    });   
}

function userOrderInput() {

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
        }]).then(function(input) {
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
                        console.log("       Your Product is out of stock, pls come back latter to place order or modify your order. Sorry for the inconvinience");
                        runMenu();
                    } else {
                        var productDetail = response;
                        console.log("\n");
                        //console.log("User requires: " + quantity + " quantity products.");
                        console.log("       Product name: " + productDetail[0].Product_name);
                        console.log("       Product price: $" + productDetail[0].Price);
                        console.log("       In stock: " + productDetail[0].Stock_quantity + " qunatities");
                                           
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
                                var updateProductTable = "UPDATE products SET Stock_quantity = " + (productDetail[0].Stock_quantity - quantity) + "Product_sales = " + (productDetail[0].Price * quantity) + " WHERE item_id = " + item;
                                
                                connection.query(updateProductTable, function(error, data) {
                                    var updateTable = data;
                                    if (error) throw error;
                          
                                    console.log("\n"+"\n" + "=============================================" + "\n"+
                                    "       Your order has been placed." + "\n" +"       Your order Summary: " + "\n" +
                                    "=============================================" + "\n" +
                                    "       Product: " + productDetail[0].Product_name + "\n" + "       Quantity Ordered: " + quantity + "\n" + "       Total Price: $" + productDetail[0].Price * quantity + "\n" + "=============================================");
                                    for(var i = 0; i < updateTable.length; i++){                              
                                        console.log(
                                        "================================================================================"+"\n"+"\n"+
                                        "       Item_id: " + updateTable[i].item_id + 
                                        "   || Product Name: " + updateTable[i].Product_name + 
                                        "   || Price: $" + updateTable[i].Price +
                                        "   || Stock: " + updateTable[i].Stock_quantity+
                                        "   || Product_sales: "+ updateTable[i].Product_sales +"\n"+ "\n"+
                                        "================================================================================"
                                        );
                                    }      

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
            })
        })
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


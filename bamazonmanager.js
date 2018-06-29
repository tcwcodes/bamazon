var inquirer = require("inquirer");
var mysql = require ("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id: " + connection.threadId);
    ask();
});

function ask() {
    inquirer.prompt([
        {
            type: "list",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
            name: "ask_menu"
        }
    ]).then(function(response) {
        switch (response.ask_menu) {
            case "View Products for Sale":
                viewProd();
                break;
            case "View Low Inventory":
                viewLow();
                break;
            case "Add to Inventory":
                addInv();
                break;
            case "Add New Product":
                addProd();
                break;
        };
    });
};

function viewProd() {
    connection.query("select item_id, product_name, price, stock_quantity from products", function(err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    });
};

function viewLow() {
    connection.query("select item_id, product_name, price, stock_quantity from products where stock_quantity <=5", function(err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    });
};

function addInv() {
    connection.query("select item_id, product_name, price, stock_quantity from products", function(err, res) {
        if (err) throw err;
        console.log(res);
        inquirer.prompt([
            {
                type: "input",
                message: "What is the ID of the item you'd like to replenish?",
                name: "viewProd_id"
            },
            {
                type: "input",
                message: "How many units would you like to add?",
                name: "viewProd_units"
            }
        ]).then(function(response) {
            connection.query("select stock_quantity from products where item_id = ?", response.viewProd_id, function(err, res) {
                if (err) throw err;
                var origStock = res[0].stock_quantity;
                var newStock = parseInt(origStock) + parseInt(response.viewProd_units);
                console.log(newStock);
                connection.query("update products set ? where ?",
                    [
                        {
                            stock_quantity: newStock
                        },
                        {
                            item_id: response.viewProd_id
                        }
                    ], function(err, res) {
                        if (err) throw err;
                        viewProd();      
                });
            });
        });
    });
};

function addProd() {
    inquirer.prompt([
        {
            type: "input",
            message: "Product name:",
            name: "prod_name"
        },
        {
            type: "input",
            message: "Department name:",
            name: "prod_dept"
        },
        {
            type: "input",
            message: "Price:",
            name: "prod_price"
        },
        {
            type: "input",
            message: "Stock quantity:",
            name: "prod_stock"
        }
    ]).then(function(response) {
        console.log(response);
        connection.query(
        "insert into products set ?",
        {
            product_name: response.prod_name,
            department_name: response.prod_dept,
            price: response.prod_price,
            stock_quantity: response.prod_stock
        }, function(err, res) {
            if (err) throw err;
            viewProd();
        });
    });
};
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
    onConnect();
    // connection.end();
});

function onConnect() {
    connection.query("select item_id, product_name, price, stock_quantity from products", function(err, res) {
        if (err) throw err;
        console.log(res);
        ask();
    });
};

function ask() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the ID of the item you'd like to buy?",
            name: "ask_id"
        },
        {
            type: "input",
            message: "How many units do you want to buy?",
            name: "ask_units"
        }
    ]).then(function(response) {
        var id_asked = response.ask_id;
        var units_asked = response.ask_units;
        connection.query("select price, stock_quantity from products where item_id = ?", id_asked, function(err, res) {
            if (err) throw err;
            var units_inv = res[0].stock_quantity;
            var price = res[0].price;
            console.log("Units available: " + units_inv);
            console.log("Units asked: " + units_asked);
            if (units_asked > units_inv) {
                console.log("Insufficient quanity! Choose " + units_inv + " or less.")
            } else {
                var units_left = units_inv - units_asked
                var total = units_asked * price;
                console.log("Units left: " + units_left);
                connection.query(
                    "update products set ? where ?",
                    [
                        {
                            stock_quantity: units_left
                        },
                        {
                            item_id: id_asked
                        }
                    ], function(err, res) {
                        connection.query("select item_id, product_name, price, stock_quantity from products where item_id = ?", id_asked, function(err, res) {
                            if (err) throw err;
                            console.log("Your total: $" + total);
                            connection.end();
                        });
                    }
                );
            };
        });
    });
};
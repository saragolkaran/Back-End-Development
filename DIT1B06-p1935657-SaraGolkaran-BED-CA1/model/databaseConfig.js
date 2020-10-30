// Name: Sara Golkaran
// Class: 1B06
// Admin Number: P1935657

const mysql = require("mysql");


var dbconnet = {
    i : 5,
    m : "a string",
    connection : null,
    getConnection: function () {
        //get a connection to the Database
        var conn = mysql.createConnection({
            host: "localhost",
            port: "3306",
            user: "root", // installed mysql, what did you user/pwd
            password: "p1935657",
            database: "snapsell",
            dateStrings: true
        });

        this.connection = conn; // save into the connection variable
        return conn;
    },
    connectNow: function (connection) {
        connection.connect(function (err) {
            if (err) {
                // error exits, this is a failed attempt to connect
                console.log(err);
            }
            else {
                console.log("DB Connection successful")
            }
        });
    }
};




module.exports = dbconnet;
// Name: Sara Golkaran
// Class: 1B06
// Admin Number: P1935657

//--------------------------
//     Envrionment Setup
//--------------------------

console.log("----------------- < app.js :: /login :: envrionment setup > --------------")
console.log("process ENV(node_env): " + process.env.NODE_ENV);
console.log("----------------- < app.js :: /login :: envrionment setup > --------------")


if (process.env.NODE_ENV === "development") {
    console.log("---node_env(dev) detected---")
//                       |-- the load function
//                       |                 |-- config file
    require('dotenv').config({ path: ".env.development" });
}

//--------------------------
//    Imports
//--------------------------

const app = require("./controller/app");
const dbServer = require("./model/databaseConfig");
//--------------------------
//     Configurations
//--------------------------
const hostname = 'localhost';
const port = process.env.PORT
//--------------------------
//          Main
//--------------------------
app.listen(port, hostname, () => {
    console.log(`Server started and accessible via http://${hostname}:${port}/`);
});

// maintain a live connection to DB
var conn = dbServer.getConnection();
dbServer.connectNow(conn);

// hello world

//--------------------------
//          testing
//--------------------------

// const userTest = require("./unitTesting/user");

// // activate the testing for 'findByID'
// userTest.findByID();

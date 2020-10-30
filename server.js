
const app = require("./controller/app");
const dbServer = require("./model/databaseConfig");
//--------------------------
//     Configurations
//--------------------------
const hostname = 'localhost';
const port = 3000;
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

const user = require("../model/user");

var test = {
    findByID: function () {
        var values = [1, 1999, "sdfghjk"];

        values.forEach(val => {
            user.findByID(val, function (err, user) {
                console.log("------------------");
                console.log("\tuserTesting.findByID[id=" + val + "]");
                console.log("--------------------------");
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(user);
                }
            });
        });
    },
    findAll: function () { }

};

module.exports = test;

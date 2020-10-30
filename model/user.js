// Name: Sara Golkaran
// Class: 1B06
// Admin Number: P1935657

const db = require("./databaseConfig");
//--------------------------
//     Configurations
//--------------------------
var userDB = {
    // 3) retrive a single user by their id
    findByID: function (userid, callback) {

        var sqlCmd = "SELECT * FROM user WHERE id = ?";
        //
        //                    |-- this is used to replace the ?
        //                    |
        db.connection.query(sqlCmd, [userid], function (err, result) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                //sucess
                // there are 2 possibilities
                // either you get NO record, or one record
                if (result.length === 0) {
                    return callback(null, null);
                }
                else {
                    console.log(result[0]);
                    return callback(null, result[0]);
                }
            }
        });
    },

    // 1) retirive all the users data
    findAll: function (callback) {


        var sqlCmd = "SELECT * FROM user";

        db.connection.query(sqlCmd, [], function (err, result) {

            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log(result);
                return callback(null, result)

            }
        });
    },

    // 2) used to add a new user to the database
    insert: function (data, callback) {

        var sqlCmd = "INSERT INTO user (username, email, password, phonenum) VALUES (?,?, ?,? )";
        var values = [
            data.username,
            data.email,
            data.password,
            data.phonenum
        ];
        db.connection.query(sqlCmd, values, function (err, result) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log(result);
                return callback(null, result);
            }
        });
    },

    // 4) update a single user by id
    edit: function (data, callback) {

        var sqlCmd = "UPDATE user set username=?, email=?, password=?, phonenum=? WHERE id=?";
        var values = [
            data.username,
            data.email,
            data.password,
            data.phonenum,
            data.id
        ];
        db.connection.query(sqlCmd, values, function (err, result) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log(result);
                return callback(null, result);
            }
        });
    },
    viewListings : function (fk_user_id, callback){
        var sqlCmd = "SELECT * FROM listings WHERE fk_user_id = ?";
        db.connection.query(sqlCmd, [fk_user_id], function (err, result){
            if(err){
                console/log(err);
                return callback(err, null);
            }
            else {
                if(result.length === 0){
                    return callback(null, null);
                }
                else {
                    console.log(result);
                    return callback(null, result);
                }
            }
        });
    },


};

//example usage: userDB.getUser();

module.exports = userDB;
// Name: Sara Golkaran
// Class: 1B06
// Admin Number: P1935657

const db = require("./databaseConfig");

//--------------------------
//     Configurations
//--------------------------
var listingDB = {

    // 6) get listings by id
    findByID: function (listingid, callback) {

        var sqlCmd = "SELECT * FROM listings WHERE id = ?";
        db.connection.query(sqlCmd, [listingid], function (err, result) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
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

    //get all listings
    findAll: function (callback) {


        var sqlCmd = "SELECT * FROM listings";

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

    //post one listing
    insert: function (data, callback) {

        var sqlCmd = "INSERT INTO listings (title, description, price, fk_user_id) VALUES (?,?,?,? )";
        var values = [
            data.title,
            data.description,
            data.price,
            data.fk_user_id
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

    // edit listing
    edit: function (data, callback) {

        var sqlCmd = "UPDATE listings set title=?, description=?, price=?, fk_user_id=? WHERE id=?";
        var values = [
            data.title,
            data.description,
            data.price,
            data.fk_user_id,
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

    //delete listing
    delete: function (listingsid, callback) {
                var sqlCmd = "DELETE FROM listings WHERE id = ?"; 
                db.connection.query(sqlCmd, [listingsid], function (err, result) {
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

};




module.exports = listingDB;
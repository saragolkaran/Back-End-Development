// Name: Sara Golkaran
// Class: 1B06
// Admin Number: P1935657

const db = require("./databaseConfig");
var offerDB = {

    //get offer from a specific listing
    viewOffer: function (fk_listing_id, callback) {
        var sqlCmd = "SELECT * FROM offer WHERE fk_listing_id = ?";
        db.connection.query(sqlCmd, [fk_listing_id], function (err, result) {
            if (err) {
                console / log(err);
                return callback(err, null);
            }
            else {
                if (result.length === 0) {
                    return callback(null, null);
                }
                else {
                    console.log(result);
                    return callback(null, result);
                }
            }
        });
    },

    // adds offer for listing
    insertOffer: function (data, callback) {

        var sqlCmd = "INSERT INTO offer (offer, fk_listing_id, fk_offeror_id) VALUES (?,?,?)";
        var values = [
            data.offer,
            data.fk_listing_id,
            data.fk_offeror_id
        ];
        db.connection.query(sqlCmd, values, function (err, result) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                
                if (result.length === 0) {
                    return callback(err, null);
                }
                else {
                    console.log(result);
                    return callback(null, result);
                }
            }
        });
    },


};


module.exports = offerDB;
// Name: Sara Golkaran
// Class: 1B06
// Admin Number: P1935657



const db = require("./databaseConfig");


var likeDB = {
    showLikers: function (likerid, callback) {
        var sqlCmd = "";
        sqlCmd += "SELECT ";
        
        sqlCmd += "l.fk_user_id, ";
        sqlCmd += "l.title, ";
        sqlCmd += "u.username, ";
        sqlCmd += "s.created_at ";

        sqlCmd += "FROM ";
        sqlCmd += "snapsell.user as u, ";
        sqlCmd += "snapsell.listings as l, ";
        sqlCmd += "snapsell.likes as s ";

        sqlCmd += "WHERE ";
        sqlCmd += "fk_listing_id = ? AND ";
        sqlCmd += "s.fk_liker_id = u.id AND ";
        sqlCmd += "s.fk_listing_id = l.id ";

        db.connection.query(sqlCmd, [likerid], function (err, result) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                //sucess
                // there are 2 possibilities
                // either you get NO record, or SOME records
                if (result.length === 0) {
                    return callback(null, null);
                }
                else {
                    //console.log(result[0]);
                    return callback(null, result);
                }
            }
        });
    },

    insert: function (data, callback) {

        var sqlCmd = "INSERT INTO likes (fk_liker_id, fk_listing_id) VALUES (?,? )";
        var values = [
            data.fk_liker_id,
            data.fk_listing_id
            
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

    delete: function (likerid, callback) {
        var sqlCmd = "DELETE FROM likes WHERE id = ?";

        db.connection.query(sqlCmd, [likerid], function (err, result){
            if(err){
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log(result);
                return callback (null, result);
            }
        });
    }


};

module.exports = likeDB;
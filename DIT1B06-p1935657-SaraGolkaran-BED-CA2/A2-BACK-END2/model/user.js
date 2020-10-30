// Name: Sara Golkaran
// Class: 1B06
// Admin Number: P1935657

const db = require("./databaseConfig");
const bcrypt = require("bcrypt");
const saltRounds = 10;
var jwt = require('jsonwebtoken');
var config = require('../config.js');

//--------------------------
//     Configurations
//--------------------------
var userDB = {
    // verify the login of user
    verify: function (data, callback) {
        // username is a unique column, so this statement will have
        // either 0 or 1 record returned
        var sqlCmd = "SELECT * FROM user WHERE email=?";

        var values = [
            data.email
        ];
        db.connection.query(sqlCmd, values, function (err, result) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log(result);

                // (null, null)
                if (result.length == 0) {
                    return callback(null, null);
                }
                else {

                    // (null, one username)

                    // now we have
                    // 1. password user tries to sign in with (data.password)(plain)
                    // 2. password stored in database (result[0].password)(hashed)

                    var user = result[0];

                    //               |-- plain to be hashed
                    //               |              |-- already hashed
                    bcrypt.compare(data.password, user.password, function (err, cmp_result) {
                        if (err) {
                            return callback(err, null);
                        }
                        else {
                            if (!cmp_result) {
                                return callback(null, null);
                            }
                            else {
                                return callback(null, user);
                            }
                        }
                    });
                }

            }
        });
    },

    loginUser: function (email, password, callback) {

        var conn = db.getConnection();

        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");

                var sql = 'select * from user where email=?';

                conn.query(sql, [email], function (err, result) {
                    // conn.end();

                    if (err) {
                        console.log("Err: " + err);
                        return callback(err, null, null);
                    } else {
                        var token = "";
                        var i;
                        if (result.length == 1) {
                            hash = result[0].password;

                            bcrypt.compare(password, hash, function (err, res) {
                                if (res) {
                                    token = jwt.sign({ id: result[0].userid, role: result[0].role }, config.key, {
                                        expiresIn: 86400 //expires in 24 hrs
                                    });
                                    console.log("@@token " + token);
                                    return callback(null, token, result);
                                } //if(res)
                                else {
                                    console.log("password does not match");
                                    var err2 = new Error("UserID/Password does not match.");
                                    err2.statusCode = 500;
                                    console.log(err2);
                                    return callback(err2, null, null);
                                }
                            }); //bcrypt.compare
                        } else {
                            var err2 = new Error("UserID/Password does not match.");
                            err2.statusCode = 500;
                            return callback(err2, null, null);
                        }
                    }  //else
                });
            }
        });
    },

    // 3) retrive a single user by their id
    findByID: function (userid, callback) {

        var sqlCmd = "SELECT id, username, email, phonenum FROM user WHERE id = ?";
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
    // insert: function (data, callback) {

    //     var sqlCmd = "INSERT INTO user (username, email, password, phonenum) VALUES (?,?, ?,? )";

    //     bcrypt.genSalt(saltRounds, function (err, salt) {
    //         bcrypt.hash(data.password, salt, function (err, hash) {

    //             var values = [
    //                 data.username,
    //                 data.email,
    //                 data.password,
    //                 data.phonenum
    //             ];
    //             db.connection.query(sqlCmd, values, function (err, result) {
    //                 if (err) {
    //                     console.log(err);
    //                     return callback(err, null);
    //                 }
    //                 else {
    //                     console.log(result);
    //                     return callback(null, result);
    //                 }
    //             });

    //         });
    //     });

    // },

    addUser: function(username,email,password,phonenum,callback){
		
		var conn = db.getConnection();
		
		conn.connect(function(err){
			if (err){
				console.log(err);
				return callback(err,null); 
			}else{
				bcrypt.hash(password, saltRounds, function(err, hash){
					
					if(err){
						console.log(err);
						return callback(err,null);
					}
					
					password=hash;
					
					console.log("Connected!");
					sqlStr = "Insert into user(username,email,password,phonenum) values(?,?,?,?)";
					conn.query(sqlStr,[username, email, password, phonenum],function(err, result){
						conn.end();
						
						if(err){
							console.log(err);
							return callback(err,null);
						}else{
							return callback(null,result);
						}
					});
				});
			}
		});
    },
    
    // insert: function (data, callback) {

    //     var sqlCmd = "INSERT INTO user (username,email,password,phonenum) VALUES (?, ?, ?, ?)";

    //     // we do not need a salt to generate the password hash
    //     // because bcrypt generates them for us and appends it
    //     // to the password hash to prevent rainbow table attacks
    //     bcrypt.genSalt(saltRounds, function (err, salt) {
    //         bcrypt.hash(data.password, salt, function (err, hash) {
    //             var values = [
    //                 data.username,
    //                 data.email,
    //                 data.password,
    //                 data.phonenum,
    //                 hash // data.password
    //             ];
    //             db.connection.query(sqlCmd, values, function (err, result) {
    //                 if (err) {
    //                     console.log(err);
    //                     return callback(err, null);
    //                 }
    //                 else {
    //                     console.log(result);
    //                     return callback(null, result);
    //                 }
    //             });

    //         });
    //     });

    // },


    // 4) update a single user by id
    edit: function (data, callback) {

        var sqlCmd = "UPDATE user set username=?, email=?, phonenum=? WHERE id=?";
        var values = [
            data.username,
            data.email,
            // data.password,
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
    
    // updateUser:function(username,email,phonenum, id, callback){
		
	// 	var conn=db.getConnection();
		
	// 	conn.connect(function(err){
	// 		if(err){
	// 			console.log(err);
	// 			return callback(err,null);
	// 		}else{
	// 			console.log("Connected!");

	// 			/*
	// 			 current user
	// 			 username:u5
	// 			 email: u5@test.com
	// 			 role: user

	// 			 To be updated with:
	// 			  username: u50
	// 			  email: u50@test.com
	// 			  role: user
	// 			*/
				
	// 			// var sql="UPDATE user SET username=?, role=? WHERE email=?";
	// 			var sql="UPDATE user SET username=?, email=?, phonenum=? WHERE id=?";
				
	// 			conn.query(sql,[username, email, phonenum, id],function(err,result){
	// 				conn.end();
					
	// 				if(err){
	// 					console.log(err);
	// 					return callback(err,null);
	// 				}else{
	// 					console.log("No. of records updated successfully: "+result.affectedRows);
	// 					return callback(null,result.affectedRows);
	// 				}
	// 			})
	// 		}
	// 	})
	// },
    viewListings: function (fk_user_id, callback) {
        console.log("-------sdfsdf------");
        
        var sqlCmd = "SELECT * FROM listings WHERE fk_user_id = ?";
        db.connection.query(sqlCmd, [fk_user_id], function (err, result) {
            
            if (err) {
                console.log(err);
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

    findAllOffers: function (id, callback) {


        var sqlCmd = "SELECT * FROM offer AS o, listings AS l, user AS u WHERE l.fk_user_id=? AND o.fk_listing_id=l.id AND u.id=o.fk_offeror_id";

        db.connection.query(sqlCmd, [id], function (err, result) {

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

    search: function (criteria, callback) {


        var sqlCmd = "SELECT * FROM listings AS l, user AS u WHERE u.id = l.fk_user_id AND l.title LIKE ?";

        db.connection.query(sqlCmd, ['%'+criteria+'%'], function (err, result) {

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




};

//example usage: userDB.getUser();

module.exports = userDB;
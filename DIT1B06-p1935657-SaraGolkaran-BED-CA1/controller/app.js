// Name: Sara Golkaran
// Class: 1B06
// Admin Number: P1935657


const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const user = require('../model/user');
const listing = require('../model/listing');
const offer = require('../model/offer');
const like = require('../model/like');
const dislike = require('../model/dislike');

//--------------------------
//     Configurations
//--------------------------
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();

//--------------------------
//      Middleware
//--------------------------
app.use(urlencodedParser);
app.use(jsonParser);

//--------------------------
//     Service Requests
//--------------------------

// 1) get all users
app.get('/users', function (req, res) {
    console.log("Last MF for servicing GET /api/users...");

    var statusCode = 0;

    //contact the model layer
    user.findAll(function (err, result) {
        var jsonData = null;
        var output = null;

        if (err) {
            statusCode = 500; // unknown error
            jsonData = {
                "Results": "Internal Error"
            };

            output = JSON.stringify(jsonData);
        }
        else {
            statusCode = 200; // success response

            output = JSON.stringify(result);
        }

        //sending data out
        res.status(statusCode);
        res.type("json");
        res.send(output);
    });
});

// 2) add one user
app.post('/users', function (req, res) {
    console.log("Last MF for servicing POST /users...");

    var statusCode = 0;

    //let's assume we want to update the email and password
    var data = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        phonenum: req.body.phonenum
    };

    console.log(data);

    //contact the model layer
    user.insert(data, function (err, result) {
        var jsonData = null;
        var output = null;


        if (err) {
            statusCode = 500;
            jsonData = {
                "Results": "Internal Error"
            };

            output = JSON.stringify(jsonData);
        }
        else {
            statusCode = 201;

            var message = " userID: " + result.insertId;

            output = JSON.stringify(message);
        }
        //sending data out
        res.status(statusCode);
        res.type("json");
        res.send(output);
    });
});


// 3) get one user
app.get('/users/:id', function (req, res) {
    console.log("Last MF for servicing GET /users/:id...");

    var statusCode = 0;

    var id = req.params.id;

    //contact the model layer
    user.findByID(id, function (err, result) {
        var jsonData = null;
        var output = null;

        if (err) {
            statusCode = 500;
            jsonData = {
                "Results": "Internal Error"
            }

            output = JSON.stringify(jsonData);
        }
        else {
            if (!result) {
                statusCode = 404;
                var message = "No records found";
                output = JSON.stringify(message);
            }
            else {

                statusCode = 200;

                output = JSON.stringify(result);
            }
        }
        //sending data out
        res.status(statusCode);
        res.type("json");
        res.send(output);
    });
});

// 4) update one user
app.put('/users/:id', function (req, res) {


    var statusCode = 0;

    var data = {
        id: req.params.id,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        phonenum: req.body.phonenum
    };

    console.log(data);

    //contact the model layer
    user.edit(data, function (err, result) {
        var jsonData = null;
        var output = null;

        if (err) {
            if (err.errno == 1062) {
                statusCode = 422;

                message = "The new username provided already exists. "
                output = JSON.stringify(message);
            }
            else {
                statusCode = 500;
                jsonData = {
                    "Results": "Internal Error"
                };

                output = JSON.stringify(jsonData);
            }
        }
        else {
            if (result.affectedRows == 0) {
                //update.. wrong ID given
                statusCode = 404;
                message = "No record found. Cannot update";
                output = JSON.stringify(message);
            }
            else {
                statusCode = 204;
            }

        }

        //sending data out
        res.status(statusCode);
        res.type("json");
        res.send(output);
    });
});

//........................................//

//5) get users listing
app.get('/users/:user_id/listings/', function (req, res) {
    console.log("Last MF for servicing GET /users/:user_id/listings...");

    var statusCode = 0;

    var id = req.params.user_id;

    //contact the model layer
    user.viewListings(id, function (err, result) {
        var jsonData = null;
        var output = null;

        if (err) {
            statusCode = 500;
            jsonData = {
                "Results": "Internal Error"
            }

            output = JSON.stringify(jsonData);
        }
        else {
            if (!result) {
                statusCode = 404;
                var message = "No records found";
                output = JSON.stringify(message);
            }
            else {

                statusCode = 200;

                output = JSON.stringify(result);
            }
        }
        //sending data out
        res.status(statusCode);
        res.type("json");
        res.send(output);
    });
});


// 6) get all listings in the database
app.get('/listings', function (req, res) {
    console.log("Last MF for servicing GET /listings...");

    var statusCode = 0;

    //contact the model layer
    listing.findAll(function (err, result) {
        var jsonData = null;
        var output = null;

        if (err) {
            statusCode = 500; // unknown error
            jsonData = {
                "Results": "Internal Error"
            };

            output = JSON.stringify(jsonData);
        }
        else {
            statusCode = 200; // success response

            output = JSON.stringify(result);
        }

        //sending data out
        res.status(statusCode);
        res.type("json");
        res.send(output);
    });
});

// 7) Retrives a single listings by its id
app.get('/listings/:listings_id', function (req, res) {
    console.log("Last MF for servicing GET /listings/:listing_id...");

    var statusCode = 0;

    var id = req.params.listings_id;

    //contact the model layer
    listing.findByID(id, function (err, result) {
        var jsonData = null;
        var output = null;

        if (err) {
            statusCode = 500;
            jsonData = {
                "Results": "Internal Error"
            }

            output = JSON.stringify(jsonData);
        }
        else {
            if (!result) {
                statusCode = 404;
                var message = "No records found";
                output = JSON.stringify(message);
            }
            else {

                statusCode = 200;

                output = JSON.stringify(result);
            }
        }
        //sending data out
        res.status(statusCode);
        res.type("json");
        res.send(output);
    });
});

// 8) add a new listings to the database
app.post('/listings', function (req, res) {
    console.log("Last MF for servicing POST /users...");

    var statusCode = 0;

    //let's assume we want to update the email and password
    var data = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        fk_user_id: req.body.fk_user_id
    };

    console.log(data);

    //contact the model layer
    listing.insert(data, function (err, result) {
        var jsonData = null;
        var output = null;


        if (err) {
            statusCode = 500;
            jsonData = {
                "Results": "Internal Error"
            };

            output = JSON.stringify(jsonData);
        }
        else {
            // use 201, when a new resource is created
            statusCode = 201;

            var message = "listingID: " + result.insertId;
            output = JSON.stringify(message);
        }
        //sending data out
        res.status(statusCode);
        res.type("json");
        res.send(output);
    });
});

// 9) delete a listings by its id
app.delete('/listings/:id', function (req, res) {
    console.log("Last MF for servicing DELETE /listings/:id...");

    var statusCode = 0;

    var id = req.params.id;

    //contact the model layer
    listing.delete(id, function (err, result) {
        var jsonData = null;
        var output = null;

        if (err) {
            statusCode = 500;
            jsonData = {
                "Results": "Internal Server Error"
            };

            output = JSON.stringify(jsonData);
        }
        else {
            statusCode = 201;

            var message = result.affectedRows + " record(s) updated";

            output = JSON.stringify(message)
        }
        //sending data out
        res.status(statusCode);
        res.type("json");
        res.send(output);
    });
});

// 10) update a listings
app.put('/listings/:id', function (req, res) {
    console.log("Last MF for servicing PUT /listings/:id...");

    var statusCode = 0;

    //let's assume we want to update the email and password
    var data = {
        id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        fk_user_id: req.body.fk_user_id
    };

    console.log(data);

    //contact the model layer
    listing.edit(data, function (err, result) {
        var jsonData = null;
        var output = null;

        if (err) {
            statusCode = 500;
            jsonData = {
                "Results": "Internal Error"
            };

            output = JSON.stringify(jsonData);
        }
        else {
            if (result.affectedRows == 0) {
                //update.. wrong ID given
                statusCode = 404;
                message = "No record found. Cannot update";
                output = JSON.stringify(message);
            }
            else {
                statusCode = 201;
                message = result.affectedRows + " record(s) updated";
                output = JSON.stringify(message);

            }

        }

        //sending data out
        res.status(statusCode);
        res.type("json");
        res.send(output);
    });
});

//11) Retrives all offers of a listing
app.get('/listings/:id/offers/', function (req, res) {
    console.log("Last MF for servicing GET /listings/:id/offer...");

    var statusCode = 0;

    var id = req.params.id;

    //contact the model layer
    offer.viewOffer(id, function (err, result) {
        var jsonData = null;
        var output = null;

        if (err) {
            statusCode = 500;
            jsonData = {
                "Results": "Internal Error"
            }

            output = JSON.stringify(jsonData);
        }
        else {
            if (!result) {
                statusCode = 404;
                var message = "No records found";
                output = JSON.stringify(message);
            }
            else {

                statusCode = 200;

                output = JSON.stringify(result);
            }
        }
        //sending data out
        res.status(statusCode);
        res.type("json");
        res.send(output);
    });
});

// 12) adds an offer for that listings
app.post('/listings/:id/offers', function (req, res) {
    console.log("Last MF for servicing POST /listings/:id/offers");

    var statusCode = 0;

    // var id = req.params.id;

    //let's assume we want to update the email and password
    var data = {
        offer: req.body.offer,
        fk_offeror_id: req.body.fk_offeror_id,
        fk_listing_id: req.params.id
    }


    console.log(data);

    //contact the model layer
    offer.insertOffer(data, function (err, result) {
        var jsonData = null;
        var output = null;


        if (err) {
            statusCode = 500;
            jsonData = {
                "Results": "Internal Error"
            };

            output = JSON.stringify(jsonData);
        }
        else {
            // use 201, when a new resource is created
            statusCode = 201;

            var message = "OfferID: " + result.insertId;

            output = JSON.stringify(message);
        }
        //sending data out
        res.status(statusCode);
        res.type("json");
        res.send(output);
    });
});

// advance feature for likes
// get all likes
app.get('/listings/:id/likes', function (req, res) {
    console.log("Last MF for servicing GET /listings/:id/likes...");

    var statusCode = 0;

    var id = req.params.id;

    //contact the model layer
    like.showLikers(id, function (err, result) {
        var jsonData = null;
        var output = null;

        if (err) {
            statusCode = 500;
            jsonData = {
                "Results": "Internal Error"
            }

            output = JSON.stringify(jsonData);
        }
        else {
            if (!result) {
                statusCode = 404;
                var message = "No records found";
                output = JSON.stringify(message);
            }
            else {

                statusCode = 200;

                var likerList = [];

                for (var i = 0; i < result.length; i++) {
                    likerList.push(result[i].username);
                }

                jsonData = {
                    "PosterID": result[0].fk_user_id,
                    "listing": result[0].title,
                    "Likers": likerList,
                    "Created_at": result[0].created_at
                }

                output = JSON.stringify(jsonData);
            }
        }
        //sending data out
        res.status(statusCode);
        res.type("json");
        res.send(output);
    });
});

//post one like
app.post('/likes', function (req, res) {
    console.log("Last MF for servicing POST /likes...");

    var statusCode = 0;

    var data = {
        fk_liker_id: req.body.fk_liker_id,
        fk_listing_id: req.body.fk_listing_id,
    };

    console.log(data);

    //contact the model layer
    like.insert(data, function (err, result) {
        var jsonData = null;
        var output = null;


        if (err) {
            statusCode = 500;
            jsonData = {
                "Results": "Internal Error"
            };

            output = JSON.stringify(jsonData);
        }
        else {
            // use 201, when a new resource is created
            statusCode = 201;

            var message = result.affectedRows + " like(s) added";

            output = JSON.stringify(message);
        }
        //sending data out
        res.status(statusCode);
        res.type("json");
        res.send(output);
    });
});

// delete like
app.delete('/likes/:id', function (req, res) {
    console.log("Last MF for servicing DELETE /likes/:id...");

    var statusCode = 0;

    var id = req.params.id;

    //contact the model layer
    like.delete(id, function (err, result) {
        var jsonData = null;
        var output = null;

        if (err) {
            statusCode = 500;
            jsonData = {
                "Results": "Internal Server Error"
            };

            output = JSON.stringify(jsonData);
        }
        else {
            statusCode = 201;

            var message = result.affectedRows + " record(s) updated";

            output = JSON.stringify(message)
        }
        //sending data out
        res.status(statusCode);
        res.type("json");
        res.send(output);
    });
});

//advance feature for dislike
// get dislike
app.get('/listings/:id/dislikes', function (req, res) {
    console.log("Last MF for servicing GET /listings/:id/dislike...");

    var statusCode = 0;

    var id = req.params.id;

    //contact the model layer
    dislike.showDislikers(id, function (err, result) {
        var jsonData = null;
        var output = null;

        if (err) {
            statusCode = 500;
            jsonData = {
                "Results": "Internal Error"
            }

            output = JSON.stringify(jsonData);
        }
        else {
            if (!result) {
                statusCode = 404;
                var message = "No records found";
                output = JSON.stringify(message);
            }
            else {

                statusCode = 200;

                var DislikerList = [];

                for (var i = 0; i < result.length; i++) {
                    DislikerList.push(result[i].username);
                }

                jsonData = {
                    "PosterID": result[0].fk_user_id,
                    "listing": result[0].title,
                    "Dislikers": DislikerList,
                    "Created_at": result[0].created_at
                }

                output = JSON.stringify(jsonData);
            }
        }
        //sending data out
        res.status(statusCode);
        res.type("json");
        res.send(output);
    });
});

//post dislike
app.post('/dislikes', function (req, res) {
    console.log("Last MF for servicing POST /dislikes...");

    var statusCode = 0;

    var data = {
        fk_disliker_id: req.body.fk_disliker_id,
        fk_listing_id: req.body.fk_listing_id,
    };

    console.log(data);

    //contact the model layer
    dislike.insert(data, function (err, result) {
        var jsonData = null;
        var output = null;


        if (err) {
            statusCode = 500;
            jsonData = {
                "Results": "Internal Error"
            };

            output = JSON.stringify(jsonData);
        }
        else {
            // use 201, when a new resource is created
            statusCode = 201;

            var message = result.affectedRows + " Dislike(s) added";

            output = JSON.stringify(message);
        }
        //sending data out
        res.status(statusCode);
        res.type("json");
        res.send(output);
    });
});

// delete dislike
app.delete('/dislikes/:id', function (req, res) {
    console.log("Last MF for servicing DELETE /dislikes/:id...");

    var statusCode = 0;

    var id = req.params.id;

    //contact the model layer
    dislike.delete(id, function (err, result) {
        var jsonData = null;
        var output = null;

        if (err) {
            statusCode = 500;
            jsonData = {
                "Results": "Internal Server Error"
            };

            output = JSON.stringify(jsonData);
        }
        else {
            statusCode = 201;

            var message = result.affectedRows + " record(s) updated";

            output = JSON.stringify(message)
        }
        //sending data out
        res.status(statusCode);
        res.type("json");
        res.send(output);
    });
});





//--------------------------
//          Main
//--------------------------
module.exports = app;
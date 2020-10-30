// Name: Sara Golkaran
// Class: 1B06
// Admin Number: P1935657


const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const user = require('../model/user');
var cors = require('cors');

const listing = require('../model/listing');
const offer = require('../model/offer');





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
app.options('*',cors());
app.use(cors());


//--------------------------
//     Service Requests
//--------------------------



//END POINT 1 LOGIN
app.post('/login', function (req, res) {
    console.log("POST /login...");
    
        var email = req.body.email;
        var password = req.body.password;
    
        user.loginUser(email,password, function(err, token, result){
            if(!err){
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                // delete result[0]['password'];//clear the password in json data, do not send back to client
                console.log(result);
                console.log(token);
                res.json({success: true, UserData: JSON.stringify(result), token:token, status: 'You are successfully logged in!'}); 
                res.send();
            }else{
                res.status(500);
                res.sendStatus(err.statusCode);
            }
        }); 
});

//END POINT 2 LOGOUT 
app.post('/user/logout', function(req,res){
	console.log("..logging out.");
	res.clearCookie('session-id'); //clears the cookie in the response
	res.setHeader('Content-Type', 'application/json');
  	res.json({success: true, status: 'Log out successful!'});

});

//END POINT 3 (VIEW OWN LISTED PRODUCTS)
app.get('/users/:user_id/listings/', function (req, res) {
    console.log("Last MF for servicing GET /users/:user_id/listings...");

    var statusCode = 0;

    var id = req.params.user_id;
    console.log("------ aa------");
    // console.log(id);

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

// END POINT 4 (VIEW OFFERS FROM OTHER USERS)
app.get('/offers/:id', function (req, res) {
    console.log("Last MF for servicing GET /offer...");

    var id = req.params.id;
    console.log(id);

    var statusCode = 0;

    //contact the model layer
    user.findAllOffers(id, function (err, result) {
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

//END POINT 5 ADD PRODUCT LISTINGS
app.post('/listings', function (req, res) {
    console.log("Last MF for servicing POST /users...");

    var statusCode = 0;

    //let's assume we want to update the email and password
    var data = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        fk_user_id : req.body.fk_user_id
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

// END POINT 6 SEARCH FUNCTIONALITY
app.get('/search/:criteria', function (req, res) {
    console.log("Last MF for servicing GET /search...");

    var statusCode = 0;
    var criteria = req.params.criteria;
    console.log(criteria)

    //contact the model layer
    user.search(criteria, function (err, result) {
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
})

// END POINT 7 ADD AN OFFER TO A LISTING
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

// add one user (DONE) CA1 PART
app.post('/user',function(req,res){
	
	var username = req.body.username;
	var email = req.body.email;
	var password = req.body.password;
	var phonenum = req.body.phonenum;
	
	user.addUser(username,email,password,phonenum,function(err,result){
	if(!err){
		res.status(200);
		res.send(result);
	}else{
		res.status(500);
		res.send("{\"message\":\"Some error!\"}");
	}
	});
});




//--------------------------
//          Main
//--------------------------
module.exports = app;
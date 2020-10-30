//isLoggedInMiddleware.js

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

function verifyToken (req, res, next) {
    const authHeader = req.headers.authorization;

    // does the header contains the authorization info
    if (authHeader === null || authHeader === undefined || !authHeader.startsWith("Bearer ")) {
        res.status(401).send("Unauthorized. [1]");
        return;
    }

    // extract the token
    const token = authHeader.replace("Bearer ", "");

    var options = {
        algorithms: ["HS256"]
    }
    jwt.verify(token, JWT_SECRET, options, function (error, decodedToken) {
        if (error) {
            res.status(401).send();
            return;
        }

        // take the decoded token and save it in the request object
        // so that other MFs down the chain can have access to it
        req.decodedToken = decodedToken;

        //call the next MF
        next();
    });
};


module.exports = verifyToken;
// Name: Sara Golkaran
// Class: 1B06
// Admin Number: P1935657

const express = require("express");
const app = express();



app.get("/home/", (req, res) => {
    // note that we are not using res.sendFile() instead of res.send()
  res.sendFile("/public/index.html", { root: __dirname });
});

app.get("/users/:id", (req, res) => {
  res.sendFile("/public/user.html", { root: __dirname });
});

app.get("/users/", (req, res) => {
  res.sendFile("/public/users.html", { root: __dirname });
});

app.get("/login/", (req, res) => {
  res.sendFile("/public/login.html", { root: __dirname });
});

app.get("/search/", (req, res) => {
  res.sendFile("/public/search.html", { root: __dirname });
});

app.get("/offer/", (req, res) => {
  res.sendFile("/public/offer.html", { root: __dirname });
});






const PORT = 3001;


app.listen(PORT, () => {

    console.log(`Client server has started listening on port ${PORT}`);
});

const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

const homeroutes = require("./routes/home.routes");
const cartroutes = require("./routes/cart.routes");
const session = require("express-session");


app.use(express.json())

app.use(session({
    secret: "SJSHAVDKHSAKHJDSAHVDLBABHSAVCLEVLVX",
    resave: false,
    saveUninitialized: false
}));

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use("/data", express.static("data"));

app.use("/home", homeroutes);
app.use("/cart", cartroutes);





app.listen(port, (err) =>{
    if(err){
        console.log("ERROR");
    }

    console.log("SUPER");
});
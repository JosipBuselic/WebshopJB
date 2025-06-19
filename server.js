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
    saveUninitialized: false,
    cookie: {
        maxAge: 30 * 60 * 1000
    }
}));

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use("/data", express.static("data"));

app.use("/home", homeroutes);
app.use("/cart", cartroutes);

app.get("/", (req,res) => {
    res.redirect("/home")
})





app.listen(port, (err) =>{
    if(err){
        console.log("ERROR");
    }

    console.log("Pokrenut server: localhost:3000/home");
});
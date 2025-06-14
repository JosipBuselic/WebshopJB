const express = require("express");
const router = express.Router();
const data = require("../data/data.js");
const { render } = require("ejs");



const getCategoriesFromData = () =>{
    var categories = [];

    for(var i = 0; i < data.categories.length; i++){
        categories.push({name: data.categories[i].name});
    }

    return categories;
};

const getProductsFromData = () =>{
    var products = [];

    for(var i = 0; i < data.categories.length; i++){
        products.push(data.categories[i]);
    }

    return products;
};


router.get("/", (req, res, next) =>{
    res.render("home");
});

router.get("/getCategories", (req, res, next) =>{
    const categories = getCategoriesFromData();
    res.json(categories);
});

router.get("/getProducts", (req, res, next) =>{
    res.render("kategorije");
});

router.get("/getProducts/:id", (req, res, next) =>{
    const id = req.params.id

    const products = getProductsFromData()

    res.json(products[id])
});

module.exports = router;
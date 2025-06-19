const express = require("express");
const router = express.Router();
const data = require("../data/data.js")


const getProductFromData = (productId) => {
    for (let i = 0; i < data.categories.length; i++) {
        for (let j = 0; j < data.categories[i].products.length; j++) {
            const product = data.categories[i].products[j];
            if (String(product.id) === String(productId)) {
                return product;
            }
        }
    }
    return null;
};

router.get("/", (req, res, next) =>{
    res.render("cart")
});

router.post("/add/:id", (req, res, next) =>{
    const productId = req.params.id
    quantity = 0

    if(!req.session.cart){
        req.session.cart = []
    }

    for(let i = 0; i < req.session.cart.length; i++){
        if(req.session.cart[i].id == productId){
            quantity = req.session.cart[i].quantity
            ++req.session.cart[i].quantity
        } 
    }

    if(quantity == 0){
        let product = getProductFromData(productId)

        let productCopy = {id: `${product.id}`,
                            name: `${product.name}`,
                            image: `${product.image}`,
                            size: product.size[req.body.size],
                            price: product.price,
                            quantity: ++quantity}

        req.session.cart.push(productCopy)
    }
    res.json({success: true});
});

router.get("/number", (req, res, next) => {

    let broj = 0

    if(!req.session.cart){
        res.json({broj: 0})
    }
    else{
        for(let i = 0; i < req.session.cart.length; i++){
            broj += req.session.cart[i].quantity
        }
        res.json({broj: broj})
    }
    
})

router.get("/getAll", (req, res, next) => {
    if(!req.session.cart){
        return res.json([])
    }
    res.json(req.session.cart)
})

router.post("/empty", (req, res, next) =>{
    req.session.cart = []
    res.json({success: true})
})

router.delete("/remove/:id", (req, res, next) =>{
    const productId = req.params.id


    for(let i = 0; i < req.session.cart.length; i++){

        if(req.session.cart[i].id == productId){

            --req.session.cart[i].quantity

            if(req.session.cart[i].quantity === 0){
                req.session.cart.splice(i, 1)
                res.json({deleteElement: true})
            }
            else{
                res.json({deleteElement: false})
            }
        } 
    }
})


module.exports = router
const express = require('express');
const productRoutes = express.Router();
const productModel = require('../models/product.model');

//get product by product id
productRoutes.route('/getproduct').get((req, res) => {
    let queryString = req.query.productid;
    // console.log(`products.route/getproduct - query productid - ${queryString}`);
    productModel.find({productId: queryString}, (err, data) => {
        if(err) console.log('products.route/getproduct - error fetching product from db', err);
        // console.log(`products.route/getproduct - retrieved from db ${data}`);
        res.status(200).json(data[0].toObject());
    })
    .catch(err => console.log('products.route/getproduct - error caught', err));
});

//get products by category
productRoutes.route('/getproducts').get((req, res) => {
    let _category = req.query.category;
    productModel.find({category: _category}, (err, data) => {
        if(err) console.log('products.route/getproducts - error fetching products', err);
        // console.log(`products.route/getproducts - products fetched - ${data}`);
        // console.log(`products.route/getproducts - document to json - ${JSON.stringify(data)}`);
        res.status(200).send(data);
    })
    .catch(err => console.log('products.route/getproducts - error caught', err));
}); 

productRoutes.route('/searchproducts').get((req, res) => {
    console.log(`product.route/searchproducts - query - ${req.query.searchstring}`);
    let _query = req.query.searchstring;
    productModel.find({"title": {"$regex": _query, "$options": "i"}}, (err, results) => {
        if(err) console.log(`product.route/searchproducts - error while searching - ${err}`);
        else {
            console.log(`product.route/searchproducts - search returned - ${results}`);
            res.status(200).send(results);
        }
    })
    .select('brand title imgSrc productId') //exclude all other fields in results returned
    .catch(err => console.log(`product.route/searchproducts - error caught - ${err}`));
});

module.exports = productRoutes;
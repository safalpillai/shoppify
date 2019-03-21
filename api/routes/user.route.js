const userModel = require('../models/users.model');
const express = require('express');
const userRoutes = express.Router();
const bcrypt = require('bcrypt');

//get user details
userRoutes.route('/getdetails').get((req, res) => {
    console.log(`user.route/getdetails - user to get - ${req.query.username}`);
    userModel.findOne({username: req.query.username}, (err, data) => {
        if(err) console.log('user.route/getdetails - error fetching user', err);
        else {
            console.log(`user.route/getdetails - user data - ${data}, username - ${req.query.username}`);
            res.status(200).send(data);
        }
    })
    .catch(err => console.log('user.route/getdetails - error fetching user', err));
});

//register
userRoutes.route('/register').post((req, res) => {
    console.log('user.route/register - register req - ', req.body);
    const saltRounds = 12;
    bcrypt.hash(req.body.password, saltRounds)
    .then(hashedPassword => {
        req.body.password = hashedPassword;
        let _userModel = new userModel(req.body);
        _userModel.save()
        .then(() => {
            console.log('user.route/register - user registered with password - ', hashedPassword);
            res.status(200).send(true);
        })
        .catch(err => {
            console.log('user.route/register - error inserting user into db', err);
            res.status(200).send(false);
        });
    })
    .catch(err => { 
        console.log('user.route/register - error hashing password', err);
        res.status(200).send(false);
    });
});

//check username
userRoutes.route('/checkusername').get((req, res) => {
    let _checkUser = req.query.checkuser;
    console.log(`user.route/checkusername - username check - ${_checkUser}`);
    userModel.findOne({"username": _checkUser})
    .then((result) => {
        if(result === undefined || result === null) {
            console.log(`user.route/checkusername - username available for - ${_checkUser}`);
            res.status(200).send(true);
        } else {
            console.log(`user.route/checkusername - username not available for - ${_checkUser}`);
            res.status(200).send(false);
        }
    })
    .catch(err => console.log(`user.route/checkusername - error caught - ${err}`));
});

//login
userRoutes.route('/login').get((req, res) => {
    // console.log(`user.routes/login - username - ${req.query.username}, password - ${req.query.password}`);
    userModel.findOne({username: req.query.username}, (err, data) => {
        if(err) {
            console.log('user.route/login - user not found #1');
            res.status(200).send(false);
        } else if(data){
            // console.log('hashed password data - ', data.password);
            bcrypt.compare(req.query.password, data.password)
            .then(result => {
                // console.log(`user.route/login - hashing comparison - ${result}, data to send - ${data}`);
                if(result) res.status(200).send(data);
                else {
                    let data = false;
                    res.status(200).send(data);
                }
            })
            .catch(err => {
                console.log(`user.route/login - password doesn\'t match - ${err}`);
                res.status(200).send(false);
            });
        } else {
            console.log('user.route/login - user not found #2');
            res.status(200).send(false);
        }
    })
    .catch(err => {
        console.log('user.route/login - error getting username', err);
        res.status(200).send(false);
    });
});

//get cart
userRoutes.route('/initializestore').get((req, res) => {
    let _username = req.query.user;
    userModel.find({username: _username}, {name: 0, username: 0, password: 0, email: 0, contactNumber: 0, address: 0}, (err, data) => {
        if(err) console.log(`user.route/getcart - error getting cart - ${err}`);
        else {
            console.log(`user.route/getcart - cart request response - ${data}`);
            res.status(200).send(data);
        }
    })
    .catch(err => {
        console.log(`user.route/getcart - error caught - ${err}`);
        res.status(404).send();
    });
});

//add to cart
userRoutes.route('/addtocart').post((req, res) => {
    let _cartData = req.body.cartProduct;
    let _user = req.body._user;
    console.log(`user.route/addtocart - username - ${_user} & model - ${_cartData.productId}`);
    userModel.findOne({"username": _user, "cart.productId": _cartData.productId})
    .then((results) => {
        // console.log(` findOne() - results - ${results}`);
        if(results === undefined || results === null){
            userModel.findOneAndUpdate({"username": _user}, {$push: {cart: _cartData}}, {returnOriginal: false})
            .then((results) => {
                // console.log(` findOneAndUpdate() - results - ${results}`);
                if(results === null || results === undefined) {
                    console.log(`user.route/addtocart - product pushing failed`);
                    res.status(200).send(false);
                }
                console.log(`user.route/addtocart - product pushed`);
                res.status(200).send(true);
            })
            .catch(err => {
                console.log(`user.route/addtocart - error caught while pushing - ${err}`);
                res.status(200).send(false);
            });
        } else {
            userModel.findOneAndUpdate({"username": _user, "cart.productId": _cartData.productId}, {$inc: {'cart.$.quantity': 1}}, {returnOriginal: false})
            .then((results) => {
                if(results === null || results === undefined) {
                    console.log(`user.route/addtocart - error returned for quantity update - ${results}`);
                    res.status(200).send(false);
                }
                console.log(`user.route/addtocart - product quantity incremented - ${results}`);
                res.status(200).send(true);
            })
            .catch(err => {
                console.log(`user.route/addtocart - error caught while increasing product quantity - ${err}`);
                res.status(200).send(false);
            });
        }
    })
    .catch(err => console.log(`user.route/addtocart - caught error adding to cart - ${err}`));
});

//remove from cart
userRoutes.route('/removefromcart').post((req, res) => {
    let _user = req.query.user;
    let _productId = req.query.productid;
    console.log(`user.route/removefromcart - user - ${_user}, pid - ${_productId}`);
    userModel.findOneAndUpdate(
        {"username": _user, "cart.productId": _productId}, 
        {$pull: {cart: {productId: _productId}}}, 
        {returnOriginal: false}, 
        (results) => {
        if(results === null || results === undefined) {
            console.log(`user.route/removefromcart - removed from cart - ${results}`);
            res.status(200).send(true);
        } else {
            console.log(`user.route/removefromcart - error returned for product removal - ${results}`);
            res.status(200).send(false);
        }
    })
    .catch(err => console.log(`user.route/removefromcart - caught error removing from cart - ${err}`));
});

//increment cart
userRoutes.route('/increment').post((req, res) => {
    let _user = req.query.user;
    let _productId = req.query.productid;
    // console.log(`user.route/increment - hit`);
    userModel.findOneAndUpdate({"username": _user, "cart.productId": _productId}, {$inc: {'cart.$.quantity': 1}})
    .then((results) => {
        if(results === null || results === undefined) {
            console.log(`user.route/increment - error returned for quantity update - ${results}`);
            res.status(200).send(false);
        }
        // console.log(`user.route/increment - response for quantity update - ${results}`);
        res.status(200).send(true);
    })
    .catch(err => console.log(`user.route/increment - caught error  incrementing - ${err}`));
});

//decrement
userRoutes.route('/decrement').post((req, res) => {
    let _user = req.query.user;
    let _productId = req.query.productid;
    // console.log(`user.route/decrement - product id - ${_productId}`);
    userModel.findOneAndUpdate({"username": _user, "cart.productId": _productId}, {$inc: {'cart.$.quantity': -1}})
    .then((results) => {
        if(results === null || results === undefined) {
            console.log(`user.route/decrement - error returned for quantity update - ${results}`);
            res.status(200).send(false);
        }
        // console.log(`user.route/decrement - response for quantity update - ${results}`);
        res.status(200).send(true);
    })
    .catch(err => console.log(`user.route/decrement - caught error  decrementing - ${err}`));
});

//fetch wishlist 
userRoutes.route('/fetchwishlist').get((req, res) => {
    let _user = req.query.user;
    userModel.find({"username": _user}, 'wishlist', (err, results) => {
        if(err) console.log(`user.route/fetchwishlist - error occured - ${err}`);
        console.log(`user.route/fetchwishlist wishlist fetched - ${results}`);
        res.status(200).send(results);
    })
    .catch(err => {
        console.log(`user.route/fetchwishlist - caught error - ${err}`);
    });
});

//add to wishlist
userRoutes.route('/addtowishlist').post((req, res) => {
    let _user = req.body._user;
    let _item = req.body.item;
    console.log(`user.route/addtowishlist - username - ${_user} & item to push - ${_item}`);
    userModel.findOne({"username": _user, "wishlist.productId": _item.productId}, {returnOriginal: false})
    .then(results => {
        if(results === undefined || results === null){
            userModel.findOneAndUpdate({"username": _user}, {$push: {wishlist: _item}}, {returnOriginal: false})
            .then((results) => {
                if(results === undefined || results === null) {
                    console.log(`user.route/addtowishlist - error adding to wishlist #1 - ${results}`);
                    res.status(200).send(false);
                }
                console.log(`user.route/addtowishlist - item added to wishlist - ${results}`);
                res.status(200).send(true);
            })
            .catch(err => {
                console.log(`user.route/addtowishlist - error adding to wishlist #2 - ${err}`);
            });        
        } else {
            res.status(200).send(false);
        }
    })
    .catch(err => console.log(`user.route/addtowishlist - caught error adding to wishlist - ${err}`));
});

//remove wishlist
userRoutes.route('/removewishlist').post((req, res) => {
    let _user = req.query.user;
    let _productId = req.query.productid;
    userModel.findOneAndUpdate(
        {"username": _user, "wishlist.productId": _productId},
        {$pull: {wishlist: {productId: _productId}}},
        {returnOriginal: false},
        (results) => {
            if(results === null || results === undefined) {
                console.log(`user.route/removewishlist - removed from wishlist - ${results}`);
                res.status(200).send(true);
            } else {
                console.log(`user.route/removewishlist - error returned while removing from wishlist - ${results}`);
                res.status(200).send(false);
            }
        }
    )
});

//place order/clear cart
userRoutes.route('/placeorder').post((req, res) => {
    let _user = req.body._user;
    let _orders = req.body.orders;
    userModel.findOneAndUpdate({"username": _user}, {$push: {orders: _orders}}, {returnOriginal: false})
    .then(results => {
        // console.log(` findOneAndUpdate() - results - ${results}`);
        if(results === null || results === undefined) {
            console.log(`user.route/placeorder - order pushing failed - ${results}`);
            res.status(200).send(false);
        }
        console.log(`user.route/placeorder - order pushed - ${results} - clearing cart...`);
        userModel.findOneAndUpdate({"username": _user}, {$set: {cart: []}}).exec();
        res.status(200).send(true);
    })
    .catch(err => {
        console.log(`user.route/placeorder - error caught while inserting order - ${err}`);
    });
});

//get orders
userRoutes.route('/getorders').get((req, res) => {
    let _user = req.query.user;
    userModel.find({"username": _user}, 'orders', (err, results) => {
        if(err) console.log(`user.route/getorders - error while retrieving orders - ${err}`);
        console.log(`user.route/getorders - orders fetched - ${results}`);
        res.status(200).send(results);
    })
    .catch(err => {
        console.log(`user.route/getorders - caught error - ${err}`);
    });
});

module.exports = userRoutes;
const mongoose = require('mongoose');

const userSchema = mongoose.Schema;
let userModel = new userSchema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    contactNumber: { type: Number, required: true },
    address: { type: String, required: true },
    cart: [{
        productId: String,
        title: String,
        quantity: Number,
        size: String,
        price: Number,
        imgSrc: String
    }],
    wishlist: [{ 
        productId: Number,
        title: String,
        size: Number,
        price: Number,
        imgSrc: String
    }],
    orders: [{
        productId: String,
        title: String,
        quantity: Number,
        size: String,
        price: Number,
        imgSrc: String,
        totalPrice: Number,
        dated: String
    }]
}, {
    collection: 'users'
});

module.exports = mongoose.model('userModel', userModel);
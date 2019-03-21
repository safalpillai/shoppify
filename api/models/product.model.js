const mongoose = require('mongoose');

const productSchema = mongoose.Schema;
let productModel = new productSchema({
    productId: { type: String, required: true },
    brand: { type: String, required: true },
    title: { type: String, required: true, index: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    imgSrc: { type: String, required: true },
    sizesAvailable: { type: String, required: false },
    color: { type: String, required: false, default: 'not available' },
    material: { type: String, required: true, default: 'not available' },
    description: { type: String, required: true, default: 'not available' },
    rating: { type: String, required: false, default: 'NA' }
}, {
    collection: 'products'
});
productModel.index({title: 'text'});

module.exports = mongoose.model('productModel', productModel);
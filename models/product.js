const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: String,
    imgUrl: String,
    stars:  Number ,
    reviews: Number,
    price:  Number,
    listPrice: Number,
    categoryName:String,
    isBestSeller:Boolean,
    boughtInLastMonth:Number
});

module.exports = mongoose.model('Product', productSchema);

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const database = require('./config/database1');
const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

mongoose.connect(database.url);

const Product = require('./models/product');

// Get all products
app.get('/api/products', async function (req, res) {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Get a product by ID or ASIN
app.get('/api/products/:product_id', async function (req, res) {
    try {
        let id = req.params.product_id;
        const product = await Product.findOne({ $or: [{ _id: id }, { asin: id }] });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Create a new product
app.post('/api/products', async function (req, res) {
    console.log(req.body);
    try {
        const newProduct = await Product.create(req.body);
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Update a product by ID
app.put('/api/products/:product_id', async function (req, res) {
    console.log(req.body);
    try {
        let id = req.params.product_id;
        let updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Delete a product by ID
app.delete('/api/products/:product_id', async function (req, res) {
    console.log(req.params.product_id);
    try {
        let id = req.params.product_id;
        let deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({ message: 'Product deleted successfully', product: deletedProduct });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(port);
console.log("App listening on port : " + port);

const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Product = require('./models/product');
const database = require('./config/database1');

const app = express();
const port = process.env.PORT || 3000;

// Set up Express to use Handlebars
app.engine('hbs', exphbs.engine({
    allowProtoMethodsByDefault: true,
    allowProtoPropertiesByDefault: true,
    extname:'.hbs'
}));
app.set('view engine', 'hbs');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(database.url);

// Routes
// Show all product info
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find().lean();
        res.render('products', { products });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Render form to insert a new product
app.get('/products/new', (req, res) => {
    res.render('insertProduct');
});

// Insert a new product
app.post('/products', async (req, res) => {
    req.body.isBestSeller = req.body.isBestSeller === 'true';
    try {
        await Product.create(req.body);
        res.redirect('/products');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

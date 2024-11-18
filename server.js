const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Sample Schema
const ItemSchema = new mongoose.Schema({ name: String });
const Item = mongoose.model('Item', ItemSchema);

// Routes
app.get('/', async (req, res) => {
    const items = await Item.find();
    res.render('index', { items });
});

app.post('/add', async (req, res) => {
    const newItem = new Item({ name: req.body.name });
    await newItem.save();
    res.redirect('/');
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

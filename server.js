const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes')
const authRoutes = require('./routes/authRoutes')
const cartRoutes = require('./routes/cartRoutes')
const orderRoutes = require('./routes/orderRoutes')
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI,)
.then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('E-commerce API running...');
});

app.use('/api/products',productRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/cart',cartRoutes);
app.use('/api/orders',orderRoutes);

const PORT = process.env.PORT || 4408;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

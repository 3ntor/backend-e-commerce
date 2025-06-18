const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const createDefaultAdmin = require('./creatadmin(test)/createDefaultAdmin');
const authRoutes = require('./routes/auth');
const userProductRoutes = require('./routes/userProduct');
const wishlistRoutes = require('./routes/wishlist');
const adminRoutes = require('./routes/admin');
const adminUserRoutes = require('./routes/adminUser');
const adminProductRoutes = require('./routes/adminProduct');
const adminCategoryRoutes = require('./routes/adminCategory');

dotenv.config();

const app = express();

// CORS configuration to allow credentials and specific frontend origins
const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'https://melodious-lebkuchen-d6e9c2.netlify.app'];
const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 204
};
app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('AUVNET Backend Task API Running');
});

//MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    createDefaultAdmin();
  })
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/user/products', userProductRoutes);
app.use('/api/user/wishlist', wishlistRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin/user', adminUserRoutes);
app.use('/api/admin/product', adminProductRoutes);
app.use('/api/admin/category', adminCategoryRoutes);

const PORT = process.env.PORT || 3001; // استخدام المنفذ 3001 كافتراضي
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

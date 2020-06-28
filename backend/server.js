const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const port =  process.env.PORT || 5000

const app = express();
app.enable('trust proxy');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/img')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  })

app.use(multer({storage : storage}).single('imageUrl'))


mongoose.connect('mongodb+srv://onurr23:F6pTG8UpAzg2c62R@cluster0-swoaz.mongodb.net/node-app?retryWrites=true&w=majority').then(()=>{

    console.log('CONNECTED')

})

const shopRoutes = require('./routes/shop');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');



app.use('/',shopRoutes);
app.use('/admin',adminRoutes)
app.use('/',userRoutes);


app.listen(port,()=>{

    console.log('Server is running at' + port)

})


const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const multer = require('multer');

const app = express();

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, 'uploads/');
//     },
//
//     // By default, multer removes file extensions so let's add them back
//     filename: function(req, file, cb) {
//         cb(null,
//     }
// });

//connect database
connectDB();

//init middleware
app.use(cors());
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

//define routes

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
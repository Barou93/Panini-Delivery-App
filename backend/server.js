const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');


//Routes dependences
const adminRoutes = require('./routes/admin.routes');
const categoryRoutes = require('./routes/category.routes');




const app = express();

require('dotenv').config('./.env');

//Dependencies server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());


const { checkAdmin, requireAuth } = require('./middleware/auth.middleware');

//Jwt ROUTES
app.get('*', checkAdmin);
app.get('/jwtid', requireAuth, (req, res) => {
    return res.status(200).json(res.locals.admin);
})


//Routes
app.use('/api/admin', adminRoutes);
app.use('/api/categories', categoryRoutes);

//Strating Server

app.listen(process.env.PORT, () => {
    console.log(`Listenning on port ${process.env.PORT}`)
})
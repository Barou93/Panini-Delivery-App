const express = require('express');

const app = express();

require('dotenv').config('./.env');


//Strating Server

app.listen(process.env.PORT, () => {
    console.log(`Listenning on port ${process.env.PORT}`)
})
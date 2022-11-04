const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema.js');
const port = process.env.PORT || 5000;
const connectDB = require('./config/db')
const colors = require('colors');
const app = express();


app.use(cors());

const mongoose = require('mongoose');
connectDB();


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}))

app.listen(port, console.log(`server running on port: ${port}.`.underline.bgMagenta.bold));
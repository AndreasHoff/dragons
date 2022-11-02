const express = require('express');
require('dotenv').config();
const { graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema.js');
const port = process.env.PORT || 5000;
const colors = require('colors');
const app = express();

const mongoose = require('mongoose');

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold)
}

connectDB();


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(port, console.log(`server running on port: ${port}.`.underline.bgMagenta.bold));
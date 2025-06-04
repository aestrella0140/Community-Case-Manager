require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
    useNewParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Mongodb connection error:"));
db.once("open", () => {
    console.log('DongoDb connceted')
})

module.exports = db;
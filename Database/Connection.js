require('dotenv').config()
const mongoose = require("mongoose");
url = process.env.MONGO_URL

const dbConnect = async () => {
    try {
        mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => {
            console.log('Database connected successfully');
        }).catch((err) => {
            console.error('Error connecting to the database:', err);
        });
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
}


module.exports = dbConnect;
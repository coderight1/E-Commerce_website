const mongoose = require("mongoose");

const connectDatabase =()=>{
    mongoose.connect(process.env.DB_URI,
        )
        .then(()=>{
        console.log(`mongodb connectd with server :${mongoose.connection.host}`);
    })
}

module.exports = connectDatabase;


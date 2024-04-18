const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();


// mongoose.connect('mongodb://127.0.0.1:27017/studycap').then(()=>{
//     console.log("DB connected");
mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING).then(()=>{
    console.log("DB connected");
})
.catch(()=>{
    console.log("DB not connected");
})
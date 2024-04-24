const express = require("express");
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const userRoute = require("./Routes/User");
const adminRoute = require("./Routes/Admin");
require('./Config/Connection'); // Assuming this file exports something that needs to be executed

const cors = require('cors');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use(cors({
//     origin: ["http://localhost:3000"],
//     methods: ["GET", "POST", "PATCH"],
//     credentials: true
// }));

app.use(cors({
    origin: ["https://www.studycap.in", "https://studycap.in"],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));
  

app.use('/', userRoute);
app.use('/admin', adminRoute);

app.listen(5001, () => {
    console.log("server connected");
});

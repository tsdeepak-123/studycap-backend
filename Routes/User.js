const express = require("express");
const { handleDetailsAdding} = require("../Controllers/user/enquiryController");
const userRoute=express()


// Routes for Enquiry
userRoute.post('/addetails',handleDetailsAdding);


module.exports= userRoute
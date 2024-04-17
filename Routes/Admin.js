const express = require("express");
const adminRoute = express();
const upload = require("../Middlewares/Multer");
const {
    handleCollegeAdding,
    handleDeleteCollege,
    handleEditCollege,
    handleFindCollege,
    handleFindCollegeById
} = require('../Controllers/Admin/collegeController'); 

const {
    handleUniversityAdding,
    handleDeleteUniversity,
    handleEditUniversity,
    handleFindUniversity
} = require('../Controllers/Admin/universityController'); 

const {
    handleCourseAdding,
    handleDeleteCourse,
    handleEditCourse,
    handleFindCourse
} = require('../Controllers/Admin/courseController'); 
const { handleBannerAdding, handleFindBanner, handleBlockBanner, handleUnblockBanner, handleDeleteBanner } = require("../Controllers/Admin/bannerController");
const { handleSignIn, handleSignUp, adminData, updateAdminData } = require("../Controllers/Admin/adminController");
const { handleDetailsDelete, handleFindDetails, handleFindDetailsById } = require("../Controllers/user/enquiryController");


//Route for Admin
adminRoute.post("/login", handleSignIn);
adminRoute.post("/signup", handleSignUp);
adminRoute.get("/admindata",adminData);
adminRoute.patch("/updateAdminData",updateAdminData);

// Routes for colleges
adminRoute.post('/addcolleges', upload.fields([{ name: "image", maxCount: 1 },{ name: "gallery", maxCount: 20 }]), handleCollegeAdding);
adminRoute.patch('/deletecolleges/:id', handleDeleteCollege);
adminRoute.put('/editcolleges/:id', handleEditCollege);
adminRoute.get('/colleges', handleFindCollege);
adminRoute.get('/collegebyid/:id', handleFindCollegeById);


// Routes for universities
adminRoute.post('/adduniversities',upload.fields([{ name: "logo", maxCount: 1 }]), handleUniversityAdding);
adminRoute.patch('/deleteuniversities/:id', handleDeleteUniversity);
adminRoute.put('/edituniversities/:id', handleEditUniversity);
adminRoute.get('/universities', handleFindUniversity);

// Routes for courses
adminRoute.post('/addcourses', handleCourseAdding);
adminRoute.patch('/deletecourses/:id', handleDeleteCourse);
adminRoute.put('/editcourses/:id', handleEditCourse);
adminRoute.get('/courses', handleFindCourse);


adminRoute.post("/addbanner", upload.fields([{ name: "image", maxCount: 1 }]),handleBannerAdding)
adminRoute.get("/findbanner", handleFindBanner);
adminRoute.patch("/blockbanner", handleBlockBanner);
adminRoute.patch("/unblockbanner", handleUnblockBanner);
adminRoute.patch("/deletebanner/:id", handleDeleteBanner);

adminRoute.patch('/deletedetails/:id', handleDetailsDelete);
adminRoute.get('/details', handleFindDetails);
adminRoute.get('/detailsbyid/:id', handleFindDetailsById);


module.exports = adminRoute;

const College = require('../../Models/collegeModel');
const cloudinary = require('../../Middlewares/Cloudinary');
const Course =require('../../Models/courseModel')


const handleCollegeAdding = async (req, res) => {
  try {
    const {
      name,
      description,
      courses, 
    } = req.body;

    const collegeExist = await College.findOne({ name });
    if (collegeExist) {
      return res.status(400).json({
        success: false,
        message: "College already exists with the given name.",
      });
    }
    let imageUrl;
    if (req.files && req.files.image) {
      const imageUpload = await cloudinary.uploader.upload(req.files.image[0].path);
      if (!imageUpload.secure_url) {
        return res.status(500).json({
          success: false,
          message: "Failed to upload image.",
        });
      }
      imageUrl = imageUpload.secure_url;
    }

    const galleryUrls = [];
    if (req.files && req.files.gallery) {
      for (const file of req.files.gallery) {
        const uploadResult = await cloudinary.uploader.upload(file.path);
        if (!uploadResult.secure_url) {
          return res.status(500).json({
            success: false,
            message: "Failed to upload gallery images.",
          });
        }
        galleryUrls.push(uploadResult.secure_url);
      }
    }

    const courseIds = []; // To store Course IDs

    // Assuming courses field contains comma-separated course names
    const coursesArray = courses.split(',').map(course => course.trim());

    // Loop through each course name and find or create Course document
    for (const courseName of coursesArray) {
      let course = await Course.findOne({ name: courseName });
      if (!course) {
        course = new Course({
          name: courseName,
          description: "Default description",
          duration: "Default duration"
        });
        await course.save();
      }
      courseIds.push(course._id);
    }

    const newCollege = new College({
      name,
      description,
      courses: courseIds, // Assign Course IDs to college model
      image: imageUrl,
      gallery: galleryUrls,
    });

    await newCollege.save();

    res.status(201).json({
      success: true,
      message: "College added successfully.",
      data: newCollege,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


const handleFindCollege = async (req, res) => {
    try {
        const college = await College.find().populate('courses');
        if (!college) {
            return res.status(404).json({ message: 'College not found' });
        }
        res.status(200).json(college);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const handleFindCollegeById = async (req, res) => {
    try {
        const college = await College.findById(req.params.id).populate('courses');
        if (!college) {
            return res.status(404).json({ message: 'College not found' });
        }
        res.status(200).json(college);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const handleDeleteCollege = async (req, res) => {
    try {
        const college = await College.findByIdAndDelete(req.params.id);
        if (!college) {
            return res.status(404).json({ message: 'College not found' });
        }
        res.status(200).json({ message: 'College deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const handleEditCollege = async (req, res) => {
    try {
        const { name, description, courses, image, gallery } = req.body;
        const updatedCollege = await College.findByIdAndUpdate(req.params.id, {
            name,
            description,
            courses,
            image,
            gallery
        });
        if (!updatedCollege) {
            return res.status(404).json({ message: 'College not found' });
        }
        res.status(200).json({ message: 'College updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    handleCollegeAdding,
    handleDeleteCollege,
    handleEditCollege,
    handleFindCollege,
    handleFindCollegeById
};

const Course = require('../../Models/courseModel');

// Controller function to add a new course
const handleCourseAdding = async (req, res) => {
    try {
        const { name, description, duration } = req.body;
        if (!name || !description || !duration) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }
        
        const existingCourse = await Course.findOne({ name });
        if (existingCourse) {
            return res.status(400).json({ success: false, message: 'Course with this name already exists.' });
        }
        
        const newCourse = new Course({ name, description, duration });
        await newCourse.save();
        
        res.status(201).json({ success: true, message: 'Course added successfully.', data: newCourse });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Controller function to edit a course
const handleEditCourse = async (req, res) => {
    try {
        const { name, description, duration } = req.body;
        if (!name || !description || !duration) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }
        
        const course = await Course.findByIdAndUpdate(courseId, { name, description, duration }, { new: true });
        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found.' });
        }
        
        res.status(200).json({ success: true, message: 'Course updated successfully.', data: course });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Controller function to delete a course
const handleDeleteCourse = async (req, res) => {
    try {
        const courseId = req.params.id;
        const course = await Course.findByIdAndDelete(courseId);
        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found.' });
        }
        
        res.status(200).json({ success: true, message: 'Course deleted successfully.' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Controller function to find a course by ID
const handleFindCourse = async (req, res) => {
    try {
        const courses = await Course.find();

        if (!courses || courses.length === 0) {
            return res.status(404).json({ success: false, message: 'No courses found.' });
        }
        
        res.status(200).json({ success: true, data: courses });
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};


module.exports = { handleCourseAdding,handleFindCourse, handleDeleteCourse, handleEditCourse };

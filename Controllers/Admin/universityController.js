const University = require('../../Models/universityModel');
const cloudinary = require('../../Middlewares/Cloudinary');

const handleUniversityAdding = async (req, res) => {
    try {
        const { name, description } = req.body;

        // Check if the university already exists
        const universityExist = await University.findOne({ name });
        if (universityExist) {
            return res.status(400).json({
                success: false,
                message: "University already exists with the given name.",
            });
        }

        // Image uploading
        let logoUrl;
        if (req.files && req.files.logo) {
            // Assuming `logo` is the field name for the university logo image
            const logoUploadResult = await cloudinary.uploader.upload(req.files.logo[0].path);
            if (!logoUploadResult.secure_url) {
                return res.status(500).json({
                    success: false,
                    message: "Failed to upload logo image.",
                });
            }
            logoUrl = logoUploadResult.secure_url;
        } else {
            return res.status(400).json({
                success: false,
                message: "Logo image file is required.",
            });
        }

        // Create a new university document
        const newUniversity = new University({
            name,
            description,
            logo: logoUrl, // Using the uploaded image URL for the university's logo
        });

        // Save the new university document to the database
        await newUniversity.save();

        // Response
        res.status(201).json({
            success: true,
            message: "University added successfully.",
            data: newUniversity,
        });

    } catch (error) {
        console.error('Error adding new university:', error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


const handleFindUniversity = async (req, res) => {
    try {
        const university = await University.find()
        if (!university) {
            return res.status(404).json({ message: 'University not found' });
        }
        res.status(200).json(university);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const handleDeleteUniversity = async (req, res) => {
    try {
        const university = await University.findByIdAndDelete(req.params.id);
        if (!university) {
            return res.status(404).json({ message: 'University not found' });
        }
        res.status(200).json({ message: 'University deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const handleEditUniversity = async (req, res) => {
    try {
        const { name, description, logo } = req.body;
        const updatedUniversity = await University.findByIdAndUpdate(req.params.id, {
            name,
            description,
            logo
        });
        if (!updatedUniversity) {
            return res.status(404).json({ message: 'University not found' });
        }
        res.status(200).json({ message: 'University updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    handleUniversityAdding,
    handleDeleteUniversity,
    handleEditUniversity,
    handleFindUniversity
};

const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,  // Reference to Course model
        ref: 'Course'
    }],
    image: {
        type: String,
        required: true
    },
    gallery: [{
        type: String,
        required: true
    }]
});

const College = mongoose.model('College', collegeSchema);

module.exports = College;

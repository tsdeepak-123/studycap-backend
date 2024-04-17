const Details=require('../../Models/EnquiryModel')

const handleDetailsAdding = async (req, res) => {
  try {
    console.log("hiiiiiiiii");
    const {
      name,
      age,
      email,
      phoneNumber,
      courseInMind,
      location,
      message
    } = req.body;

    const newDetails = new Details({
      name,
      age,
      email,
      phoneNumber,
      courseInMind,
      location,
      message
    });

    await newDetails.save();

    res.status(201).json({
      success: true,
      message: "Details added successfully.",
      data: newDetails,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const handleDetailsDelete = async (req, res) => {
    try {
        const details = await Details.findByIdAndDelete(req.params.id);
        if (!details) {
            return res.status(404).json({ message: 'Details not found' });
        }
        res.status(200).json({ message: 'Details deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const handleFindDetails = async (req, res) => {
    try {
        const details = await Details.find();
        if (!details) {
            return res.status(404).json({ message: 'Details not found' });
        }
        res.status(200).json(details);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const handleFindDetailsById = async (req, res) => {
    try {
        const details = await Details.findById(req.params.id);
        if (!details) {
            return res.status(404).json({ message: 'Details not found' });
        }
        res.status(200).json(details);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    handleDetailsAdding,
    handleDetailsDelete,
    handleFindDetails,
    handleFindDetailsById
};



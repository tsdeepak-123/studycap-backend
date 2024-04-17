const Banner=require("../../Models/Banner")
const cloudinary = require('../../Middlewares/Cloudinary')



const handleBannerAdding = async (req, res) => {
  try{
    console.log("hiiiii");
    const {name} =req.body
    if (!req.files|| !req.files.image||!name) {
      return res.json({
        success: false,
        message: "All fields required",
      });
    }
    const photoUpload = await cloudinary.uploader.upload(req.files.image[0].path);
    if (!photoUpload.secure_url) {
      return res.json({
        success: false,
        message: "Failed to upload photo",
      });
    }
    const newBanner=new Banner({
     name,
     photo: photoUpload.secure_url

    })
    await newBanner.save()
    console.log(await newBanner.save());
    return res.status(200).json({ success: true, message: "Banner added successfully." });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};



const handleFindBanner = async (req, res) => {
  try { 
    const allBannerData=await Banner.find()
    res.json({success:true,allBannerData})
} catch (error) {
    res.status(400).json({ error: error.message })
}
};
 


const handleBlockBanner = async (req, res) => {
  try {
    const id= req.query.id
    await Banner.findByIdAndUpdate({_id:id},{$set:{IsBlocked:true}})
    res.json({success:true,messege:" Banner blocked successfully"})
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
};



const handleUnblockBanner = async (req, res) => {
  try {
    const id= req.query.id
    await Banner.findByIdAndUpdate({_id:id},{$set:{IsBlocked:false}})
    res.json({success:true,messege:" Banner blocked successfully"})
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
};


const handleDeleteBanner = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const deletedBanner = await Banner.findByIdAndDelete(id);

    if (!deletedBanner) {
      return res
        .status(404)
        .json({ success: false, message: "Banner not found" });
    }

    return res.json({
      success: true,
      message: "Banner deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};
module.exports = {
  handleBannerAdding,
  handleFindBanner,
  handleBlockBanner,
  handleUnblockBanner,
  handleDeleteBanner
};

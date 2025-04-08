const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: "drflcjhfw", // FIXED: Correct spelling
  api_key: "734632763932467",
  api_secret: "eEvT_frwaUOW40QvNXuYdcqHSuk",
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return result;
}

module.exports = { upload, imageUploadUtil };

const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const config = require("../config/env");

// Configure Cloudinary
cloudinary.config({
    cloud_name: config.CLOUDINARY_CLOUD_NAME,
    api_key: config.CLOUDINARY_API_KEY,
    api_secret: config.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        // Determine resource type based on mimetype
        const isRaw = file.mimetype === "application/pdf" ||
            file.mimetype === "application/msword" ||
            file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

        return {
            folder: "kriscap_uploads",
            resource_type: isRaw ? "raw" : "auto", // "raw" for non-image files like PDF/Docs
            public_id: file.originalname.split('.')[0] + "-" + Date.now(), // Generate unique ID
            // Transformation logic can go here for images
        };
    },
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type. Only JPEG, PNG, PDF and Word documents are allowed."));
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
    },
});

module.exports = upload;

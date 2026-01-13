"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToCloudinary = uploadToCloudinary;
exports.deleteFromCloudinary = deleteFromCloudinary;
const cloudinary_1 = require("../config/cloudinary");
async function uploadToCloudinary(fileBuffer, options) {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary_1.cloudinary.uploader.upload_stream({
            folder: options.folder,
            public_id: options.public_id,
            resource_type: options.resource_type || 'auto'
        }, (error, result) => {
            if (error)
                reject(error);
            else
                resolve(result);
        });
        uploadStream.end(fileBuffer);
    });
}
async function deleteFromCloudinary(publicId) {
    await cloudinary_1.cloudinary.uploader.destroy(publicId);
}

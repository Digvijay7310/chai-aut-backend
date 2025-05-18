import { v2 as cloudinary } from "cloudinary";
import { unlinkSync } from "fs";
import { unlink } from "fs/promises";


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        //upload teh file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        //file has been uploaded successfully
        // console.log("File uploaded on cloudinary ", response.url);
        await unlink(localFilePath)
        return response;

    } catch (error) {
        await unlink(localFilePath) // remove the locally saved temporary file as the upload operatiaon got failed
        return null;
    }
}



export { uploadOnCloudinary }
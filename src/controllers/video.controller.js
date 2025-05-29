import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Video } from "../models/video.model.js";



const getVideoFromUser = asyncHandler(async (req, res) => {
    //check user is logged or not
    // upload them to cloudinary 
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation 
    // return res
    const { videoFile, thumbnail, title, description, duration } = req.body

    if (!title || !description || !duration) {
        throw new ApiError(404, "All fields (title, description, duration ) are required");
    }

    let thumbnailLocalPath = req.files?.thumbnail[0]?.path

    let videoLocalPath = req.files?.videoFile[0]?.path

    if (!thumbnailLocalPath) {
        throw new ApiError(400, "Thumbnail is required")
    }

    if (!videoLocalPath) {
        throw new ApiError(400, "Video File is required")
    }

    const userVideo = await uploadOnCloudinary(videoLocalPath)
    const videoThumbnail = await uploadOnCloudinary(thumbnailLocalPath)

    const video = await Video.create({
        videoFile: userVideo.url,
        thumbnail: videoThumbnail.url,
        title,
        description,
        duration,
        owner: req.user._id
    })
    console.log("video id: ", video._id)

    if (!video) {
        throw new ApiError(500, "Somthing went wrong while uploading video")
    }



    return res.status(200).json(
        new ApiResponse(200, video, "Video Uploaded successfully!")
    )

})

const getAllVideos = asyncHandler(async (req, res) => {
    const videos = await Video.find({ owner: req.user._id })
        .populate("owner", "username avatar email")
        .sort({ createdAt: -1 })

    if (!videos) {
        throw new ApiError(500, "While fetching videos there is an error")
    }

    console.log("Get all video: ", videos)
    res.status(201)
        .json(
            new ApiResponse(201, videos, "All video fetch successfully")
        )
})

const getSingleVideo = asyncHandler(async (req, res) => {
    const video = await Video.findById(req.params.id)
        .populate("owner", "username avatar email")

    if (!video) {
        throw new ApiError(404, "Video not found")
    }

    console.log("Get Single Video", video, video._id)

    res.status(201)
        .json(
            201, video, "Successfully fetch a video"
        )
})

const deleteVideo = asyncHandler(async (req, res) => {
    const video = await Video.findByIdAndDelete(req.params.id)
        .populate("owner", "username avatar email")

    if (!video) {
        throw new ApiError(404, "Video not found or already deleted")
    }

    console.log("Deleted video: ", video, video._id)

    res.status(201)
        .json(
            201, video, "Video Successfully deleted"
        )
})
export {
    getVideoFromUser, getAllVideos, getSingleVideo, deleteVideo
}
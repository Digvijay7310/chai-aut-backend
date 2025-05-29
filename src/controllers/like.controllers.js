import { asyncHandler } from "../utils/asyncHandler.js";
import { Like } from "../models/like.model.js";
import { Video } from "../models/video.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const likeVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.body;
    const userId = req.user._id;

    const video = await Video.findById(videoId)
    if (!video) {
        throw new ApiError(404, "Video not found")
    }

    const existingLike = await Like.findOne({ video: videoId, likedBy: userId })
    if (existingLike) {
        throw new ApiError(401, "You already like this video")
    }

    const like = await Like.create({
        video: videoId,
        likedBy: userId
    })

    res.status(200)
        .json(
            new ApiResponse(201, like, "video liked successfully!")
        )
})

const unlikeVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    const userId = req.user._id

    const like = await Like.findOneAndDelete({
        video: videoId,
        likedBy: userId
    })

    if (!like) {
        throw new ApiError(404, "Like not found")
    }

    return res.status(201).json(
        new ApiResponse(201, like, "video unliked successfully!")
    )
})


const likeComment = asyncHandler(async (req, res) => {
    const { commentId } = req.body;
    const userId = req.user._id;

    const existingLike = Like.findOne({ comment: commentId, likeBy: userId })

    if (existingLike) {
        throw new ApiError("You are already like this comment")
    }

    const like = await Like.create({
        comment: commentId,
        likedBy: userId
    });

    res.status(200).json(
        new ApiResponse(201, like, "Comment Like successfully!")
    )


})

const likeTweet = asyncHandler(async (req, res) => {
    const { tweetId } = req.body;
    const { userId } = req.user._id;

    const existingLike = Like.findOne({ comment: commentId, likeBy: userId })

    if (existingLike) {
        throw new ApiError("You are already like this tweet")
    }

    const like = await Like.create({
        comment: commentId,
        likedBy: userId
    });

    res.status(200).json(
        new ApiResponse(201, like, "Tweet Like successfully!")
    )
})

const likeremove = asyncHandler(async (req, res) => {
    const { type, id } = req.body;
    const { userId } = req.user._id;

    const filter = { likedBy: userId }
    if (type === 'video') filter.video = id
    else if (type === 'comment') filter.comment = id
    else if (type === 'tweet') filter.tweet = id

    else throw new ApiError(400, "invalid type")

    const like = await findOneAndDelete(filter)

    if (!like) {
        throw new ApiError(400, "like not found")
    }

    res.status(200)
        .json(201, like, `${type} unlike Successfully!`)


})

export { likeVideo, unlikeVideo, likeComment }
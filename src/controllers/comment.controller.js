import { Comment } from '../models/comment.model.js'
import { Video } from '../models/video.model.js'
import { User } from '../models/user.model.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { Notification } from '../models/notification.model.js'

const addCommentToVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const { content } = req.body;

    const video = await Video.findById(videoId)
    if (!video) throw new ApiError(404, "Video not found");

    if (!content || content.trim() === "") {
        throw new ApiError(400, "Comment cannot be empty")
    }

    const comment = await Comment.create({
        video: videoId,
        content,
        owner: req.user._id
    })

    // ✅ Add notification
    if (video.owner.toString() !== req.user._id.toString()) {
        await Notification.create({
            sender: req.user._id,
            receiver: video.owner,
            video: video._id,
            type: "comment"
        })
    }

    return res.status(201)
        .json(new ApiResponse(201, comment, "Comment added successfully"))
})

const getVideoComment = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    const comments = await Comment.find({ video: videoId })
        .populate("owner", "username avatar fullname")
        .sort({ createdAt: -1 })

    return res.status(200)
        .json(new ApiResponse(200, comments, "Comments fetched successfully!"))
})

export { addCommentToVideo, getVideoComment }
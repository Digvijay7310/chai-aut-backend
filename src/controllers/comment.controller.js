import { Comment } from '../models/comment.model.js'
import { Video } from '../models/video.model.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'

//Get comment on specific video

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

//Remove comment from a video 
const deleteComment = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    const userComments = await Comment.find(req.user._id)
    res.send(200).json(new ApiResponse(200, userComments, "All comments fetch successfully!"))

    const userComment = await Comment.find({ videoId: req.params.user._id })

    if (!userComment) return res.status(404).json(new ApiError(404, "User cannot comment on this video"))
})


//Fetch all comment on a video
const getVideoComment = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    const comments = await Comment.find({ video: videoId })
        .populate("owner", "username avatar fullname")
        .sort({ createdAt: -1 })

    return res.status(200)
        .json(new ApiResponse(200, comments, "Comments fetched successfully!"))
})

export { addCommentToVideo, getVideoComment, deleteComment }
import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema({
    video: {
        type: Schema.Types.ObjectId,
        ref: "Video"
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    },
    tweet: {
        type: Schema.Types.ObjectId,
        ref: "Tweet"
    },
    likedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

likeSchema.pre("validate", function (next) {
    const count = [this.video || this.comment || this.tweet].filter(Boolean).length;
    if (count !== 1) {
        return next(new Error("Exactly one of video, comment and tweet must be provided"))
    }
    next()
})


export const Like = mongoose.model("Like", likeSchema);
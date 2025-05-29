import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    video: {
        type: Schema.Types.ObjectId,
        ref: "Video",
    },
    type: {
        type: String,
        enum: ["comment", "like"],
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

export const Notification = mongoose.model("Notification", notificationSchema)

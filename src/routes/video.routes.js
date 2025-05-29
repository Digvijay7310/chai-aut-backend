import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { deleteVideo, getAllVideos, getSingleVideo, getVideoFromUser } from "../controllers/video.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";




const router = Router()

router.route("/video-upload").post(
    upload.fields([
        {
            name: "videoFile",
            maxCount: 1
        },
        {
            name: "thumbnail",
            maxCount: 1
        }
    ]),
    verifyJWT,
    getVideoFromUser

)

router.route("/my-videos").get(
    verifyJWT, getAllVideos
)

router.route("/video/:id").get(
    verifyJWT, getSingleVideo
)
router.route("/delete-video/:id").delete(
    verifyJWT, deleteVideo
)

export default router
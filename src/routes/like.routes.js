import Router from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { likeComment, unlikeVideo, likeVideo } from "../controllers/like.controllers.js";
import { addCommentToVideo, getVideoComment } from "../controllers/comment.controller.js";


const router = Router()

router.route("/video").post(verifyJWT, likeVideo); //like on a particular video
router.route("/video/:videoId").delete(verifyJWT, unlikeVideo); //remove like from a video
router.route("/comment/:videoId").post(verifyJWT, addCommentToVideo); //comment add on a video
router.route('/comments/:videoId').get(verifyJWT, getVideoComment) // fetch all comment from a video
// router.route("/tweet").post(verifyJWT, likeTweet);
// router.route("/remove").delete(verifyJWT, likeremove);




export default router
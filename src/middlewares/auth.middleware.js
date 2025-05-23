import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js'

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        console.log("Authorization Header:", req.header("Authorization"));
        console.log("Cookies:", req.cookies);


        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        console.log("Extraced Token:", token);




        if (!token) {
            throw new ApiError(401, "unauthorized request -token missing")
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        console.log("Decoded Token:", decodedToken)

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        console.log("User from token:", user)

        if (!user) {
            //NEXT_VIDEO: discuss about fronted
            throw new ApiError(401, "Invalid Access Token")
        }

        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }

})
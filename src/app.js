import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors())

app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())


// router import
import userRouter from "./routes/user.routes.js"
import videoRouter from "./routes/video.routes.js"
import likeRouter from "./routes/like.routes.js"

//routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/videos", videoRouter)
app.use("/api/v1/likes", likeRouter)


export default app
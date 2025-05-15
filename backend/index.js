import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { connectDb } from "./src/config/db.js"
import movieRoutes from "./src/routes/movie.routes.js"


const app=express()
dotenv.config()

connectDb()

app.use(express.json())
app.use(cors())

app.use("/api/movies",movieRoutes)


const port=process.env.PORT ||8080

app.listen(port,()=>{
    console.log(`the app is running on port:${port}`)
})



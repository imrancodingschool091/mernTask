import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()


export const connectDb=async()=>{

    try {
        await mongoose.connect(process.env.MONGO_URI)
        .then(()=>{
            console.log("connected to db")
        })
        
    } catch (error) {
        console.log("failed to connect with db:",error)
        
    }
}



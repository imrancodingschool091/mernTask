import express from "express"
import { createMovie, getMovieById, getMovies } from "../controllers/movie.controller.js"


const router=express.Router()

router.post("/",createMovie);
router.get("/",getMovies)
router.get("/:id",getMovieById)


export default router
import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      enum: ["Comedy", "Drama", "Fantasy"],
      required: true,
    },

    poster: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


export const Movie=mongoose.model("Movie",movieSchema)
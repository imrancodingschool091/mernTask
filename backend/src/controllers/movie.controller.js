import { Movie } from "../models/movie.model.js";

export const createMovie = async (req, res) => {
  let { title, year, description, genre, poster } = req.body;

  if (!title || !year || !description || !genre || !poster) {
    return res
      .status(400)
      .json({ sucess: false, message: "all fields are required!" });
  }
  try {
    let newMovie = new Movie({
      title,
      year,
      description,
      genre,
      poster,
    });

    await newMovie.save();
    res.status(201).json({
      sucess: true,
      message: "movie created sucessfully",
      data: newMovie,
    });
  } catch (error) {
    res.status(500).json({ sucess: false, message: error.message });
  }
};

export const getMovies = async (req, res) => {
  try {
    let movie = await Movie.find();
    if (!movie) {
      return res
        .status(404)
        .json({ sucess: false, message: "movies not found!" });
    }

    res.status(200).json({
      sucess: true,
      data: movie,
    });
  } catch (error) {
    res.status(500).json({ sucess: false, message: error.message });
  }
};

export const getMovieById = async (req, res) => {
  let { id } = req.params;

  try {
    let movie = await Movie.findById(id);
    if (!movie) {
      return res
        .status(404)
        .json({ sucess: false, message: "movie not found!" });
    }

    res.status(200).json({
      sucess: true,
      data: movie,
    });
  } catch (error) {
    res.status(500).json({ sucess: false, message: error.message });
  }
};



import MovieModel from '../models/movie.js';

const movieResolvers = {
  Query: {
    movies: async () => {
      return await MovieModel.find();
    },

    movie: async (_, { id }) => {
      return await MovieModel.findById(id);
    },

    moviesByDirector: async (_, { director_name }) => {
      return await MovieModel.findByDirectorName(director_name);
    },
  },

  Mutation: {
    addMovie: async (
      _,
      { name, director_name, production_house, release_date, rating }
    ) => {
      const newMovie = new MovieModel({
        name,
        director_name,
        production_house,
        release_date,
        rating,
      });

      return await newMovie.save();
    },

    updateMovie: async (_, { id, ...updates }) => {
      return await MovieModel.findByIdAndUpdate(id, updates, {
        new: true,
      });
    },

    deleteMovie: async (_, { id }) => {
      return await MovieModel.findByIdAndDelete(id);
    },
  },
};

export default movieResolvers;
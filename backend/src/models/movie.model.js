import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    // Movie Title
    title: {
      type: String,
      required: true,
      trim: true,
      index: true // for search & sort
    },

    // Short movie summary / plot
    description: {
      type: String,
      required: true,
      trim: true,
      index: true
    },

    // IMDb Rating
    rating: {
      type: Number,
      min: 0,
      max: 10,
      required: true,
      index: true
    },

    // Release date
    releaseDate: {
      type: Date,
      required: true,
      index: true
    },

    // Duration in minutes
    duration: {
      type: Number,
      required: true,
      index: true
    },

    // Poster image URL
    imgUrl: {
      type: String,
      required: true
    },

    // IMDb ID (optional but useful)
    // imdbId: {
    //   type: String,
    //   unique: true,
    //   sparse: true
    // },

    // // Genre list
    // genres: {
    //   type: [String],
    //   default: []
    // },

    // // Movie Director
    // director: {
    //   type: String,
    //   trim: true
    // },

    // // Cast list
    // cast: {
    //   type: [String],
    //   default: []
    // },

    // Who added the movie (Admin reference)
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    },

    // Soft delete support
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true // createdAt & updatedAt
  }
);

// Text index for search
movieSchema.index({
  title: "text",
  description: "text"
});

export const movieModel = mongoose.model("Movie", movieSchema);

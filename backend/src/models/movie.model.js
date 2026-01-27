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
   
releaseYear: {
  type: Number,
  index: true,
  required: true,
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

    // Who added the movie (Admin reference)
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      // required: true
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
},{weights:{
  title:5,description:1
},name:'MovieTextIndex'});

movieSchema.index({ isDeleted: 1, createdAt: -1 });
movieSchema.index({ isDeleted: 1, rating: -1 });
movieSchema.index({ isDeleted: 1, releaseDate: -1 });

export const movieModel = mongoose.model("Movie", movieSchema);

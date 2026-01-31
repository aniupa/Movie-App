import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
   
    title: {
      type: String,
      required: true,
      trim: true,
    },

    
    description: {
      type: String,
      required: true,
      trim: true,
    },

    
    rating: {
      type: Number,
      min: 0,
      max: 10,
      required: true,
      
    },

    

    releaseYear: {
      type: Number,
      
      required: true,
    },

   
    duration: {
      type: Number,
      required: true,
      
    },

    
    imgUrl: {
      type: String,
      required: true,
    },

    
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    },
  },
  {
    timestamps: true, 
  },
);

// Text index for search

movieSchema.index(
  {
    title: "text",
    description: "text",
  },
  {
    weights: {
      title: 5,
      description: 1,
    },
    name: "MovieTextIndex",
  },
);
movieSchema.index({ rating: -1, releaseYear: -1 });
movieSchema.index({ releaseYear: -1 });
movieSchema.index({ duration: 1});
movieSchema.index(
  { title: 1, releaseYear: 1 },
  {
    unique: true,
    collation: { locale: "en", strength: 2 },
    name: "UniqueMoviePerYear"
  }
);

movieSchema.index(
  { title: 1 },
  { collation: { locale: "en", strength: 2 }, name: "TitleAscendingIndex" },
);

export const movieModel = mongoose.model("Movie", movieSchema);

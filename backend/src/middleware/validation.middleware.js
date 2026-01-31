
import mongoose from "mongoose";
import {ApiError} from "../utlis/ApiError.js";

export const validateObjectId =  (req, res, next) => {
  try {
    const { id } = req.params;
 
  

  if (
    !mongoose.Types.ObjectId.isValid(id) ||
    String(new mongoose.Types.ObjectId(id)) !== id
  ) {
    return next(new ApiError(400, "Invalid ID format"));
  }
  next();
  } catch (error) {
    next(error)
    
  }
   

};

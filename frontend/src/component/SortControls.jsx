import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../redux/features/movieSlice.js";
import { asyncSortMoviesAction } from "../redux/actions/movies.action.js";
import { useEffect } from "react";

import { setOrder } from "../redux/features/movieSlice.js";


const inputSx = {
  bgcolor: "#1e1e1e",
  borderRadius: 1,
  input: { color: "#fff" },
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#333" },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#555" },
};

export const SortControls = () => {
  const dispatch = useDispatch();
  const { yearFrom, yearTo, ratingFrom, ratingTo, durationFrom, durationTo } =
    useSelector((state) => state.movies.filters);

   const orderAsc = useSelector((state) => state.movies.order);

  const {
    register,
    handleSubmit,
    reset
  } = useForm({
    defaultValues: {
      yearFrom: "",
      yearTo: "",
      ratingFrom: "",
      ratingTo: "",
      durationFrom: "",
      durationTo: "",
    },
  });
  useEffect(() => {
  reset({
    yearFrom: yearFrom || "",
    yearTo: yearTo || "",
    ratingFrom: ratingFrom || "",
    ratingTo: ratingTo || "",
    durationFrom: durationFrom || "",
    durationTo: durationTo || "",
  });
  }, [yearFrom, yearTo, ratingFrom, ratingTo, durationFrom, durationTo, reset]);

  const submitHandler = (data) => {
    dispatch(setFilters(data));
    dispatch(asyncSortMoviesAction());
  };
  const sortHandler = () => {
    const next=!orderAsc;

    
    dispatch(setOrder(next));
  };
  return (
    <Box sx={{ p: 2, color: "#fff" }}>
      <Typography variant="subtitle2" sx={{ mb: 1, color: "#f5c518" }}>
  SORT ORDER
</Typography>

<Button
  fullWidth
  variant="outlined"
  onClick={sortHandler}
  sx={{
    color: "#fff",
    borderColor: "#444",
    textTransform: "none",
    fontWeight: 600,
    borderRadius: 2,
    py: 1.2,
    mb: 2,
    "&:hover": {
      borderColor: "#fff",
      bgcolor: "#222",
    },
  }}
>
  {orderAsc ? " A→Z" : " Z→A"}
</Button>

      {/* RELEASE YEAR */}
      <Typography variant="subtitle2" sx={{ mt: 3, mb: 1, color: "#f5c518" }}>
        RELEASE YEAR
      </Typography>
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          size="small"
          {...register("yearFrom")}
          placeholder="From"
          sx={inputSx}
        />
        <TextField
          size="small"
          {...register("yearTo")}
          placeholder="To"
          sx={inputSx}
        />
      </Box>

      {/* RATING */}
      <Typography variant="subtitle2" sx={{ mt: 3, mb: 1, color: "#f5c518" }}>
        RATING
      </Typography>
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          size="small"
          {...register("ratingFrom")}
          placeholder="1.0"
          sx={inputSx}
        />
        <TextField
          size="small"
          {...register("ratingTo")}
          placeholder="10.0"
          sx={inputSx}
        />
      </Box>

      {/* DURATION */}
      <Typography variant="subtitle2" sx={{ mt: 3, mb: 1, color: "#f5c518" }}>
        DURATION (MINUTES)
      </Typography>
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          size="small"
          {...register("durationFrom")}
          placeholder="Min"
          sx={inputSx}
        />
        <TextField
          size="small"
          {...register("durationTo")}
          placeholder="Max"
          sx={inputSx}
        />
      </Box>

      {/* APPLY BUTTON */}
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 4, bgcolor: "#f5c518", color: "#000", fontWeight: 700 }}
        onClick={handleSubmit(submitHandler)}
      >
        Apply Filters
      </Button>
    </Box>
  );
};

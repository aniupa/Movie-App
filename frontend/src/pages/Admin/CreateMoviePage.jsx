
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { asyncCreateMovieAction } from "../../redux/actions/movies.action.js";


export default function CreateMoviePage() {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      rating: "",
      releaseYear: "",
      duration: "",
      imgUrl: "",
    },
    mode: "onBlur", // better performance than onChange
  });

  const onSubmit = async (data) => {
    try {
      dispatch(asyncCreateMovieAction(data));
      // await axios.post("/api/movies", data, { withCredentials: true });
      // alert("Movie created successfully 🎬");
      reset();
    } catch (error) {
      console.error(error);
      // alert(error.response?.data?.message || "Failed to create movie");
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          Add New Movie
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={3}>
            {/* Title */}
            <Grid item xs={12}>
              <Controller
                name="title"
                control={control}
                rules={{ required: "Title is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Movie Title"
                    fullWidth
                    error={!!errors.title}
                    helperText={errors.title?.message}
                  />
                )}
              />
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                rules={{ required: "Description is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Description"
                    multiline
                    rows={4}
                    fullWidth
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />
            </Grid>

            {/* Rating */}
            <Grid item xs={12} sm={4}>
              <Controller
                name="rating"
                control={control}
                rules={{
                  required: "Rating required",
                  min: { value: 0, message: "Min 0" },
                  max: { value: 10, message: "Max 10" },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="IMDb Rating"
                    type="number"
                    fullWidth
                    inputProps={{ step: 0.1 }}
                    error={!!errors.rating}
                    helperText={errors.rating?.message}
                  />
                )}
              />
            </Grid>

            {/* Release Year */}
            <Grid item xs={12} sm={4}>
              <Controller
                name="releaseYear"
                control={control}
                rules={{
                  required: "Release year required",
                  min: { value: 1888, message: "Invalid year" },
                  max: {
                    value: new Date().getFullYear(),
                    message: "Future year not allowed",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Release Year"
                    type="number"
                    fullWidth
                    error={!!errors.releaseYear}
                    helperText={errors.releaseYear?.message}
                  />
                )}
              />
            </Grid>

            {/* Duration */}
            <Grid item xs={12} sm={4}>
              <Controller
                name="duration"
                control={control}
                rules={{
                  required: "Duration required",
                  min: { value: 1, message: "Invalid duration" },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Duration (minutes)"
                    type="number"
                    fullWidth
                    error={!!errors.duration}
                    helperText={errors.duration?.message}
                  />
                )}
              />
            </Grid>

            {/* Image URL */}
            <Grid item xs={12}>
              <Controller
                name="imgUrl"
                control={control}
                rules={{
                  required: "Image URL required",
                  pattern: {
                    value: /^https?:\/\/.+/i,
                    message: "Enter valid URL",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Poster Image URL"
                    fullWidth
                    error={!!errors.imgUrl}
                    helperText={errors.imgUrl?.message}
                  />
                )}
              />
            </Grid>

            {/* Submit */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={isSubmitting}
                sx={{ py: 1.5 }}
              >
                {isSubmitting ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Create Movie"
                )}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}

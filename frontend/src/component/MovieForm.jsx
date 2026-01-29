import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import { Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const MovieForm = ({ onSubmit, control, errors, isSubmitting }) => {
  const navigate = useNavigate();

  const onBack = () => navigate(-1);

  return (
    <Box component="form" onSubmit={onSubmit} noValidate>
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

        {/* Actions */}
        <Grid item xs={12}>
          <Box display="flex" gap={2} justifyContent="flex-end">
            <Button
              variant="outlined"
              color="error"
              onClick={onBack}
              disabled={isSubmitting}
              sx={{
                borderWidth: 2,
                fontWeight: 600,
                textTransform: "none",
                "&:hover": {
                  borderWidth: 2,
                  backgroundColor: "error.light",
                  color: "error.contrastText",
                },
              }}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isSubmitting}
              sx={{ px: 4 }}
            >
              {isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Submit"
              )}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MovieForm;

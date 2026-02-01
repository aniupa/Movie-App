
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { asyncCreateMovieAction } from "../../redux/actions/movies.action.js";
import MovieForm from "../../component/MovieForm.jsx";

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
    mode: "onBlur", 
  });

  const onSubmit = async (data) => {
    try {
      dispatch(asyncCreateMovieAction(data));
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
  <Container maxWidth="md" sx={{ py: 5 }}>
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Add New Movie
      </Typography>

      <MovieForm
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        errors={errors}
        isSubmitting={isSubmitting}
      />
      
    </Paper>
  </Container>
);
}

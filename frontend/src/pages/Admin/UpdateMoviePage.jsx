import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {
  asyncLoadMovieByIdAction,
  asyncUpdateMovieAction,
} from "../../redux/actions/movies.action";
import MovieForm from "../../component/MovieForm";
import { useNavigate } from "react-router-dom";
export default function UpdateMoviePage() {
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movies.selectedMovie);

  const navigate = useNavigate();
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

  const { id } = useParams();

  useEffect(() => {
    dispatch(asyncLoadMovieByIdAction(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (movie?.data) {
      reset({
        title: movie?.data?.title || "",
        description: movie?.data?.description || "",
        rating: movie?.data?.rating || "",
        releaseYear: movie?.data?.releaseYear || "",
        duration: movie?.data?.duration || "",
        imgUrl: movie?.data?.imgUrl || "",
        videoUrl: movie?.data?.videoUrl || "",
        thumbnail: movie?.data?.thumbnail || "",
      });
    }
  }, [movie?.data, reset]);

  const onSubmit =  (data) => {
    try {
       dispatch(asyncUpdateMovieAction({ data, id }));
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {movie?.data ? (
        <Container maxWidth="md" sx={{ py: 5 }}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h4" fontWeight={600} gutterBottom>
              Update Movie
            </Typography>

            <MovieForm
              onSubmit={handleSubmit(onSubmit)}
              control={control}
              errors={errors}
              isSubmitting={isSubmitting}
            />
          </Paper>
        </Container>
      ) : (
        <Container maxWidth="md" sx={{ py: 5 }}>
          <Typography>Loading movie...</Typography>
        </Container>
      )}
    </>
  );
}

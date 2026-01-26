

//new test-----------------------------
import React, { memo } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import MovieIcon from "@mui/icons-material/Movie";


const MovieCard = ({ movie }) => {
  return (
    
    <Card
      sx={{
        bgcolor: "#1c1c1c",
        color: "#fff",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s ease-in-out",
        willChange: "transform",
        "&:hover": {
          transform: "translateY(-6px)",
        },
      }}
      elevation={3}
    >
      <CardMedia
        component="img"
        image={movie?.imgUrl}
        alt={movie?.title}
        loading="lazy" 
        sx={{
          aspectRatio: "16 / 9", // responsive poster ratio
          objectFit: "cover",
        }}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" fontWeight={600} noWrap>
          {movie?.title}
        </Typography>
        <Typography variant="body2" color="gray">
          {movie?.year}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
        <Button
          size="small"
          variant="contained"
          startIcon={<PlayArrowIcon />}
          sx={{
            bgcolor: "error.main",
            textTransform: "none",
            "&:hover": { bgcolor: "error.dark" },
          }}
        >
          Watch
        </Button>

        <IconButton color="error" aria-label="add to watchlist">
          <MovieIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};


export default memo(MovieCard);


import  { memo } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

import StarIcon from "@mui/icons-material/Star";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";


const MovieCard = ({ movie, rank }) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" }, // 🔥 responsive layout
        bgcolor: "#121212",
        color: "#fff",
        borderRadius: 2,
        overflow: "hidden",
        transition: "transform .2s ease",
        "&:hover": { transform: "scale(1.02)" },
        width: "100%",
      }}
      elevation={3}
    >
      {/* Poster */}
      <CardMedia
        component="img"
        image={movie?.imgUrl}
        alt={movie?.title}
        loading="lazy"
        sx={{
          width: { xs: "100%", sm: 110 },     // full width on mobile
          height: { xs: 220, sm: 165 },       // taller mobile poster
          objectFit: "cover",
          flexShrink: 0,
        }}
      />

      {/* Content */}
      <CardContent
        sx={{
          flex: 1,
          p: 2,
          "&:last-child": { pb: 2 },
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }} // stack vertically on mobile
          spacing={2}
          alignItems={{ xs: "flex-start", sm: "flex-start" }}
        >
          {/* Rank */}
          <Typography
            variant="h6"
            sx={{
              color: "gray",
              fontWeight: 700,
              minWidth: { sm: 28 },
            }}
          >
            #{rank}
          </Typography>

          {/* Main Info */}
          <Box flex={1} width="100%">
            <Typography variant="subtitle1" fontWeight={700} noWrap>
              {movie?.title}
            </Typography>

            <Typography
              variant="body2"
              color="gray"
              sx={{ mb: 1, fontSize: { xs: 13, sm: 14 } }}
            >
              {movie?.releaseYear} •  {movie?.duration} mins
            </Typography>

            

            {/* Description (hide on very small screens) */}
            <Typography
              variant="body2"
              color="gray"
              sx={{
                display: { xs: "none", sm: "-webkit-box" }, // hide on mobile
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {movie?.description}
            </Typography>
          </Box>

          {/* Rating  */}
          <Box
            textAlign={{ xs: "left", sm: "right" }}
            width={{ xs: "100%", sm: "auto" }}
          >
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <StarIcon sx={{ color: "#f5c518", fontSize: 20 }} />
              <Typography fontWeight={700}>{movie?.rating}</Typography>
            </Stack>


            <Stack direction="row" spacing={1} mt={1}>
              <IconButton size="small" sx={{ color: "#f5c518" }}>
                <BookmarkBorderIcon />
              </IconButton>
              <IconButton size="small" sx={{ color: "error.main" }}>
                <PlayArrowIcon />
              </IconButton>
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};


export default memo(MovieCard);

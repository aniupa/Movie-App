import { memo } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { useState } from "react";

import StarIcon from "@mui/icons-material/Star";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useSelector } from "react-redux";
import { lazy, Suspense } from "react";
/*css */
import "./style.css";

const AdminActions = lazy(() => import("../authComponents/AdminActions"));
const MovieCard = ({ movie }) => {
  const [showActions, setShowActions] = useState(false);
  const isAdmin = useSelector((state) => state?.user?.data?.role === "admin");

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
          width: { xs: "100%", sm: 110 }, // full width on mobile
          height: { xs: 220, sm: 165 }, // taller mobile poster
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
          <Box flex={1} width="100%">
            <Typography variant="subtitle1" fontWeight={700} noWrap>
              {movie?.title}
            </Typography>

            <Typography
              variant="body2"
              color="gray"
              sx={{ mb: 1, fontSize: { xs: 13, sm: 14 } }}
            >
              {movie?.releaseYear} • {movie?.duration} mins
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
              {/* Edit Button */}
              <span
                className="EditIcon"
                onClick={() => setShowActions((prev) => !prev)}
                style={!isAdmin ? { display: "none" } : { display: "block" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="20px"
                >
                  <path d="M7.24264 17.9967H3V13.754L14.435 2.319C14.8256 1.92848 15.4587 1.92848 15.8492 2.319L18.6777 5.14743C19.0682 5.53795 19.0682 6.17112 18.6777 6.56164L7.24264 17.9967ZM3 19.9967H21V21.9967H3V19.9967Z"></path>
                </svg>
              </span>
            </Stack>
            {showActions && (
              <Stack direction="row" spacing={1} mt={1}>
                <Suspense fallback={null}>
                  {" "}
                  <AdminActions movie={movie} isAdmin={isAdmin} />
                </Suspense>
              </Stack>
            )}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default memo(MovieCard);

import { memo } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useState } from "react";

import StarIcon from "@mui/icons-material/Star";
import { useSelector } from "react-redux";
import { lazy, Suspense } from "react";
/*css */
// import "./style.css";
import { editSvg, bookmarkBorderIcon, playArrowIcon } from "../../assets/Svg";

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
            <div style={{display:"flex",gap:"var(--gutter-sm"}}>
              {" "}
              {/* bookmarkBorderIcon */}
              <span className="bookmarkBorderIcon"> {bookmarkBorderIcon}</span>
              {/* play Button */}
              <span className="playArrowIcon">{playArrowIcon}</span>
              {/* Edit Button */}
              <span
                className="EditIcon"
                onClick={() => setShowActions((prev) => !prev)}
                style={!isAdmin ? { display: "none" } : { display: "block" }}
              >
                {editSvg}
              </span>
            </div>

            {/* </Stack> */}
            {showActions && (
             <div style={{display:"flex",gap:"var(--gutter-sm" ,marginTop:'var(--margin-sm)'}}>
                <Suspense fallback={null}>
                  {" "}
                  <AdminActions movie={movie} isAdmin={isAdmin} />
                </Suspense>
              </div>
            )}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default memo(MovieCard);

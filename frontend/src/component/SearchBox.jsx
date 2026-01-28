import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import { setSearchQuery } from "../redux/features/movieSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
const SearchBox = ({
  

  isMobile,
  setFilterDrawerOpen,
}) => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
 
  const submitHandler = (query) => {
  dispatch(setSearchQuery(query.search.trim()));
  };
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          bgcolor: "#1e1e1e",
          px: 2,
          py: 0.5,
          borderRadius: 2,
          maxWidth: 500,
          ml: { xs: 1, md: 4 },
        }}
      >
        <SearchIcon sx={{ color: "gray", mr: 1 }} />
        <InputBase
          placeholder="Search movies…"
          fullWidth
          {...register("search")}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit(submitHandler)();
            }
          }}
          sx={{ color: "#fff" }}
        />
        {isMobile && (
          <IconButton
            onClick={() => setFilterDrawerOpen(true)}
            sx={{ color: "#fff", ml: 1 }}
          >
            <TuneIcon />
          </IconButton>
        )}

        {!isMobile && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: 2 }}>
            <IconButton
              onClick={() => setFilterDrawerOpen(true)}
              sx={{ color: "#fff", ml: 1 }}
            >
              <TuneIcon />
            </IconButton>
          </Box>
        )}
      </Box>
    </>
  );
};

export default SearchBox;

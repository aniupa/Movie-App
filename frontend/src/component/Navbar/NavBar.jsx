import { memo, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import SearchBox from "../SearchBox.jsx";
import AddIcon from "@mui/icons-material/Add";

//---- Auth Components
import AuthButtons from "../authComponents/AuthButtons.jsx";
import AuthButton2 from "../authComponents/AuthButton2.jsx";
//---- MUI Hooks
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { SortControls } from "../SortControls.jsx";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./style.css";

const Navbar = ({ isAuthenticated, role }) => {
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const drawer = (
    <Box sx={{ width: 250 }} onClick={setFilterDrawerOpen}>
      <List>
        <AuthButton2 isAuthenticated={isAuthenticated} />
      </List>
      <Divider />
    </Box>
  );

  return (
    <>
      <nav className="container">
        {/*  logo area */}
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M17.9981 7L20.3075 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934C2 3.44476 2.45531 3 2.9918 3H5.99807L3.68867 7H5.99807L8.30747 3H11.9981L9.68867 7H11.9981L14.3075 3H17.9981L15.6887 7H17.9981Z"
              className="icon"
            ></path>
          </svg>
          Movie App
        </span>
        
        {/* search box */}
        <SearchBox
          isMobile={isMobile}
          setFilterDrawerOpen={setFilterDrawerOpen}
        />
        
        <div className="btn-container">
          {" "}
          <Button
            variant="contained"
            color="error"
            disabled={role !== "admin"}
            onClick={() => navigate("/admin/create-movie")}
            sx={{
              fontWeight: 700,
              textTransform: "none",
              px: 3,
              py: 1.2,
              borderRadius: 2,
              boxShadow: 3,
              "&:hover": {
                boxShadow: 6,
              },
              "&.Mui-disabled": {
                backgroundColor: "#444",
                color: "#aaa",
              },
            }}
          >
            Create Movie
          </Button>
          <AuthButtons isAuthenticated={isAuthenticated}/>
        </div>

      </nav>


      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
      >
        <Box
          sx={{
            width: 260,
            p: 2,
            bgcolor: "#121212",
            height: "100%",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {isMobile && drawer}

          {/* 🔴 Create Movie Button (Mobile) */}
          <Button
            variant="contained"
            color="error"
            fullWidth
            startIcon={<AddIcon />}
            disabled={role !== "admin"}
            onClick={() => {
              navigate("/admin/create-movie");
              setFilterDrawerOpen(false); // close drawer after click
            }}
            sx={{
              fontWeight: 700,
              textTransform: "none",
              py: 1.2,
              borderRadius: 2,
              boxShadow: 3,
              "&:hover": { boxShadow: 6 },
              "&.Mui-disabled": {
                backgroundColor: "#444",
                color: "#aaa",
              },
            }}
          >
            Create Movie
          </Button>

          <SortControls />

          <Divider sx={{ my: 2, bgcolor: "#333" }} />
        </Box>
      </Drawer>
    </>
  );
};

export default memo(Navbar);

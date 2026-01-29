import  { memo, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import MovieIcon from "@mui/icons-material/Movie";
import SearchBox from "./SearchBox.jsx";
//---- Auth Components
import AuthButtons from "./authComponents/AuthButtons.jsx";
import AuthButton2 from "./authComponents/AuthButton2.jsx";
//---- MUI Hooks
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { SortControls } from "./SortControls.jsx";
import Button  from "@mui/material/Button";
import { useNavigate } from "react-router-dom";


const Navbar = ({
  isAuthenticated,
  role
}) => {
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate=useNavigate();

 
  

  

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
      <AppBar position="sticky" sx={{ bgcolor: "#121212" }} elevation={1}>
        <Toolbar sx={{ gap: 2 }}>
        

          {/* Logo */}
          <MovieIcon sx={{ color: "error.main" }} />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Movie App
          </Typography>

          {/* Search Bar */}
          <SearchBox
           
            isMobile={isMobile}
            setFilterDrawerOpen={setFilterDrawerOpen}
          />
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
             <Button variant="contained" color="error" href="/admin/create-movie" disabled={role !== 'admin'} onClick={() => navigate('/admin/create-movie')}>
            create Movie
          </Button>
          </Box>


          {/* Desktop Auth Buttons */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
            <AuthButtons isAuthenticated={isAuthenticated}/>
          </Box>
        </Toolbar>
      </AppBar>

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
          }}
        >
          {isMobile && drawer}
          <SortControls />

          <Divider sx={{ my: 2, bgcolor: "#333" }} />
        </Box>
      </Drawer>
    </>
  );
};

export default memo(Navbar);

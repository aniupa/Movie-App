import React, { memo, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import MovieIcon from "@mui/icons-material/Movie";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
//--
import TuneIcon from "@mui/icons-material/Tune";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { SortControls } from "./SortControls.jsx";
const Navbar = ({
  isAuthenticated,
  onLogin,
  onLogout,
  onRegister,
  onSearch,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("rating");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer = () => setMobileOpen((prev) => !prev);

  const handleSearch = (e) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(searchValue.trim());
    }
  };
  

  

  const drawer = (
    <Box sx={{ width: 250 }} onClick={setFilterDrawerOpen}>
      <List>
        {!isAuthenticated ? (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={onLogin}>
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={onRegister}>
                <ListItemText primary="Register" />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <ListItem disablePadding>
            <ListItemButton onClick={onLogout}>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
      <Divider />
    </Box>
  );

  const applyFilters = () => {
    triggerSearch({ filters });
    setFilterDrawerOpen(false);
  };

  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: "#121212" }} elevation={1}>
        <Toolbar sx={{ gap: 2 }}>
          {/* Mobile Menu Icon */}
          {isMobile && (
            <IconButton
              onClick={() => setFilterDrawerOpen(true)}
              sx={{ color: "#fff", ml: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: 2 }}>
              <IconButton
                onClick={() => setFilterDrawerOpen(true)}
                sx={{
                  bgcolor: "#1e1e1e",
                  color: "#fff",
                  "&:hover": { bgcolor: "#2a2a2a" },
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          )}

          {/* Logo */}
          <MovieIcon sx={{ color: "error.main" }} />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Movie App
          </Typography>

          {/* Search Bar */}
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
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleSearch}
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
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, ml: 2 }}
              >
                <IconButton
                  onClick={() => setFilterDrawerOpen(true)}
                  sx={{ color: "#fff", ml: 1 }}
                >
                  <TuneIcon />
                </IconButton>
              </Box>
            )}
          </Box>

          {/* Desktop Auth Buttons */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
            {!isAuthenticated ? (
              <>
                <Button color="inherit" onClick={onLogin}>
                  Login
                </Button>
                <Button variant="contained" color="error" onClick={onRegister}>
                  Register
                </Button>
              </>
            ) : (
              <Button color="inherit" onClick={onLogout}>
                Logout
              </Button>
            )}
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
          {drawer}
          <SortControls />

          <Divider sx={{ my: 2, bgcolor: "#333" }} />
        </Box>
      </Drawer>
    </>
  );
};

export default memo(Navbar);

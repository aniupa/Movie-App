
import Typography from "@mui/material/Typography";  
import Box from "@mui/material/Box";
const Header = () => {
  return (
    //her section 
     <>
      <Box
        sx={{
          height: 300,
          backgroundImage:
            "url(https://images.unsplash.com/photo-1524985069026-dd778a71c7b4)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <Box sx={{ background: "rgba(0,0,0,0.6)", p: 4, borderRadius: 2 }}>
          <Typography variant="h3" fontWeight="bold">
            Unlimited Movies, TV Shows & More
          </Typography>
          <Typography variant="h6" sx={{ mt: 1 }}>
            Watch anywhere. Cancel anytime.
          </Typography>
        </Box>
      </Box>
      </>
  )}
export default Header;
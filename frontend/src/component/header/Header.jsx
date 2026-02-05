import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./header.css";

const Header = () => {
  return (
    <div className="container">
      {/* Hero Image */}

      <picture>
        <source
          srcSet="/hero-640.avif 640w, /hero-1280.avif 1280w, /hero-1920.avif 1920w"
          type="image/avif"
          sizes="100vw"
        />
        <source
          srcSet="/hero-640.webp 640w, /hero-1280.webp 1280w, /hero-1920.webp 1920w"
          type="image/webp"
          sizes="100vw"
        />
        <img
          src="/hero-1280.webp"
          alt="Streaming entertainment background"
          loading="eager"
          fetchPriority="high"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            top: 0,
            left: 0,
          }}
        />
      </picture>

      {/* Dark Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
        }}
      />

      {/* Content */}
      <Box sx={{ position: "relative", zIndex: 1, p: 3 }}>
        <Typography variant="h3" fontWeight="bold">
          Unlimited Movies, TV Shows & More
        </Typography>
        <Typography variant="h6" sx={{ mt: 1 }}>
          Watch anywhere. Cancel anytime.
        </Typography>
      </Box>
    </div>
  );
};

export default Header;

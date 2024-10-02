import { Box, Button, Grid, Typography } from "@mui/material";
import jikan from "../utils/jikan";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [popularAnime, setPopularAnime] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPopularAnime = async () => {
    try {
      const response = await jikan({
        method: "get",
        url: "/top/anime",
      });
      
      setPopularAnime(response.data.data);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "Cool",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularAnime();
  }, []);

  return (
    <Box sx={{ padding: "80px 20px 20px", marginTop: '64px' }}> {/* Adjusted padding for the top */}
      <Typography variant="h3" sx={{ mb: 4 }}>
        Welcome to AniTrackr
      </Typography>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Featured Anime
      </Typography>
      <Grid container spacing={2}>
        {popularAnime.map((anime) => (
          <Grid item xs={12} sm={6} md={4} key={anime.mal_id}>
            <Box
              sx={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.05)", // Adds a hover effect
                },
              }}
            >
              <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
                style={{ width: "100%", borderRadius: "8px" }} // Added border radius
              />
              <Typography variant="h6" sx={{ mt: 1, mb: 1 }}>
                {anime.title}
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                {anime.synopsis.length > 100
                  ? `${anime.synopsis.slice(0, 100)}...` // Shortens the synopsis
                  : anime.synopsis}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                href={`/anime/${anime.mal_id}`}
                sx={{ width: "100%" }} // Full-width button
              >
                View Details
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomePage;

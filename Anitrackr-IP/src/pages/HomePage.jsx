import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Grid,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import jikan from "../utils/jikan";
import Swal from "sweetalert2";
import { useEffect, useState, useRef, useCallback } from "react";

const HomePage = () => {
  const [popularAnime, setPopularAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();

  const fetchPopularAnime = async (page) => {
    try {
      setLoading(true);
      const response = await jikan({
        method: "get",
        url: `/top/anime?page=${page}`,
      });

      console.log(response);

      if (response.data.data.length === 0) {
        setHasMore(false);
      } else {
        setPopularAnime((prevAnime) => [...prevAnime, ...response.data.data]);
      }
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
    fetchPopularAnime(page);
  }, [page]);

  const lastAnimeElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <Box sx={{ padding: "40px 10px", marginTop: "30px" }}>
      <Typography variant="h3" sx={{ mb: 4 }}>
        Welcome to AniTrackr
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Box>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Featured Anime
            </Typography>
            <Grid container spacing={2}>
              {popularAnime.map((anime, index) => {
                const uniqueKey = `${anime.mal_id}-${index}`;
                const genreList =
                  anime.genres.map((genre) => genre.name).join(", ") || "N/A"; // Get genres
                // Add ref to the last element for infinite scroll detection
                if (popularAnime.length === index + 1) {
                  return (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                      key={uniqueKey}
                      ref={lastAnimeElementRef}
                    >
                      <Card
                        sx={{
                          transition: "transform 0.2s",
                          "&:hover": {
                            transform: "scale(1.05)",
                          },
                          borderRadius: "8px",
                          height: "100%",
                          maxWidth: "240px",
                          margin: "0 auto",
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="140"
                          image={anime.images.jpg.image_url}
                          alt={anime.title}
                          sx={{
                            objectFit: "cover",
                            borderRadius: "8px 8px 0 0",
                          }}
                        />
                        <CardContent sx={{ padding: "8px" }}>
                          <Typography
                            variant="h6"
                            sx={{ mt: 1, mb: 1, fontSize: "0.875rem" }}
                          >
                            {anime.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ mb: 1, fontSize: "0.75rem" }}
                          >
                            Episodes: {anime.episodes || "N/A"}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ mb: 2, fontSize: "0.75rem" }}
                          >
                            Genres: {genreList}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ mb: 2, fontSize: "0.75rem" }}
                          >
                            {anime.synopsis.length > 60
                              ? `${anime.synopsis.slice(0, 60)}...`
                              : anime.synopsis}
                          </Typography>
                        </CardContent>
                        <CardActions sx={{ padding: "8px" }}>
                          <Button
                            component={Link}
                            to={`/anime/${anime.mal_id}`}
                            variant="contained"
                            color="primary"
                            sx={{ width: "100%", fontSize: "0.75rem" }}
                          >
                            View Details
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                } else {
                  return (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={anime.mal_id}>
                      <Card
                        sx={{
                          transition: "transform 0.2s",
                          "&:hover": {
                            transform: "scale(1.05)",
                          },
                          borderRadius: "8px",
                          height: "100%",
                          maxWidth: "240px",
                          margin: "0 auto",
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="140"
                          image={anime.images.jpg.image_url}
                          alt={anime.title}
                          sx={{
                            objectFit: "cover",
                            borderRadius: "8px 8px 0 0",
                          }}
                        />
                        <CardContent sx={{ padding: "8px" }}>
                          <Typography
                            variant="h6"
                            sx={{ mt: 1, mb: 1, fontSize: "0.875rem" }}
                          >
                            {anime.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ mb: 1, fontSize: "0.75rem" }}
                          >
                            Episodes: {anime.episodes || "N/A"}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ mb: 2, fontSize: "0.75rem" }}
                          >
                            Genres: {genreList}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ mb: 2, fontSize: "0.75rem" }}
                          >
                            {anime.synopsis.length > 60
                              ? `${anime.synopsis.slice(0, 60)}...`
                              : anime.synopsis}
                          </Typography>
                        </CardContent>
                        <CardActions sx={{ padding: "8px", marginTop: "auto" }}>
                          <Button
                            component={Link}
                            to={`/anime/${anime.mal_id}`}
                            variant="contained"
                            color="primary"
                            sx={{
                              width: "100%",
                              fontSize: "0.75rem",
                            }} // Adjust padding as needed
                          >
                            View Details
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                }
              })}
            </Grid>
          </Box>

          {/* Loading Spinner */}
          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <CircularProgress />
            </Box>
          )}
        </Grid>

        {/* Top 10 Anime Section */}
        <Grid item xs={12} md={4}>
          <Box>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Top 10 Anime
            </Typography>
            <Grid container spacing={2}>
              {popularAnime.slice(0, 10).map((anime) => (
                <Grid item xs={12} key={anime.mal_id}>
                  <Card sx={{ borderRadius: "8px" }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={anime.images.jpg.image_url}
                      alt={anime.title}
                      sx={{
                        objectFit: "cover",
                        borderRadius: "8px 8px 0 0",
                      }}
                    />
                    <CardContent sx={{ padding: "8px" }}>
                      <Typography variant="h6" sx={{ fontSize: "1rem" }}>
                        {anime.title}
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
                        Episodes: {anime.episodes || "N/A"}
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
                        Genres:{" "}
                        {anime.genres.map((genre) => genre.name).join(", ") ||
                          "N/A"}
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
                        {anime.synopsis.length > 60
                          ? `${anime.synopsis.slice(0, 60)}...`
                          : anime.synopsis}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;

import { Button, Container, Typography, Card, CardContent, CardMedia } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import jikan from "../utils/jikan";

const AnimeDetail = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);

  const fetchAnimeDetails = async () => {
    try {
      const response = await jikan({
        method: "get",
        url: `/anime/${id}`,
      });

      setAnime(response.data.data);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
  };

  useEffect(() => {
    fetchAnimeDetails();
  }, [id]);

  return (
    <Container maxWidth="md" sx={{ mt: 9 }}>
      {anime ? (
        <Card
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            boxShadow: 3,
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          <CardMedia
            component="img"
            image={anime?.images?.jpg?.image_url}
            alt={anime?.title}
            sx={{
              width: { xs: '100%', sm: '300px' },
              height: 'auto',
              objectFit: 'cover',
            }}
          />

          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 3,
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
              {anime?.title}
            </Typography>

            <Typography variant="body1" sx={{ mb: 2 }}>
              <strong>Synopsis:</strong> {anime?.synopsis}
            </Typography>

            <Typography variant="body1" sx={{ mb: 2 }}>
              <strong>Episodes:</strong> {anime?.episodes || 'N/A'}
            </Typography>

            <Typography variant="body1" sx={{ mb: 2 }}>
              <strong>Genres:</strong>{' '}
              {anime?.genres?.map((genre) => genre.name).join(', ') || 'N/A'}
            </Typography>

            <Typography variant="body1" sx={{ mb: 4 }}>
              <strong>Score:</strong> {anime?.score || 'N/A'}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              onClick={() => window.history.back()}
              sx={{ alignSelf: 'flex-start' }}
            >
              Back
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Typography variant="h6" align="center">
          Loading anime details...
        </Typography>
      )}
    </Container>
  );
};

export default AnimeDetail;

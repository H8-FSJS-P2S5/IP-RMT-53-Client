import { Button, Container, Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import request from "../utils/request";

const AnimeDetailPage = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);

  const fetchAnimeDetails = async () => {
    try {
      const response = await request({
        method: "get",
        url: `/anime/${id}`,
      });
      console.log(response)
      setAnime(response.data);
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
    <>
      <Container>
        <Box sx={{ mt: 2 }}>
          <Typography variant="h4">{anime?.title}</Typography>
          <img
            src={anime?.images?.jpg?.image_url}
            alt={anime?.title}
            style={{ width: "200px" }}
          />
          <Typography variant="h6">Synopsis:</Typography>
          <Typography>{anime?.synopsis}</Typography>
          <Typography variant="h6">Episodes:</Typography>
          <Typography>{anime?.episodes}</Typography>
          <Button variant="contained" onClick={() => window.history.back()}>
            Back
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default AnimeDetailPage;

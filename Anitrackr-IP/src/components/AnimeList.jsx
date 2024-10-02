import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import request from "../utils/request";
import { jwtDecode } from "jwt-decode";
import AnimeCard from "./AnimeCard"; 

const AnimeList = () => {
  const [animeList, setAnimeList] = useState([]);

  const token = localStorage.getItem("access_token");
  const decoded = jwtDecode(token);
  const userId = decoded.id; 

  useEffect(() => {
    const fetchAnimeList = async () => {
      try {
        const response = await request({
          method: "get",
          url: `/api/user/${userId}/anime-list`,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        });

        setAnimeList(response.data);
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error.response?.data?.message || "Failed to fetch anime list.",
          icon: "error",
          confirmButtonText: "Cool",
        });
      }
    };

    fetchAnimeList();
  }, [userId]);

  const removeAnimeFromList = async (animeId) => {
    try {
      await request({
        method: "delete",
        url: `/api/user/${userId}/anime-list/${animeId}`,
      });

      // Update the anime list after removing the anime
      setAnimeList(animeList.filter((anime) => anime.animeId !== animeId));

      Swal.fire({
        title: "Success!",
        text: "Anime removed from your list successfully",
        icon: "success",
        confirmButtonText: "Cool",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to remove anime.",
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
  };

  return (
    <div>
      <h1>My Anime List</h1>
      {animeList.length > 0 ? (
        animeList.map((anime) => (
          <AnimeCard
            key={anime?.animeId}
            title={anime?.Anime?.title}
            imageUrl={anime?.Anime?.imageUrl}
            score={anime?.Anime?.score}
            synopsis={anime?.Anime?.synopsis}
            onRemove={() => removeAnimeFromList(anime.animeId)} // Handle removing anime
          />
        ))
      ) : (
        <p>No anime in your list yet.</p>
      )}
    </div>
  );
};

export default AnimeList;

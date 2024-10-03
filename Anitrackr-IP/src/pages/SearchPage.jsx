import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import request from "../utils/request";
import { IconButton } from "@mui/material";
import BookmarkAddIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

const SearchPage = () => {
  const [searchedAnime, setSearchedAnime] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [addedAnimeIds, setAddedAnimeIds] = useState(new Set());

  const token = localStorage.getItem("access_token");

  // Fetch user's anime list on component mount
  useEffect(() => {
    const fetchUserAnimeList = async () => {
      if (!token) return; // Exit if not logged in

      try {
        const response = await request({
          method: "get",
          url: "/api/user/me/anime-list",
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        // Create a Set of anime IDs from the user's anime list
        const ids = new Set(response.data.map(anime => anime.Anime.malId));
        setAddedAnimeIds(ids);
      } catch (error) {
        console.error("Failed to fetch anime list:", error);
      }
    };

    fetchUserAnimeList();
  }, [token]);

  const searchAnime = async (e) => {
    e.preventDefault();

    try {
      const response = await request({
        method: "get",
        url: "/anime/search",
        params: {
          q: searchQuery,
        },
      });

      setSearchedAnime(response.data.data);
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

  const addAnimeToList = async (malId) => {
    if (!token) {
      Swal.fire({
        title: "Error!",
        text: "You must be logged in to add an anime to your list.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    try {
      const response = await request({
        method: "post",
        url: `/api/user/me/anime-list`,
        headers: {
          Authorization: "Bearer " + token,
        },
        data: { malId },
      });

      setAddedAnimeIds((prev) => new Set(prev).add(malId));

      Swal.fire({
        title: "Success!",
        text: response.data.message,
        icon: "success",
        confirmButtonText: "Cool",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text:
          error.response?.data?.message || "Failed to add anime to your list.",
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
  };

  return (
    <>
      <h1>Search Page</h1>
      <form onSubmit={searchAnime} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} 
          placeholder="Search for an anime..."
          required
        />
        <button type="submit">Search</button>
      </form>

      {searchedAnime.length > 0 && (
        <div>
          <h2>Search Results:</h2>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {searchedAnime.map((anime, index) => (
              <li key={`${anime.mal_id}-${index}`} style={{ marginBottom: "15px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <h3 style={{ margin: 0 }}>{anime.title}</h3>
                  <IconButton 
                    onClick={() => addAnimeToList(anime.mal_id)} 
                    color="primary" 
                    style={{ marginLeft: "8px" }}
                  >
                    {addedAnimeIds.has(anime.mal_id) ? <BookmarkAddIcon /> : <BookmarkBorderIcon />}
                  </IconButton>
                </div>
                <img
                  src={anime.images.jpg.image_url}
                  alt={anime.title}
                  style={{ width: "100px", marginRight: "10px" }}
                />
                <p>Score: {anime.score}</p>
                <p>Episodes: {anime.episodes}</p>
                <p>Genres: {anime.genres.map((g) => g.name).join(", ")}</p>
                <p>{anime.synopsis}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default SearchPage;

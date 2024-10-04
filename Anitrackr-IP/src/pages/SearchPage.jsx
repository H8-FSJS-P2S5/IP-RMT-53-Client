import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import request from "../utils/request";
import SearchBar from "../components/SearchBar";
import { IconButton } from "@mui/material"; 
import BookmarkAddIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import jikan from "../utils/jikan";

const SearchPage = () => {
  const [searchedAnime, setSearchedAnime] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [addedAnimeIds, setAddedAnimeIds] = useState(new Set());

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchUserAnimeList = async () => {
      if (!token) return;

      try {
        const response = await request({
          method: "get",
          url: "/api/user/me/anime-list",
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        const ids = new Set(response.data.map((anime) => anime.Anime.malId));
        setAddedAnimeIds(ids);
      } catch (error) {
        console.error("Failed to fetch anime list:", error);
      }
    };

    fetchUserAnimeList();
  }, [token]);

  const searchAnime = async (query) => {
    try {
      const response = await jikan({
        method: "get",
        url: "/anime",
        params: {
          q: query,
        },
      });

      setSearchedAnime(response.data.data);
      return response.data.data;
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

  const postAnimeToBackend = async (animeData) => {
    try {
      const response = await request({
        method: "post",
        url: "/api/anime/store",
        data: animeData,
      });

      return response.data;
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to store anime data.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const handleAnimeSearch = async (query) => {
    const animeData = await searchAnime(query);

    if (animeData.length > 0) {
      await postAnimeToBackend(animeData);
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
      <SearchBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleAnimeSearch} // Pass the search function as a prop
      />
      {searchedAnime.length > 0 && (
        <div>
          <h2>Search Results:</h2>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {searchedAnime.map((anime, index) => (
              <li
                key={`${anime.mal_id}-${index}`}
                style={{ marginBottom: "15px" }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <h3 style={{ margin: 0 }}>{anime.title}</h3>
                  <IconButton
                    onClick={() => addAnimeToList(anime.mal_id)}
                    color="primary"
                    style={{ marginLeft: "8px" }}
                    sx={{ fontSize: "large" }}
                  >
                    {addedAnimeIds.has(anime.mal_id) ? (
                      <BookmarkAddIcon />
                    ) : (
                      <BookmarkBorderIcon />
                    )}
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

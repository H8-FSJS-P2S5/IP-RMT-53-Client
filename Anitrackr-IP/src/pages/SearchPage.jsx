import { useState } from "react";
import Swal from "sweetalert2";
import request from "../utils/request";
import { jwtDecode } from "jwt-decode";


const SearchPage = () => {
  const [searchedAnime, setSearchedAnime] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const token = localStorage.getItem("access_token");
  const decoded = jwtDecode(token);
  const userId = decoded.id;

  const searchAnime = async (e) => {
    e.preventDefault(); // Prevent form submission default behavior

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
    try {
      const response = await request({
        method: "post",
        url: `/api/user/${userId}/anime-list`,
        data: { malId },
      });

      if (!token) {  
        Swal.fire({  
          title: "Error!",  
          text: "You must be logged in to add an anime to your list.",  
          icon: "error",  
          confirmButtonText: "Ok",  
        });  
        return;
      }

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
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query
          placeholder="Search for an anime..."
          required
        />
        <button type="submit">Search</button>
      </form>

      {searchedAnime.length > 0 && (
        <div>
          <h2>Search Results:</h2>
          <ul>
            {searchedAnime.map((anime, index) => (
              <li key={`${anime.mal_id}-${index}`}>
                <h3>{anime.title}</h3>
                <img
                  src={anime.images.jpg.image_url}
                  alt={anime.title}
                  style={{ width: "100px" }}
                />
                <p>Score: {anime.score}</p>
                <p>Episodes: {anime.episodes}</p>
                <p>Genres: {anime.genres.map((g) => g.name).join(", ")}</p>
                <p>{anime.synopsis}</p>
                <button onClick={() => addAnimeToList(anime.mal_id)}>
                  Add to My Anime List
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default SearchPage;

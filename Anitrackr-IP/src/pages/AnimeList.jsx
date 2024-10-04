import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import request from "../utils/request";
import UserAnimeList from "../components/UserAnimeList"; // Import the new UserAnimeList component

const AnimeList = () => {
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    const fetchAnimeList = async () => {
      try {
        const response = await request({
          method: "get",
          url: `/api/user/me/anime-list`,
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
  }, []);

  return (
    <div>
      <h1>My Anime List</h1>
      <UserAnimeList animeList={animeList} setAnimeList={setAnimeList} /> {/* Pass the list and setter to the UserAnimeList */}
    </div>
  );
};

export default AnimeList;

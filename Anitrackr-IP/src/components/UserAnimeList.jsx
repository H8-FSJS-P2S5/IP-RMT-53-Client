import AnimeCard from "../components/AnimeCard";
import Swal from "sweetalert2";
import request from "../utils/request";

const UserAnimeList = ({ animeList, setAnimeList }) => {
  const removeAnimeFromList = async (animeId) => {
    try {
      await request({
        method: "delete",
        url: `/api/user/me/anime-list/${animeId}`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });

      setAnimeList((prevList) => prevList.filter((anime) => anime.animeId !== animeId));

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
      {animeList.length > 0 ? (
        animeList.map((anime) => (
          <AnimeCard
            key={anime?.animeId}
            title={anime?.Anime?.title}
            genre={anime?.Anime?.genre}
            imageUrl={anime?.Anime?.imageUrl}
            score={anime?.Anime?.score}
            synopsis={anime?.Anime?.synopsis}
            episodes={anime?.Anime?.episodes}
            onRemove={() => removeAnimeFromList(anime.animeId)} // Pass the remove function to AnimeCard
          />
        ))
      ) : (
        <p>No anime in your list yet.</p>
      )}
    </div>
  );
};

export default UserAnimeList;

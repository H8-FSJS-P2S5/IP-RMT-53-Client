const AnimeCard = ({ title, imageUrl, score, synopsis, onRemove }) => {
  return (
    <div className="anime-card" style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px", borderRadius: "8px" }}>
      <h3>{title}</h3>
      <img src={imageUrl} alt={title} style={{ width: "100px" }} />
      <p>Score: {score}</p>
      <p>{synopsis}</p>
      <button onClick={onRemove} style={{ marginTop: "10px", backgroundColor: "red", color: "white" }}>
        Remove from List
      </button>
    </div>
  );
};

export default AnimeCard;

import { Box, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const AnimeCard = ({ title, genre, imageUrl, score, episodes, synopsis, onRemove }) => {
  return (
    <div className="anime-card" style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px", borderRadius: "8px" }}>
      {/* Box container for title and delete button */}
      <Box display="flex" alignItems="center">
    <Typography variant="h6" sx={{ marginRight: '8px' }}>{title}</Typography> {/* Margin added to create slight gap */}
    <IconButton
      aria-label="remove anime"
      onClick={onRemove}
      color="secondary"
      size="small" 
    >
      <DeleteIcon />
    </IconButton>
  </Box>
      {/* Image and other content */}
      <Box display="flex" alignItems="flex-start" mt={2}>
        <img src={imageUrl} alt={title} style={{ width: "100px", marginRight: "16px", borderRadius: "8px" }} />
        <Box>
          <Typography variant="body1"><strong>Score:</strong> {score}</Typography>
          <Typography variant="body2"><strong>Episodes:</strong> {episodes}</Typography>
          <Typography variant="body2"><strong>Genre:</strong> {genre}</Typography>
          <Typography variant="body3">{synopsis}</Typography>
        </Box>
      </Box>
    </div>
  );
};

export default AnimeCard;

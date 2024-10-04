import { IconButton, TextField, Box } from "@mui/material"; // Import MUI components
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ searchQuery, setSearchQuery, handleSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <Box display="flex" alignItems="center" justifyContent="center">
        <TextField
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for an anime..."
          required
          sx={{ marginRight: 1, flexGrow: 1 }}
        />
        <IconButton
          color="primary"
          type="submit"
          aria-label="search"
          sx={{ fontSize: "large" }}
        >
          <SearchIcon />
        </IconButton>
      </Box>
    </form>
  );
};

export default SearchBar;

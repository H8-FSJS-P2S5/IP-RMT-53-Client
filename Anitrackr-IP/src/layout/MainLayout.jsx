import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Chatbot from "../components/Chatbot";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "'Roboto Serif', serif", 
    h1: {
      fontFamily: "'Exo 2', sans-serif", 
    },
  },
});

function MainLayout() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Navbar />
        <div className="content-area" style={{ paddingTop: "100px" }}>
          {" "}
          {/* Add padding for the navbar height */}
          <Outlet />
          <Chatbot />
        </div>
      </ThemeProvider>
    </>
  );
}

export default MainLayout;

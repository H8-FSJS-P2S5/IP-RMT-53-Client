import { useState } from "react";
import { TextField, Button, Typography, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Chat as ChatIcon } from '@mui/icons-material'; // Importing an icon for the chat button
import request from "../utils/request"; // Replace with your request utility

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [open, setOpen] = useState(false); // State to manage dialog visibility

  const sendMessage = async (e) => {
    e.preventDefault();
    const userMessage = inputMessage;

    setMessages((prevMessages) => [...prevMessages, { sender: 'user', text: userMessage }]);

    // Check if the user message includes keywords for anime recommendations
    if (userMessage.toLowerCase().includes('recommend') || userMessage.toLowerCase().includes('anime')) {
      try {
        const response = await request.post('/api/recommendation', { prompt: userMessage });
        const aiReply = response.data.recommendation;

        if (typeof aiReply === 'string') {
          setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: aiReply }]);
        } else {
          console.error("AI reply is not a string:", aiReply);
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'bot', text: 'Sorry, something went wrong with the AI response!' },
          ]);
        }
      } catch (error) {
        console.error(error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'bot', text: 'Sorry, something went wrong!' },
        ]);
      }
    } else {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: 'Please ask for an anime recommendation.' },
      ]);
    }

    setInputMessage('');
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen); // Toggle the dialog open state
  };

  return (
    <div>
      {/* Chat button positioned below the navbar */}
      <IconButton onClick={handleToggle} sx={{ position: 'fixed', top: '100px', right: 16, bgcolor: 'primary.main', color: 'white' }}>
        <ChatIcon />
      </IconButton>

      {/* Chatbot dialog */}
      <Dialog open={open} onClose={handleToggle} fullWidth maxWidth="sm">
        <DialogTitle>Anime Recommendation Chatbot</DialogTitle>
        <DialogContent>
          <Paper elevation={2} sx={{ height: 400, overflowY: "scroll", padding: 2, borderRadius: 2 }}>
            {messages.map((msg, index) => (
              <Typography
                key={index}
                align={msg.sender === "user" ? "right" : "left"}
                sx={{ marginBottom: 1, color: msg.sender === "user" ? "primary.main" : "text.secondary" }}
              >
                <strong>{msg.sender === "user" ? "You" : "AI"}:</strong> {msg.text}
              </Typography>
            ))}
          </Paper>
          <form onSubmit={sendMessage} style={{ display: 'flex', marginTop: 2 }}>
            <TextField
              variant="outlined"
              fullWidth
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask the AI..."
              required
              sx={{ marginRight: 1 }}
            />
            <Button variant="contained" type="submit">
              Send
            </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleToggle} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Chatbot;

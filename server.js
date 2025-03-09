const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors'); // Import CORS package

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173", // Allow the frontend to connect
    methods: ["GET", "POST"], // Allow GET and POST methods
  }
});

let connectedUsers = 0;

// Serve static files (if needed)
app.use(express.static('public'));

// Handle socket connections
io.on('connection', (socket) => {
  connectedUsers++;
  console.log('A user connected');
  io.emit('updateUsers', connectedUsers); // Broadcast the number of connected users

  // When a user types, broadcast the new text to all users
  socket.on('textChange', (text) => {
    io.emit('updateText', text); // Send the updated text to all users
  });

  // When a user disconnects, update the number of connected users
  socket.on('disconnect', () => {
    connectedUsers--;
    console.log('A user disconnected');
    io.emit('updateUsers', connectedUsers); // Broadcast the new number of connected users
  });
});

// Start the server
server.listen(3000, '0.0.0.0', () => {
  console.log('Server is running on http://localhost:3000');
});

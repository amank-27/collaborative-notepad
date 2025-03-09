// src/App.jsx
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // Change to your server's URL

const App = () => {
  const [text, setText] = useState('');
  const [connectedUsers, setConnectedUsers] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    socket.on('updateText', (newText) => {
      if (!isLocked) {
        setText(newText);
      }
    });

    socket.on('updateUsers', (userCount) => {
      setConnectedUsers(userCount);
    });

    return () => {
      socket.off('updateText');
      socket.off('updateUsers');
    };
  }, [isLocked]);

  const handleTextChange = (event) => {
    const newText = event.target.value;
    setText(newText);

    if (!isLocked) {
      socket.emit('textChange', newText);
    }
  };

  const toggleLock = () => {
    setIsLocked(!isLocked);
  };

  return (
    <div className="App">
      <h1>Collaborative Notepad</h1>
      <textarea
        value={text}
        onChange={handleTextChange}
        rows="10"
        cols="50"
        disabled={isLocked}
      />
      <div>
        <button onClick={toggleLock}>
          {isLocked ? 'Unlock Editing' : 'Lock Editing'}
        </button>
      </div>
      <div>Connected Users: {connectedUsers}</div>
    </div>
  );
};

export default App;

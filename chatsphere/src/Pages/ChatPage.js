import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChatPage = () => {
  const [chats, setChats] = useState([]);

  const fetchChats = async () => {
    try {
      const response = await axios.get('/api/chat');
      const chatData = response.data; // Adjust this based on your API response structure
      setChats(chatData);
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div>
      {chats.map((chat) => (
        <div key={chat.id}>{chat.chatName}</div>
      ))}
    </div>
  );
};

export default ChatPage;

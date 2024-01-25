import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import { ChatState } from '../Context/ChatProvider';
import SideDrawer from '../Components/Miscelleneous/SideDrawer';
import ChatBox from '../Components/ChatBox';
import MyChats from '../Components/MyChats';

const ChatPage = () => {
  const { user } = ChatState();
  const[fetchAgain,setFetchAgain]=useState(false)

  return (
    <div style={{ width: '100%' }}>
      {user && <SideDrawer />}
      <Box display="flex" flexDirection="row" justifyContent="space-between" h="91.5vh" p="10px">
        {user && <MyChats fetchAgain ={fetchAgain} />}
        {user && <ChatBox fetchAgain ={fetchAgain} setFetchAgain={setFetchAgain}/>}
      </Box>
    </div>
  );
};

export default ChatPage;

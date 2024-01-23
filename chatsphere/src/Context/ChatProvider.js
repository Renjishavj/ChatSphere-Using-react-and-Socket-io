import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const chatContext=createContext();

const ChatProvider=({children})=>{

const [user,setUser]=useState();
const[selectedChat,setSelectedChat]=useState()
const[chats,setChats]=useState()
const history = useHistory([])

useEffect(() => {

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    if (!userInfo) history.push("/");
   
  }, [history]);


return( <chatContext.Provider value={{user,setUser,setSelectedChat,selectedChat,setChats,chats}}>
        {children}
    </chatContext.Provider>
    )
}
export const ChatState=()=>{
    return useContext(chatContext)
}

export default ChatProvider;
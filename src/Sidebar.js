import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import { Avatar, IconButton } from "@material-ui/core";
import ChatRoundedIcon from '@material-ui/icons/ChatRounded';
import SidebarChat from "./SidebarChat"
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import MenuButton from "./MenuButton";

function Sidebar() {
  const createChat = function(){
    const roomName = prompt("Please enter name for chat room");

    if (roomName){
      db.collection("rooms").add({
        name: roomName,
      })
    }
  }

    const [rooms, setRooms] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
      const unsubscribe = db.collection("rooms").onSnapshot((snapshot) =>
        setRooms(
          snapshot.docs.map((doc) =>
          ({
            id: doc.id,
            data: doc.data(),
          })
        ))
      );

      return () => {
        unsubscribe();
      }
    }, [])

    return (
      // BEM naming convention
        <div className="sidebar">
          <div className="sidebar_header">
            <Avatar src={user?.photoURL}/>
            <div className="sidebar_header_right">
              <IconButton onClick={createChat}>
                <ChatRoundedIcon />
              </IconButton>
              <MenuButton />
            </div>
          </div>

          <div className="sidebar_chats">
            <SidebarChat addNewChat/>
            {rooms.map(room => (
              <SidebarChat key={room.id} id={room.id} name={room.data.name}/>
            ))}
          </div>
        </div>
    )
}

export default Sidebar

// <div className="sidebar_search">
//   <div className="search_container">
//     <SearchRoundedIcon />
//     <input placeholder="Search or start new chat" type="text"/>
//   </div>
// </div>

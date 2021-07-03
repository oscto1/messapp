import React, { useEffect, useState } from 'react'
import "./SidebarChat.css"
import { Avatar } from "@material-ui/core";
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import db from "./firebase"
import { Link } from 'react-router-dom';


function SidebarChat({ id, name, addNewChat }) {
    const [messages, setMessages] = useState('');

    useEffect(() => {
      if (id) {
        db.collection("rooms").doc(id).collection("messages").orderBy("timestamp", "desc").onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
      }
    }, [id])

    const createChat = function(){
      const roomName = prompt("Please enter name for chat room");

      if (roomName){
        db.collection("rooms").add({
          name: roomName,
        })
      }
    }


    return !addNewChat ? (
      <Link to={`/app/rooms/${id}`}>
        <div className="sidebar_chat">
          <Avatar src={`https://avatars.dicebear.com/api/micah/${id}.svg`}/>
          <div className="sidebar_chat_info">
            <h2>{name}</h2>
            <p>{messages[0]?.message}</p>
          </div>
        </div>
      </Link>
    ) : (
      <div onClick={createChat} className="sidebar_chat_add">
        <div className="add_chat">
          <AddCircleRoundedIcon />
          <h2>Add new room chat</h2>
        </div>
      </div>
    )
}

export default SidebarChat

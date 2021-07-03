import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import InsertEmoticonRoundedIcon from '@material-ui/icons/InsertEmoticonRounded';
import MicRoundedIcon from '@material-ui/icons/MicRounded';
import db from "./firebase"
import firebase from "firebase";
import { useStateValue } from "./StateProvider";
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import { useHistory } from 'react-router-dom';

function Chat() {
    const [input, setInput] = useState("");
    const [roomName, setRoomName] = useState("");
    const {roomId} = useParams();
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();
    const history = useHistory();

    useEffect(() => {
      if(roomId){
        db.collection("rooms").doc(roomId).onSnapshot(snapshot => {
          setRoomName(snapshot.data().name);
        });

        db.collection("rooms").doc(roomId).collection("messages").orderBy('timestamp', 'asc').onSnapshot(snapshot => {
          setMessages(snapshot.docs.map(doc => doc.data()))
        });
      }
    }, [roomId]);

    const back=()=>{
      history.push(`/`);
    }

    const sendMessage = (e) => {
      e.preventDefault();
      if(input === ""){
        setInput("");
      }else{
        db.collection("rooms").doc(roomId).collection("messages").add({
          message: input,
          name: user.displayName,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        document.querySelector(".chat_body").scrollTo(0,document.querySelector(".chat_body").scrollHeight);
        setInput("");
      }
    }

if(roomId){
  return (

      <div className="chat">

        <div className="chat_header">
          <IconButton onClick={back}>
            <ArrowBackIosRoundedIcon />
          </IconButton>
          <Avatar src={`https://avatars.dicebear.com/api/micah/${roomId}.svg`}/>
          <div className="chat_header_info">
            <h3>{roomName}</h3>
            <p>Last seen{" "}{new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}</p>
          </div>
          <div className="chat_header_rigth">
            <IconButton>
              <SearchRoundedIcon />
            </IconButton>
            <IconButton>
              <MoreVertRoundedIcon />
            </IconButton>
          </div>
        </div>
        <div className="chat_body">
          {messages.map((message) => (
            <div className={`chat_message ${message.name === user.displayName && 'chat_reciever'}`}>
              <span className="chat_name">{message.name}</span>
              <div className="message_container">
                {  message.message  }
              </div>
              <div className="time_container">
                <div className="sss"></div>
                <span className="chat_timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
              </div>

            </div>
          ))}


        </div>
        <div className="chat_footer">
          <IconButton>
            <InsertEmoticonRoundedIcon />
          </IconButton>

          <form className="input_message">
            <input value={input} onChange={e => setInput(e.target.value)} spellCheck="false" placeholder="Type a message" type="text"/>
            <button onClick={sendMessage} type="submit">Send</button>
          </form>
          <IconButton>
            <MicRoundedIcon />
          </IconButton>
        </div>
      </div>
  )
}else{
  return (
    <div className="m_select">
      <div className="cont_i">
        <div className="img"></div>
        <h2 className="text_i">Select a room chat</h2>
      </div>
    </div>
  )
}


}

export default Chat

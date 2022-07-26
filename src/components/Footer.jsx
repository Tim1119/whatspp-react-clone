import { useState } from "react";
import icons from "../icons";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { UserAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";

const Footer = () => {
  const [chatMessage, setChatMessage] = useState("");
  const { user } = UserAuth();
  const { roomId } = useParams();

  const handleCreateChat = async (e) => {
    e.preventDefault();
    const docRef = collection(db, "rooms", `${roomId}`, "messages");

    await addDoc(docRef, {
      user: user.fullName,
      message: chatMessage,
      timestamp: serverTimestamp(),
    });

    setChatMessage("");
  };

  return (
    <footer className="bg-[#F0F2F5] flex  item-center sticky top-[100%] h-[60px] gap-2 border-r-4">
      <icons.IconButton>
        <icons.TagFacesIcon />
      </icons.IconButton>
      <icons.IconButton>
        <icons.AttachFileIcon />
      </icons.IconButton>
      <form
        className="flex flex-1 items-center"
        onSubmit={(e) => handleCreateChat(e)}
      >
        <input
          type="text"
          value={chatMessage}
          placeholder="Type a message"
          className="flex-1 my-2 rounded-xl p-1 bg-white outline-none focus-none"
          onChange={(e) => setChatMessage(e.target.value)}
        />
      </form>
      <icons.IconButton>
        <icons.MicIcon />
      </icons.IconButton>
    </footer>
  );
};

export default Footer;

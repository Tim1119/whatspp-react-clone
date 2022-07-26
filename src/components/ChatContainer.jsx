import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import icons from "../icons";
import Chat from "./Chat";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import Footer from "./Footer";
import { faker } from "@faker-js/faker";

const ChatContainer = () => {
  const [roomData, setRoomData] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatImage, setChatImage] = useState("");
  const { roomId } = useParams();

  useEffect(() => {
    const getMessages = async () => {
      const docRef = await collection(db, "rooms", `${roomId}`, "messages");
      if (!docRef.empty) {
        onSnapshot(docRef, (snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
        });
      } else {
        alert(`No message in ${roomData?.name} chat Group`);
      }
    };

    getMessages();
  }, [roomId]);

  useEffect(() => {
    const getRoom = async () => {
      if (roomId) {
        const docRef = doc(db, "rooms", roomId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setRoomData(docSnap.data());
        } else {
          alert("No such room exists!");
        }
      }
    };
    getRoom();
  }, [roomId]);

  useEffect(() => {
    setChatImage(faker.image.avatar());
  }, [roomId]);

  return (
    <div className="w-full flex h-full flex-col">
      <header className="flex items-center justify-between bg-[#F0F2F5] p-2 px-3 border-r-4">
        <div className="flex items-center gap-2">
          <icons.Avatar
            src={roomData.image ? roomData.image : chatImage}
            sx={{ height: 49, width: 49 }}
            className="cursor-pointer"
          ></icons.Avatar>

          <p className="cursor-pointer">{roomData?.name}</p>
        </div>
        <div className="flex items-center gap-1">
          <icons.IconButton>
            <icons.SearchIcon sx={{ height: 28, width: 28 }} />
          </icons.IconButton>
          <icons.IconButton>
            <icons.MoreVertIcon sx={{ height: 28, width: 28 }} />
          </icons.IconButton>
        </div>
      </header>
      <section className="bg-background h-full w-full flex items-center justify-center scrollbar_y">
        <div className="w-4/5 mx-auto h-full mt-7 flex flex-col ">
          {messages?.map((message) => (
            <Chat
              key={message.id}
              message={message.message}
              sender={message.user}
              timestamp={message.timestamp}
            />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ChatContainer;

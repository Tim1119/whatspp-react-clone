import { useEffect, useState } from "react";
import icons from "../icons";
import { faker } from "@faker-js/faker";
import { db } from "../firebase";
import {addDoc,collection,serverTimestamp} from "firebase/firestore";



const SidebarChat = ({ isToAdd, title, message,groupImage }) => {
  const [chatImage, setChatImage] = useState("");

  useEffect(() => {
    setChatImage(faker.image.avatar());
  }, []);

  const createChatGroup = async () => {
    const roomName = prompt("Please enter the name for the chat room");
    if (roomName){

      await addDoc(collection(db,'rooms'), { name: roomName,"image":faker.image.avatar(),timestamp:serverTimestamp() });
    }else{
      alert("Room Name can't be empty")
    }
  }

  return (
    <>
      {isToAdd ? (
        <div
          className="flex items-center gap-2 p-2 bg-white border-b hover:bg-[#F0F2F5] cursor-pointer"
          onClick={createChatGroup}
        >
          <div>
            <h3 className="font-medium text-[18px]">{title}</h3>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 p-2 bg-white border-b hover:bg-[#F0F2F5] cursor-pointer">
          <icons.Avatar
            src={groupImage ? groupImage : chatImage }
            sx={{ height: 56, width: 56 }}
          ></icons.Avatar>
          <div>
            <h3 className="font-medium text-[18px]">{title}</h3>
            <p className="text-gray-400 text-sm">{message}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default SidebarChat;

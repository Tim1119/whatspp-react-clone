import React from "react";
import { UserAuth } from "../context/AuthContext";
const Chat = ({ message, sender, timestamp }) => {
  const { user } = UserAuth();

  return (
    <section
      className={`grid ${
        user.fullName === sender ? "justify-items-start" : "justify-items-end"
      }`}
    >
      <div
        className={`capitalize flex-end my-2 p-1 ${
          user.fullName === sender ? "bg-[#D9FDD3]" : "bg-white"
        } w-fit rounded-xl`}
      >
        <h3
          className={`font-medium text-sm  ${
            user.fullName === sender ? "text-[#007bfc]" : "text-red-400"
          }`}
        >
          {sender}
        </h3>
        <div className="text-end text-sm ">
          {message}
          <small className="text-[10px] px-2  text-gray-400">
            {new Date(timestamp?.toDate()).toUTCString()}
          </small>
        </div>
      </div>
    </section>
  );
};

export default Chat;

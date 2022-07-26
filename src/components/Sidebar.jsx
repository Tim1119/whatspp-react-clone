import { useState, useEffect } from "react";
import icons from "../icons";
import SidebarChart from "./SidebarChart";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { user } = UserAuth();
  const [rooms, setRooms] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const querySnapshot = collection(db, "rooms");
    const unsubscribe = onSnapshot(querySnapshot, (snapshot) => {
      setRooms(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    return () => unsubscribe();
  }, []);

  const searchedRoom = rooms.filter((room) => {
    if (searchInput) {
      if (room.name.toLowerCase().includes(searchInput.toLowerCase())) {
        return room;
      }
    }
  });

  const searchRoomItem = searchedRoom.map((room) => {
    return (
      <Link to={`/whatsapp/rooms/${room.id}`} key={room.id}>
        <SidebarChart
          title={room.name}
          message="President Buhari has ordered ASUU.."
          groupImage={room.image}
        />
      </Link>
    );
  });

  return (
    <section className="w-96 flex-shrink-0 border-r scrollbar_y">
      <header className="bg-[#F0F2F5] flex items-center justify-between h-[65px] p-2 px-3 ">
        <icons.Avatar
          src={user?.photoURL}
          style={{ backgroundColor: "green" }}
          sx={{ width: 49, height: 49 }}
        ></icons.Avatar>
        <aside>
          <icons.IconButton>
            <icons.DonutLargeIcon />
          </icons.IconButton>
          <icons.IconButton>
            <icons.ChatIcon />
          </icons.IconButton>
          <icons.IconButton>
            <icons.MoreVertIcon />
          </icons.IconButton>
        </aside>
      </header>
      <div className="flex items-center justify-between gap-1 h-[50px] px-2 bg-white border-b">
        <div className="flex flex-1 bg-[#F0F2F5] rounded-xl p-1 items-center gap-2 px-3">
          <icons.SearchIcon />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="flex-1 p-0.5 bg-[#F0F2F5] outline-none focus-none "
            placeholder="Search or start new chat"
          />
        </div>
        <icons.FilterListIcon />
      </div>
      <SidebarChart isToAdd title={"Create New Chat"} />

      {searchRoomItem.length > 0
        ? searchRoomItem
        : rooms.map((room) => (
            <Link to={`/whatsapp/rooms/${room.id}`} key={room.id}>
              <SidebarChart
                title={room.name}
                message="President Buhari has ordered ASUU.."
                groupImage={room.image}
              />
            </Link>
          ))}
    </section>
  );
};

export default Sidebar;

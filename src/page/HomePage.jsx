import { Outlet, Route, Routes } from "react-router-dom";
import ChatContainer from "../components/ChatContainer";
import Sidebar from "../components/Sidebar";
import WhatsappBanner from "../components/WhatsappBanner";
const HomePage = () => {
  return (
    <div className="flex w-full">
      <Sidebar />
      <Routes>
        <Route path="/rooms/:roomId" element={<ChatContainer />}></Route>
        <Route path="/" element={<WhatsappBanner />}></Route>
      </Routes>
      <Outlet />
    </div>
  );
};

export default HomePage;

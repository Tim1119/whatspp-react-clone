import "./App.css";
import LoginPage from "./page/LoginPage";
import { UserAuth } from "./context/AuthContext";
import HomePage from "./page/HomePage";
import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  const { user } = UserAuth();
  return (
    <div className="h-[100vh] w-full bg-[#F0F2F5] flex">
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route
          path="/whatsapp/*"
          element={
            <ProtectedRoutes>
              <HomePage />
            </ProtectedRoutes>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;

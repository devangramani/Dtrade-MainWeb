import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Screen/AuthStack/Home/Home";
import Login from "./Screen/LoginStack/Login/Login";
import TopCard from "./Screen/AuthStack/Top/TopCard";
import Profile from "./Screen/AuthStack/Profile/Profile";
import Trade from "./Screen/AuthStack/Trade/Trade";
import Position from "./Screen/AuthStack/Position/Position";
import MarketPlace from "./Screen/AuthStack/MarketPlace/MarketPlace";
import Notification from "./Screen/AuthStack/Notification/Notification";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css";
import "./App.css";
import Side from "./Screen/AuthStack/Side/Side";
import SocketContext from "./Screen/AuthStack/SocketContext";
import { io } from "socket.io-client";
const socket = io("http://dtrade.fun:3200");

const options = {
  timeout: 5000,
  position: positions.TOP_RIGHT,
};

function App() {
  // localStorage.setItem("isLogged", "1");
  return (
    <div className="App">
      <Provider template={AlertTemplate} {...options}>
        <SocketContext.Provider value={socket}>
          <BrowserRouter>
            {localStorage.getItem("isLogged") === "1" ? (
              <>
                <div className="topcard" style={{ height: "12vh" }}>
                  <TopCard />
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                      }}
                    >
                      <Side />
                    </div>
                    <div
                      style={{
                        flex: 3,
                      }}
                    >
                      <Routes>
                        <Route path="Home" element={<Home />} />
                        <Route path="Trade" element={<Trade />} />
                        <Route path="Position" element={<Position />} />
                        <Route path="MarketPlace" element={<MarketPlace />} />
                        <Route path="Profile" element={<Profile />} />
                        <Route path="Notification" element={<Notification />} />
                        <Route path="/" element={<Home />} />
                        <Route path="*" element={<Home />} />
                      </Routes>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <Routes>
                <Route path="Login" element={<Login />} />
                <Route path="/" element={<Login />} />
                <Route path="*" element={<Login />} />
              </Routes>
            )}
          </BrowserRouter>
        </SocketContext.Provider>
      </Provider>
    </div>
  );
}

export default App;

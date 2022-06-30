import React, { useContext, useEffect, useState } from "react";
import { BUY, CardBack, Main_Color, SELL } from "../../../Color/Color";
import "./Top.css";
import { Link } from "react-router-dom";
import SocketContect from "../SocketContext";
function TopCard() {
  const [selected, setSelected] = useState(1);
  const [marke, setmarkeg] = useState(false);
  const [chng, setchng] = useState(0);
  const [niftyrate, setniftyrate] = useState(0);
  const [percent, setpercent] = useState(0);
  const [bankchng, setbankchng] = useState(0);
  const [bankniftyrate, setbankniftyrate] = useState(0);
  const [bankpercent, setbankpercent] = useState(0);
  const socket = useContext(SocketContect);
  const niftys = (msg) => {
    if (msg == null) {
    } else {
      if (msg.LTP - msg.Previous_Close !== chng) {
        setchng(msg.LTP - msg.Previous_Close);
        setpercent(((msg.LTP - msg.Previous_Close) / msg.Previous_Close) * 100);
        setniftyrate(msg.LTP);
      }
    }
  };
  const bankniftys = (msg) => {
    if (msg == null) {
    } else {
      if (msg.LTP - msg.Previous_Close !== bankchng) {
        setbankchng(msg.LTP - msg.Previous_Close);
        setbankpercent(
          ((msg.LTP - msg.Previous_Close) / msg.Previous_Close) * 100
        );
        setbankniftyrate(msg.LTP);
      }
    }
  };
  useEffect(() => {
    socket.emit("giverate", "nifty");
    socket.emit("giverate", "banknifty");
    socket.on("nifty", niftys);
    socket.on("banknifty", bankniftys);
    return () => {
      socket.off("nifty", niftys);

      socket.off("banknifty", bankniftys);
    };
  }, []);

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <div
        style={{
          flex: 0.4,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Link to={"./Home"} style={{ textDecoration: "none" }}>
          <img
            src={require("../../../Photo/Logo1.png")}
            style={{ height: "50px", width: "50px" }}
          />
        </Link>
      </div>
      <div style={{ flex: 2 }}>
        <div
          className="card"
          style={{
            height: "30px",
            marginRight: 30,
            backgroundColor: CardBack,
            display: "flex",
            alignItems: "center",
            borderRadius: 10,
            paddingLeft: 10,
            paddingRight: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              flex: 1,
              width: "100%",
            }}
          >
            <div
              style={{
                flex: 1,
                width: "100%",
                color: "#000",
                display: "flex",
                paddingLeft: 10,
                alignItems: "center",
              }}
            >
              <div
                style={{
                  color: Main_Color,
                  fontSize: 15,
                  fontFamily: "NexaBold",
                }}
              >
                Nifty 50
              </div>
              <div
                style={{
                  marginLeft: 10,
                  color: chng > 0 ? BUY : SELL,
                  fontFamily: "NexaBold",
                  fontSize: 16,
                }}
              >
                {parseFloat(niftyrate).toFixed(2)}
              </div>
              <div
                style={{
                  marginLeft: 10,
                  color: chng > 0 ? BUY : SELL,
                  fontSize: 11,
                  fontWeight: "bold",
                }}
              >
                {parseFloat(chng).toFixed(2)}{" "}
                {"(" + parseFloat(percent).toFixed(2) + "%)"}
              </div>
            </div>
            <div
              style={{
                flex: 1,
                color: "#000",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  color: Main_Color,
                  fontFamily: "NexaBold",
                  fontSize: 15,
                }}
              >
                BankNifty
              </div>
              <div
                style={{
                  color: BUY,
                  marginLeft: 5,
                  fontFamily: "NexaBold",
                  fontSize: 15,
                }}
              >
                {parseFloat(bankniftyrate).toFixed(2)}
              </div>
              <div
                style={{
                  marginLeft: 10,
                  color: bankchng > 0 ? BUY : SELL,
                  fontSize: 11,
                  fontWeight: "bold",
                }}
              >
                {parseFloat(bankchng).toFixed(2)}{" "}
                {"(" + parseFloat(bankpercent).toFixed(2) + "%)"}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          flex: 1.5,
          flexDirection: "row",
          display: "flex",
          height: "100%",
          paddingLeft: 50,
          paddingRight: 50,
          alignItems: "center",
        }}
      >
        <Link
          onClick={() => setSelected(1)}
          to={"/Home"}
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "fantasy",
            fontSize: 18,
            borderStyle: "solid",
            height: "100%",
            borderWidth: 0,
            borderBottomWidth: selected === 1 ? 5 : 0,
            borderBottomColor: Main_Color,
            textDecoration: "none",
            color: selected === 1 ? Main_Color : "#585858",
          }}
        >
          <div style={{ fontFamily: "NexaBold" }}>DashBoard</div>
        </Link>
        <Link
          onClick={() => setSelected(2)}
          to={"/Trade"}
          style={{
            textDecoration: "none",
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "NexaBold",
            fontSize: 18,
            borderStyle: "solid",
            borderWidth: 0,
            borderBottomWidth: selected === 2 ? 5 : 0,
            borderBottomColor: Main_Color,
            height: "100%",
            color: selected === 2 ? Main_Color : "#585858",
          }}
        >
          <div>Tradebook</div>
        </Link>
        <Link
          onClick={() => setSelected(3)}
          to={"/Position"}
          style={{
            textDecoration: "none",
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "NexaBold",
            fontSize: 18,
            borderStyle: "solid",
            borderWidth: 0,
            borderBottomWidth: selected === 3 ? 5 : 0,
            borderBottomColor: Main_Color,
            height: "100%",
            color: selected === 3 ? Main_Color : "#585858",
          }}
        >
          <div>Position</div>
        </Link>
        <Link
          onClick={() => setSelected(4)}
          to={"/MarketPlace"}
          style={{
            textDecoration: "none",
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "NexaBold",
            fontSize: 18,
            borderStyle: "solid",
            borderWidth: 0,
            borderBottomWidth: selected === 4 ? 5 : 0,
            borderBottomColor: Main_Color,
            height: "100%",
            color: selected === 4 ? Main_Color : "#585858",
          }}
        >
          <div>Market Place</div>
        </Link>
      </div>
      <div
        style={{
          flex: 0.5,
          display: "flex",
          height: "100%",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Link
            onClick={() => setSelected(5)}
            to="/Notification"
            style={{
              textDecoration: "none",
              marginTop: 5,
              borderStyle: "solid",
              borderWidth: 0,
              borderBottomWidth: selected === 5 ? 5 : 0,
              borderBottomColor: Main_Color,
              marginRight: 20,
            }}
          >
            <img
              src={require("../../../Photo/Notification.png")}
              style={{ height: "37px", width: "30px" }}
            />
          </Link>
          <div
            style={{
              backgroundColor: CardBack,
              width: "50px",
              borderRadius: 30,
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              marginRight: 20,
              height: "50px",
            }}
          >
            <Link
              onClick={() => setSelected(6)}
              to="/Profile"
              style={{ textDecoration: "none", marginTop: 5 }}
            >
              <img
                src={require("../../../Photo/Logo.png")}
                style={{ height: "30px", width: "30px" }}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopCard;

// #eaf0fe

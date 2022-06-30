import React, { Component, useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import { BUY, CardBack, SELL } from "../../../Color/Color";
import BuySellCard from "./BuySellCard";
import Chart from "./Chart";
import { useAlert } from "react-alert";
import SocketContext from "../SocketContext";
import "./Home.css";
function Home(props) {
  const socket = useContext(SocketContext);
  const [ask, setask] = useState(0);
  const [bid, setbid] = useState(0);
  const [high2, sethigh2] = useState(0);
  const [low2, setlow2] = useState(0);
  const [chng, setchng] = useState(0);
  const [percent, setpercent] = useState(0);
  const [ltp, setltp] = useState(0);
  const [pre_close, setpre_close] = useState(0);
  const [Open, setOpen] = useState(0);
  const [time, settime] = useState(0);

  const alert = useAlert();

  const trade = (msg) => {
    if (msg == null) {
      alert.error("Script is expire no trading available");
    } else {
      if (bid !== msg.Bid) {
        setbid(msg.Bid);
      }
      if (ask !== msg.Ask) {
        setask(msg.Ask);
      }
      if (high2 !== msg.High) {
        sethigh2(msg.High);
      }
      if (low2 !== msg.Low) {
        setlow2(msg.Low);
      }
      if (pre_close !== msg.Previous_Close) {
        setpre_close(msg.Previous_Close);
      }
      if (Open !== msg.Open) {
        setOpen(msg.Open);
      }
      if (msg.LTP - msg.Previous_Close !== chng) {
        setchng(msg.LTP - msg.Previous_Close);
        setpercent(((msg.LTP - msg.Previous_Close) / msg.Previous_Close) * 100);
      }
      if (ltp !== msg.LTP) {
        setltp(msg.LTP);
      }
    }
  };
  const bidask = (msg) => {
    if (bid !== msg.Bid) {
      setbid(msg.Bid);
    }
    if (ask !== msg.Ask) {
      setask(msg.Ask);
    }
  };
  useEffect(() => {
    socket.emit("giverate", props.data.script_id);
    socket.on("trade" + props.data.script_id, trade);
    socket.on("bidask" + props.data.script_id, bidask);
    return () => {
      socket.off("trade" + props.data.script_id, trade);
      socket.off("bidask" + props.data.script_id, bidask);
    };
  }, [props.data]);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 2 }}>
        <div
          style={{
            height: "80px",
            padding: 10,
            paddingTop: 20,
            display: "flex",
          }}
        >
          <div style={{ marginLeft: 10 }}>
            <div style={{ fontFamily: "NexaBold", color: "#585858" }}>
              {props.data.symbol_display}
            </div>
            <div style={{ fontSize: 10, color: BUY, fontFamily: "NexaBold" }}>
              {parseFloat(chng).toFixed(2)}{" "}
              {"(" + parseFloat(percent).toFixed(2) + "%)"}
            </div>
          </div>
          <div
            style={{
              marginLeft: 30,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: 10, color: BUY, fontFamily: "NexaBold" }}>
              BID
            </div>
            <div style={{ fontSize: 15, fontFamily: "NexaBold", color: BUY }}>
              {bid}
            </div>
          </div>
          <div
            style={{
              marginLeft: 30,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: 10, color: SELL, fontFamily: "NexaBold" }}>
              ASK
            </div>
            <div style={{ fontSize: 15, fontFamily: "NexaBold", color: SELL }}>
              {ask}
            </div>
          </div>
          <div
            style={{
              flex: 1,
              justifyContent: "end",
              display: "flex",
            }}
          >
            *
          </div>
        </div>
        <div style={{ height: "55px" }}>
          <Chart />
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            height: "80px",
            padding: 10,
            paddingTop: 20,
            display: "flex",
          }}
        >
          <div style={{ marginLeft: 10 }}>
            <div style={{ fontFamily: "NexaBold", color: "#585858" }}>
              {props.data.symbol_display}
            </div>
            <div style={{ fontSize: 10, color: BUY }}>
              {parseFloat(chng).toFixed(2)}{" "}
              {"(" + parseFloat(percent).toFixed(2) + "%)"}
            </div>
          </div>
          <div
            style={{
              marginLeft: 30,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: 10, color: BUY, fontFamily: "NexaBold" }}>
              BID
            </div>
            <div style={{ fontSize: 15, fontFamily: "NexaBold", color: BUY }}>
              {bid}
            </div>
          </div>
          <div
            style={{
              marginLeft: 30,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: 10, color: SELL, fontFamily: "NexaBold" }}>
              ASK
            </div>
            <div style={{ fontSize: 15, fontFamily: "NexaBold", color: SELL }}>
              {ask}
            </div>
          </div>
        </div>

        <div
          style={{
            height: "400px",
            borderStyle: "solid",
            borderWidth: 0,
            borderLeftWidth: 2,
            borderBottomWidth: 2,
            borderLeftColor: CardBack,
            borderBottomColor: CardBack,
            borderRadius: 10,
          }}
        >
          <BuySellCard />
        </div>
      </div>
    </div>
  );
}

const MapStateToProps = (state) => {
  return {
    data: state.scriptdata,
  };
};

export default connect(MapStateToProps)(Home);

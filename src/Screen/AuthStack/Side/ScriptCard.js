import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import Backend from "../../../Backend/Backend";
import { BUY, CardBack, Main_Color, SELL } from "../../../Color/Color";
import SocketContext from "../SocketContext";
import { connect } from "react-redux";
import { useAlert } from "react-alert";
const backend = new Backend();

function ScriptCard(props) {
  const socket = useContext(SocketContext);
  const [ask, setask] = useState(0);
  const [bid, setbid] = useState(0);
  const [high2, sethigh2] = useState(0);
  const [low2, setlow2] = useState(0);
  const [chng, setchng] = useState(0);
  const [percent, setpercent] = useState(0);
  const [ltp, setltp] = useState(0);
  const [username_id, setUsername_id] = useState(
    localStorage.getItem("username_id")
  );
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [server, setServer] = useState(localStorage.getItem("server_code"));

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
    socket.emit("giverate", props.item.script_id);
    socket.on("trade" + props.item.script_id, trade);
    socket.on("bidask" + props.item.script_id, bidask);
    return () => {
      socket.off("trade" + props.item.script_id, trade);
      socket.off("bidask" + props.item.script_id, bidask);
    };
  }, []);

  const _delete_script = (item) => {
    let data = {
      id: username_id,
      token: token,
      server_code: server,
      script_id: item.id,
      main_script_id: item.script_id,
      type: item.script_type,
    };
    backend.delete_script(data).then((r) => {
      if (r.error == "False") {
        props.reload();
        alert.success(r.message);
      } else {
        alert(r.message);
      }
    });
  };

  return (
    <div
      onClick={() => props.data(props.item)}
      key={props.item.id}
      style={{
        display: "flex",
        height: "55px",
        alignItems: "center",
        borderStyle: "solid",
        borderWidth: 0,
        borderBottomWidth: 2,
        borderBottomColor: CardBack,
        paddingRight: 10,
      }}
    >
      <div style={{ flex: 1 }}>
        <div
          style={{
            color: Main_Color,
            display: "flex",
          }}
        >
          <div
            style={{
              color: Main_Color,
              fontSize: props.item.script_type == "fo" ? 16 : 18,
              fontFamily: "NexaBold",
            }}
          >
            {props.item.script_type == "fo"
              ? props.item.symbol_display
              : props.item.name}
          </div>
          <div
            style={{
              color: Main_Color,
              fontSize: 10,
              marginTop: 5,
              marginLeft: 8,
              fontWeight: "bold",
            }}
          >
            {moment(props.item.expiry_date).format("DD MMM YY")}
          </div>
        </div>
        <div
          style={{
            fontSize: 12,
            marginTop: 4,
            color: chng > 0 ? BUY : SELL,
            fontWeight: "bold",
          }}
        >
          {parseFloat(chng).toFixed(2)}{" "}
          {"(" + parseFloat(percent).toFixed(2) + "%)"}
        </div>
      </div>
      <div style={{ fontSize: 22, color: BUY, fontWeight: "bold" }}>{ltp}</div>
      {props.delete == true ? (
        <div style={{ fontSize: 22, color: BUY, fontWeight: "bold" }}>
          <div
            onClick={() => _delete_script(props.item)}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 8,
            }}
          >
            <MdDelete style={{ height: "22px", width: "22px", color: SELL }} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

const MapDispatchToProps = (dispatch) => {
  return {
    data: (a) => {
      dispatch({ type: "SCRIPTDATA", payload: a });
    },
  };
};

export default connect(null, MapDispatchToProps)(ScriptCard);

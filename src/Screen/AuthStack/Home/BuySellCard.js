import React, { Component } from "react";
import { CardBack, Main_Color } from "../../../Color/Color";
import Backend from "../../../Backend/Backend";
import { connect } from "react-redux";
import { useAlert } from "react-alert";

import { Buy, Error, New } from "../../../Sound/Sound";

const backend = new Backend();
function BuySellCard(props) {
  const [buy_sell, setBuy_Sell] = React.useState(0);
  const [trade_type, setTrade_Type] = React.useState(1);
  const [qty, setQty] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [buylimitstop, setBuylimitstop] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [userdata, setUserdata] = React.useState(
    localStorage.getItem("username")
  );

  const alert = useAlert();

  const _send_order = () => {
    if (trade_type == 1) {
      if (qty == "") {
        alert.error("Qunitity");
        let song = new Audio(Error);
        song.play();
      } else {
        var data = {
          script_id: props.data.script_id,
          qty_order: qty,
          type: buy_sell == true ? 0 : 1,
          token: localStorage.getItem("token"),
          username: userdata,
          server_code: localStorage.getItem("server_code"),
          script_type: props.data.script_type,
        };

        console.log(data);

        backend.trade(data).then((r) => {
          console.log(r);
          setTimeout(() => {
            setLoading(false);
            setQty("");
          }, 1000);
          if (r.error == "False") {
            alert.success(r.message);
          } else {
            alert.error(r.message);
          }
        });
      }
    } else if (trade_type == 2) {
      if (qty == "" || price == "") {
        alert.error("Check Qunitity and Price");
      } else {
        var data = {
          script_id: props.item.item.script_id,
          qty_order: qty,
          type: props.buy_sell == true ? 0 : 1,
          token: localStorage.getItem("token"),
          username: userdata.username,
          server_code: localStorage.getItem("server_code"),
          buylimitstop: buylimitstop,
          at_price: price,
          limit_type: trade_type == 2 ? 0 : 1,
        };
        backend.pending(data).then((r) => {
          setTimeout(() => {
            setLoading(false);
            setQty("");
            setPrice("");
          }, 1000);
          if (r.error == "False") {
            alert.success(r.message);
          } else {
            alert.error(r.message);
          }
        });
      }
    } else if (this.state.selected == 3) {
      alert.success("SL");
    }
  };

  return (
    <div
      style={{
        flex: 1,
        height: "100%",
        borderRadius: 10,
      }}
    >
      <div style={{ height: "55px", display: "flex", borderRadius: 10 }}>
        <div
          onClick={() => setBuy_Sell(0)}
          className="buybutton"
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            backgroundColor: buy_sell === 0 ? Main_Color : CardBack,
            fontSize: 20,
            color: buy_sell === 0 ? "#fff" : Main_Color,
            borderRadius: 10,
            fontFamily: "NexaBold",
          }}
        >
          BUY
        </div>
        <div
          onClick={() => setBuy_Sell(1)}
          className="buybutton"
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            backgroundColor: buy_sell === 1 ? Main_Color : CardBack,
            fontSize: 20,
            color: buy_sell === 1 ? "#fff" : Main_Color,
            borderRadius: 10,
            fontFamily: "NexaBold",
          }}
        >
          SELL
        </div>
      </div>
      <div style={{ height: "100%" }}>
        <div
          style={{
            height: "50px",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <div
            onClick={() => setTrade_Type(1)}
            style={{
              backgroundColor: trade_type === 1 ? Main_Color : CardBack,
              padding: 7,
              borderRadius: 7,
              color: trade_type === 1 ? "#fff" : Main_Color,
              fontSize: 14,
              fontFamily: "NexaBold",
            }}
          >
            MARKET
          </div>
          <div
            onClick={() => setTrade_Type(2)}
            style={{
              backgroundColor: trade_type === 2 ? Main_Color : CardBack,
              padding: 7,
              borderRadius: 7,
              color: trade_type === 2 ? "#fff" : Main_Color,
              fontSize: 14,
              fontFamily: "NexaBold",
              paddingLeft: 15,
              paddingRight: 15,
            }}
          >
            LIMIT
          </div>
          <div
            onClick={() => setTrade_Type(3)}
            style={{
              backgroundColor: trade_type === 3 ? Main_Color : CardBack,
              padding: 7,
              borderRadius: 7,
              color: trade_type === 3 ? "#fff" : Main_Color,
              fontSize: 14,
              fontFamily: "NexaBold",
              paddingLeft: 15,
              paddingRight: 15,
            }}
          >
            SL
          </div>
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <div
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                borderWidth: 1,
                borderStyle: "solid",
                padding: 10,
                paddingTop: 0,
                paddingBottom: 0,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                width: "80%",
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontFamily: "NexaBold",
                  color: "#585858",
                }}
              >
                QUANTITY
              </div>
              <div
                style={{
                  paddingLeft: 10,
                  paddingRight: 10,
                  fontSize: 30,
                }}
              >
                |
              </div>
              <div>
                <input
                  value={qty}
                  onChange={(e) => {
                    setQty(e.target.value);
                  }}
                  style={{
                    borderWidth: 0,
                    height: "45px",
                    outline: "none",
                    fontSize: 25,
                    color: Main_Color,
                    fontWeight: "bold",
                    width: "100%",
                  }}
                  type="number"
                />
              </div>
            </div>
            {trade_type === 1 ? null : (
              <div
                style={{
                  borderWidth: 1,
                  borderStyle: "solid",
                  padding: 10,
                  paddingTop: 0,
                  paddingBottom: 0,
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  marginTop: 30,
                  width: "80%",
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontFamily: "NexaBold",
                    paddingRight: 25,
                    color: "#585858",
                  }}
                >
                  PRICE
                </div>
                <div
                  style={{
                    paddingLeft: 10,
                    paddingRight: 10,
                    fontSize: 30,
                  }}
                >
                  |
                </div>
                <div>
                  <input
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                    style={{
                      borderWidth: 0,
                      height: "45px",
                      outline: "none",
                      fontSize: 25,
                      color: Main_Color,
                      fontWeight: "bold",
                      width: "100%",
                    }}
                    type="number"
                  />
                </div>
              </div>
            )}
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              onClick={() => _send_order()}
              style={{
                height: "55px",
                width: "200px",
                backgroundColor: Main_Color,
                borderRadius: 10,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#fff",
              }}
            >
              <div
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                BUY
              </div>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={require("../../../Photo/ArrowLeft.png")}
                  style={{ height: "25px", width: "25px" }}
                />
              </div>
            </div>
          </div>
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

export default connect(MapStateToProps)(BuySellCard);

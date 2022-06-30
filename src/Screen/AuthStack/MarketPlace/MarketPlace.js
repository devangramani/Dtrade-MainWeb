import React, { Component, useEffect } from "react";
import Backend from "../../../Backend/Backend";
import { CardBack, Main_Color } from "../../../Color/Color";
import MarketCard from "./MarketCard";
import ReactLoading from "react-loading";
import { useAlert } from "react-alert";

const backend = new Backend();

function MarketPlace() {
  const [notification, setNotification] = React.useState([]);
  const [datas, setData] = React.useState(
    JSON.parse(localStorage.getItem("username_data"))
  );
  const [loading, setLoading] = React.useState(true);
  const alert = useAlert();

  useEffect(() => {
    news();
  }, []);

  const news = () => {
    let data = {
      token: localStorage.getItem("token"),
      id: localStorage.getItem("username_id"),
      super_id: datas.super_id,
    };

    backend.news(data).then((r) => {
      if (r.error == "False") {
        setNotification(r.data);
        setLoading(false);
      } else {
        setLoading(false);
        alert.error(r.message);
      }
    });
  };

  return (
    <div style={{ padding: 30 }}>
      <div className="cards" style={{ borderRadius: 10 }}>
        <div
          style={{
            height: "55px",
            backgroundColor: CardBack,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            display: "flex",
            fontFamily: "NexaBold",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 22,
            color: "#585858",
          }}
        >
          <div>Market Place</div>
        </div>
        <div style={{ overflowY: "scroll", height: "72vh" }}>
          {loading == true ? (
            <div
              style={{
                display: "flex",
                backgroundColor: "#ffffff",
                borderRadius: 10,
                justifyContent: "space-around",
                alignItems: "center",
                height: "100%",
              }}
            >
              <ReactLoading
                type={"bars"}
                color={Main_Color}
                height={45}
                width={45}
              />
            </div>
          ) : notification.length > 0 ? (
            notification.map((i, t) => {
              return <MarketCard item={i} />;
            })
          ) : (
            <div
              style={{
                display: "flex",
                backgroundColor: "#ffffff",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                flexDirection: "column",
              }}
            >
              <div style={{ fontFamily: "NexaBold" }}>NO DATA FOUND</div>
              <div
                onClick={() => news()}
                style={{
                  fontFamily: "NexaBold",
                  marginTop: 10,
                  height: "40px",
                  width: "100px",
                  borderRadius: 10,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: Main_Color,
                  color: "#ffffff",
                }}
              >
                RELOAD
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MarketPlace;

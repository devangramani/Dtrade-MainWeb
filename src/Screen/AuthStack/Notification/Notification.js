import React, { Component } from "react";
import Backend from "../../../Backend/Backend";
import { CardBack, Main_Color } from "../../../Color/Color";
import NotificationCard from "./NotificationCard";
import ReactLoading from "react-loading";

const backend = new Backend();

export default class Notification extends Component {
  constructor() {
    super();
    this.state = {
      notification: [],
      data: JSON.parse(localStorage.getItem("username_data")),
    };
  }

  componentDidMount() {
    this.news();
  }

  news() {
    this.setState({
      loading: true,
    });
    let data = {
      token: localStorage.getItem("token"),
      id: localStorage.getItem("username_id"),
      super_id: this.state.data.super_id,
    };

    backend.news(data).then((r) => {
      if (r.error == "False") {
        this.setState({ notification: r.data, loading: false });
      } else {
        alert(r.message);
      }
    });
  }

  render() {
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
            <div>Notification</div>
          </div>
          <div style={{ overflowY: "scroll", height: "72vh" }}>
            {this.state.loading == true ? (
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
            ) : this.state.notification.length > 0 ? (
              this.state.notification.map((i, t) => {
                return <NotificationCard item={i} />;
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
                  onClick={() => this.news()}
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
}

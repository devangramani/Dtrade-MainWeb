import React, { Component } from "react";
import TopCard from "./TopCard";
import PositionCard from "./PositionCard";
import "./Position.css";
import Backend from "../../../Backend/Backend";
import { connect } from "react-redux";
import { Main_Color } from "../../../Color/Color";
import ReactLoading from "react-loading";
const backend = new Backend();

class Position extends Component {
  constructor() {
    super();
    this.state = {
      position_data: [],
      loading: true,
      balance: "",
      booked: "",
      limit: "",
      multiplier: "",
    };
  }

  componentDidMount() {
    this.load_position();
  }

  load_position() {
    let data = {
      token: localStorage.getItem("token"),
      id: localStorage.getItem("username_id"),
      server_code: localStorage.getItem("server_code"),
    };

    backend.position(data).then((r) => {
      this.props.clear_pf();
      if (r.error == "False") {
        if (r.data.length == 0) {
          this.props.clear_pf();
        }
        this.setState({
          position_data: r.data,
          loading: false,
          balance: r.balance,
          booked: r.booked,
          limit: r.limit,
          multiplier: r.multiplier,
        });
      } else {
        alert(r.message);
      }
    });
  }

  render() {
    return (
      <div style={{ padding: 20 }}>
        <div style={{ marginBottom: -50 }}>
          <TopCard
            booked={this.state.booked}
            balance={this.state.balance}
            limit={this.state.limit}
            multiplier={this.state.multiplier}
          />
        </div>
        <div
          className="pocard"
          style={{
            height: "78vh",
            borderRadius: 10,
            paddingTop: 45,
            overflowY: "scroll",
          }}
        >
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
          ) : this.state.position_data == undefined ||
            this.state.position_data == [] ||
            this.state.position_data.length == 0 ? (
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
                onClick={() => this.load_position()}
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
          ) : (
            this.state.position_data.map((item, index) => {
              return (
                <PositionCard
                  item={item}
                  total={this.state.position_data.length}
                  reload={() => this.load_position()}
                />
              );
            })
          )}
        </div>
      </div>
    );
  }
}
const MapDispatchToProps = (dispatch) => {
  return {
    clear_pf: () => {
      dispatch({ type: "CLEAR_PF" });
    },
  };
};

export default connect(null, MapDispatchToProps)(Position);

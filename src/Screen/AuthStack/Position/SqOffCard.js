import React, { Component } from "react";
import { BUY, Main_Color, SELL } from "../../../Color/Color";
import { AiFillCloseCircle, AiOutlineArrowRight } from "react-icons/ai";
import { InputText } from "primereact/inputtext";
import Backend from "../../../Backend/Backend";
const backend = new Backend();
export default class SqOffCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qty: props.data.qty,
      userdata: JSON.parse(localStorage.getItem("username_data")),
      loading: false,
    };
  }

  sq_off() {
    if (this.state.qty == "") {
      alert("Invaldi Oty ");
    } else {
      this.setState({ loading: true });
      var data = {
        script_id: this.props.data.script_id,
        qty_order: this.state.qty,
        type: this.props.data.buy_sale == 1 ? 0 : 1,
        token: localStorage.getItem("token"),
        username: this.state.userdata.username,
        server_code: localStorage.getItem("server_code"),
        script_type:
          this.props.data.fut_mcx == 2
            ? "fo"
            : this.props.data.fut_mcx == 1
            ? "mcx"
            : "fut",
      };
      backend.trade(data).then((r) => {
        setTimeout(() => {
          this.setState({ loading: true, qty: "" });
        }, 1000);
        if (r.error == "False") {
          this.props.closeModal();
          alert(r.message);
        } else {
          this.props.closeModal();
          alert(r.message);
        }
      });
    }
  }
  render() {
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
            height: "50%",
            width: "40%",
            backgroundColor: "#f2f2f2",
            borderRadius: 10,
          }}
        >
          <div
            style={{
              height: "55px",
              backgroundColor: Main_Color,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              fontFamily: "NexaBold",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#fff",
            }}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              SQUARE OFF
            </div>
            <div
              onClick={() => this.props.closeModal()}
              style={{ paddingRight: 10 }}
            >
              <AiFillCloseCircle style={{ fontSize: 35 }} />
            </div>
          </div>
          <div
            style={{
              height: "80px",
              backgroundColor: "#EAF0FE",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              fontFamily: "NexaBold",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#fff",
            }}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <div style={{ color: "#585858" }}>{this.props.data.symbol}</div>
                <div style={{ marginTop: 10, color: "#585858" }}>
                  {this.props.data.buy_sale == 0
                    ? `BUY (${this.props.data.qty})`
                    : `SELL(${this.props.data.qty})`}
                </div>
              </div>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div style={{ fontFamily: "NexaBold", color: "#585858" }}>
                    C :
                    {this.props.data.buy_sale == 0
                      ? parseFloat(this.props.bid).toFixed(2)
                      : parseFloat(this.props.ask).toFixed(2)}
                  </div>
                  <div
                    style={{
                      paddingLeft: 5,
                      paddingRight: 5,
                      color: "#585858",
                    }}
                  >
                    <AiOutlineArrowRight />
                  </div>
                  <div style={{ fontFamily: "NexaBold", color: "#585858" }}>
                    {" "}
                    S : {this.props.data.rate}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 22,
                    marginTop: 10,
                    color:
                      parseFloat(this.props.pf).toFixed(2) < 0 ? SELL : BUY,
                  }}
                >
                  {parseFloat(this.props.pf).toFixed(2)}
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              height: "80px",
              backgroundColor: "#EAF0FE",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              fontFamily: "NexaBold",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#fff",
            }}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div>
                <InputText
                  value={this.state.qty}
                  placeholder="Username"
                  onChange={(e) => {
                    this.setState({
                      qty: e.target.value,
                    });
                  }}
                  style={{ width: "300px" }}
                />
              </div>
            </div>
          </div>
          <div
            style={{
              height: "80px",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              fontFamily: "NexaBold",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#fff",
            }}
          >
            <div
              onClick={() => this.sq_off()}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: Main_Color,
                paddingTop: 15,
                paddingRight: 20,
                paddingLeft: 20,
                paddingBottom: 15,
                borderRadius: 10,
              }}
            >
              <div>SQUARE OFF</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

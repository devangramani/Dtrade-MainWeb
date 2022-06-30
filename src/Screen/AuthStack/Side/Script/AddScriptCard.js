import moment from "moment";
import React, { Component } from "react";
import { CardBack } from "../../../../Color/Color";
import Backend from "../../../../Backend/Backend";
const backend = new Backend();
export default class AddScriptCard extends Component {
  _Add_Script(item) {
    this.setState({ loading: true });
    let data = {
      id: localStorage.getItem("username_id"),
      token: localStorage.getItem("token"),
      server_code: localStorage.getItem("script_id"),
      script_id: item.id,
      main_script_id: item.script_id,
      type: item.script_type,
    };
    backend.add_script(data).then((r) => {
      if (r.error == "False") {
        this.setState({ loading: false });
        this.props.reload();
      } else {
        alert(r.message);
      }
    });
  }

  render() {
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50px",
          borderStyle: "solid",
          borderWidth: 0,
          borderBottomWidth: 1,
          borderBottomColor: CardBack,
        }}
      >
        <div style={{ paddingRight: 20 }}>
          <img
            src={require("../../../../Photo/ArrowsAlt.png")}
            style={{ height: "20px" }}
          />
        </div>
        <div style={{ flex: 2 }}>
          <div style={{ fontFamily: "NexaBold", fontSize: 18 }}>
            {this.props.item.name}
          </div>
          <div style={{ fontFamily: "NexaBold", fontSize: 12, color: "gray" }}>
            Expiry - {moment(this.props.item.expiry_date).format("DD MMM YY")}
          </div>
        </div>
        <div
          onClick={() => this._Add_Script(this.props.item)}
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <img
            src={require("../../../../Photo/Add.png")}
            style={{ height: "25px" }}
          />
        </div>
      </div>
    );
  }
}

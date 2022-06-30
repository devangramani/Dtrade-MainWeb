import moment from "moment";
import React, { Component } from "react";
import { BUY, CardBack, Main_Color } from "../../../Color/Color";

export default class PendingCard extends Component {
  render() {
    const i = this.props.item;
    console.log(i);
    return (
      <div
        style={{
          display: "flex",
          height: "50px",
          borderStyle: "solid",
          borderWidth: 0,
          borderBottomWidth: 1,
          borderBottomColor: CardBack,
          marginTop: 5,
          alignItems: "center",
          overflowY: "scroll",
        }}
      >
        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <div style={{ color: Main_Color }}>{i.symbol_display}</div>
          <div style={{ fontSize: 9, marginLeft: 5, marginTop: 5, flex: 1 }}>
            {moment(i.expiry_date).format("DD MMM YY")}
          </div>
          <div
            style={{
              fontSize: 14,
              backgroundColor: CardBack,
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              borderRadius: 7,
              padding: 2,
              paddingLeft: 10,
              paddingRight: 10,
              color: "#585858",
            }}
          >
            PENDING
          </div>
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              flex: 1,
              justifyContent: "flex-end",
              display: "flex",
              fontSize: 15,
              alignItems: "center",
              color: BUY,
            }}
          >
            {i.buy_sale == 0 ? "BUY" : "SELL"}
            {"(" + i.qty + ")"}
            <div
              style={{
                fontSize: 10,
                paddingLeft: 10,
                marginTop: 5,
                color: "#585858",
              }}
            >
              {moment(i.date_created).format("DD-MM-YYYY | hh:mm:ss")}
            </div>
          </div>
          <div
            style={{
              paddingRight: 10,
              flex: 1,
              justifyContent: "flex-end",
              display: "flex",
            }}
          >
            <div style={{ marginRight: 30 }}>{i.at_price}</div>
            <div
              style={{
                marginRight: 10,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div style={{ flex: 1 }}>
                <img
                  src={require("../../../Photo/Edit.png")}
                  style={{ height: "20px", width: "20px" }}
                />
              </div>
              <div style={{ flex: 1, marginLeft: 20 }}>
                <img
                  src={require("../../../Photo/Close.png")}
                  style={{ height: "20px", width: "20px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

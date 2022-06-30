import React, { Component } from "react";
import { CardBack, Main_Color } from "../../../Color/Color";

export default class NotificationCard extends Component {
  render() {
    return (
      <div
        style={{
          borderStyle: "solid",
          borderWidth: 0,
          borderBottomWidth: 3,
          marginLeft: 15,
          marginRight: 15,
          paddingTop: 10,
          paddingBottom: 10,
          borderBottomColor: CardBack,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          fontFamily: "NexaBold",
        }}
      >
        <div style={{ fontSize: 22, fontWeight: "bold", color: Main_Color }}>
          {this.props.item.heading}
        </div>
        <div style={{ marginTop: 10 }}>{this.props.item.text}</div>
      </div>
    );
  }
}

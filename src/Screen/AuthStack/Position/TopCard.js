import React, { Component } from "react";
import { connect } from "react-redux";
import { BUY, Main_Color, SELL } from "../../../Color/Color";
import "./Position.css";
function TopCard(props) {
  var margin = 0;

  margin = parseFloat(props.balance) + parseFloat(props.total);

  margin = margin * props.multiplier;

  margin = parseFloat(margin) - parseFloat(props.limit);

  console.log(props.total);
  return (
    <div style={{ display: "flex", height: "90px" }}>
      <div
        className="pocard"
        style={{
          flex: 1,
          borderRadius: 10,
          display: "flex",
          flexDirection: "column",
          marginLeft: 10,
          marginRight: 10,
          marginBottom: 10,
        }}
      >
        <div
          style={{
            flex: 1,
            backgroundColor: Main_Color,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            fontFamily: "NexaBold",
          }}
        >
          Live P/L
        </div>
        <div
          style={{
            flex: 1,
            backgroundColor: "#fff",
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "NexaBold",
            color: props.total > 0 ? BUY : SELL,
          }}
        >
          {parseFloat(props.total).toFixed(2)}
        </div>
      </div>
      <div
        className="pocard"
        style={{
          flex: 1,
          borderRadius: 10,
          display: "flex",
          flexDirection: "column",
          marginLeft: 10,
          marginRight: 10,
          marginBottom: 10,
        }}
      >
        <div
          style={{
            flex: 1,
            backgroundColor: Main_Color,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            fontFamily: "NexaBold",
          }}
        >
          Booked P/L
        </div>
        <div
          style={{
            flex: 1,
            backgroundColor: "#fff",
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "NexaBold",
          }}
        >
          {props.booked == 0 || props.booked == null
            ? "0"
            : parseFloat(props.booked).toFixed(2)}
        </div>
      </div>
      <div
        className="pocard"
        style={{
          flex: 1,
          borderRadius: 10,
          display: "flex",
          flexDirection: "column",
          marginLeft: 10,
          marginRight: 10,
          marginBottom: 10,
        }}
      >
        <div
          style={{
            flex: 1,
            backgroundColor: Main_Color,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            fontFamily: "NexaBold",
          }}
        >
          Balance
        </div>
        <div
          style={{
            flex: 1,
            backgroundColor: "#fff",
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "NexaBold",
          }}
        >
          {props.balance == 0 || props.balance == null
            ? "0"
            : parseFloat(props.balance).toFixed(2)}
        </div>
      </div>
      <div
        className="pocard"
        style={{
          flex: 1,
          borderRadius: 10,
          display: "flex",
          flexDirection: "column",
          marginLeft: 10,
          marginRight: 10,
          marginBottom: 10,
        }}
      >
        <div
          style={{
            flex: 1,
            backgroundColor: Main_Color,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            fontFamily: "NexaBold",
          }}
        >
          Margin
        </div>
        <div
          style={{
            flex: 1,
            backgroundColor: "#fff",
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "NexaBold",
          }}
        >
          {parseInt(margin)}
        </div>
      </div>
      <div
        style={{
          flex: 1.5,
          borderRadius: 10,
          display: "flex",
          marginLeft: 10,
          marginRight: 10,
          marginBottom: 10,
          alignItems: "center",
        }}
      >
        {/* <div
          style={{
            flex: 1,
            height: "35px",
            backgroundColor: SELL,
            borderRadius: 7,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            marginRight: 10,
          }}
        >
          Current P/L
        </div> */}
        {/* <div
          style={{
            flex: 1,
            height: "35px",
            backgroundColor: "#585858",
            borderRadius: 7,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
          }}
        >
          Roll Over
        </div> */}
      </div>
    </div>
  );
}

const mapstatetoProps = (state) => {
  return {
    total: state.total,
  };
};
export default connect(mapstatetoProps)(TopCard);

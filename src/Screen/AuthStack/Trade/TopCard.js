import React, { Component } from "react";
import { BUY, CardBack, Main_Color } from "../../../Color/Color";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./TopCard.css";
export default class TopCard extends Component {
  constructor() {
    super();
    this.state = {
      report_type: 1,
      start: new Date(),
      end: new Date(),
    };
  }
  render() {
    return this.props.tab === 3 ? (
      <div
        style={{
          flex: 1,
          display: "flex",
          height: this.state.report_type === 4 ? "80px" : "55px",
        }}
      >
        <div
          className="topcards"
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            height: "40px",
            borderRadius: 10,
            marginTop: 10,
          }}
        >
          <div style={{ color: BUY, fontSize: 22, fontWeight: "bold" }}>
            P/L : 5044550
          </div>
          <div style={{ display: "flex" }}>
            <div
              style={{ color: Main_Color, fontSize: 22, fontWeight: "bold" }}
            >
              COMMISSION :
            </div>
            <div style={{ color: "#585858", fontSize: 22, fontWeight: "bold" }}>
              <span>&nbsp;</span>5044550
            </div>
          </div>
        </div>
        <div
          style={{
            flex: 1,
            justifyContent: "space-around",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              display: "flex",
              height: this.state.report_type === 4 ? "70%" : "100%",
              justifyContent: "space-around",
            }}
          >
            <div
              onClick={() => this.setState({ report_type: 1 })}
              style={{
                backgroundColor:
                  this.state.report_type === 1 ? Main_Color : CardBack,
                height: "80%",
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                paddingLeft: 10,
                paddingRight: 10,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: this.state.report_type === 1 ? "#fff" : Main_Color,
                fontWeight: "bold",
              }}
            >
              Today
            </div>
            <div
              onClick={() => this.setState({ report_type: 2 })}
              style={{
                backgroundColor:
                  this.state.report_type === 2 ? Main_Color : CardBack,
                height: "80%",
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                paddingLeft: 10,
                paddingRight: 10,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: this.state.report_type === 2 ? "#fff" : Main_Color,
                fontWeight: "bold",
              }}
            >
              Weekly
            </div>
            <div
              onClick={() => this.setState({ report_type: 3 })}
              style={{
                backgroundColor:
                  this.state.report_type === 3 ? Main_Color : CardBack,
                height: "80%",
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                paddingLeft: 10,
                paddingRight: 10,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: this.state.report_type === 3 ? "#fff" : Main_Color,
                fontWeight: "bold",
              }}
            >
              Monthly
            </div>
            <div
              onClick={() => this.setState({ report_type: 4 })}
              style={{
                backgroundColor:
                  this.state.report_type === 4 ? Main_Color : CardBack,
                height: "80%",
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                paddingLeft: 10,
                paddingRight: 10,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: this.state.report_type === 4 ? "#fff" : Main_Color,
                fontWeight: "bold",
              }}
            >
              Custom Date
            </div>
          </div>
          {this.state.report_type == 4 ? (
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <div>
                <DatePicker
                  className="inputnew"
                  selected={this.state.start}
                  onChange={(date) => this.setState({ start: date })}
                  dateFormat="dd/MM/yyyy"
                  maxDate={new Date()}
                />
              </div>
              <div style={{ color: "#585858", fontSize: 15 }}> To </div>
              <div>
                <DatePicker
                  className="inputnew"
                  selected={this.state.start}
                  onChange={(date) => this.setState({ end: date })}
                  dateFormat="dd/MM/yyyy"
                  maxDate={new Date()}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    ) : null;
  }
}

import React, { Component } from "react";
import { Main_Color } from "../../../Color/Color";
import TopCard from "./TopCard";
import ExecutedCard from "./ExecutedCard";
import PendingCard from "./PendingCard";
import ReportCard from "./ReportCard";
import "./Trade.css";
import moment from "moment";
import Backend from "../../../Backend/Backend";
const backend = new Backend();
export default class Trade extends Component {
  constructor() {
    super();
    this.state = {
      tab: 1,
      executed: [],
      pending: [],
      report: [],
      start: new Date(),
      end: new Date(),
    };
  }

  componentDidMount() {
    this.load_trade();
  }

  load_trade() {
    let data = {
      token: localStorage.getItem("token"),
      id: localStorage.getItem("username_id"),
      server_code: localStorage.getItem("server_code"),
      start: this.state.start,
      end: this.state.end,
    };
    backend.load_trade(data).then((r) => {
      if (r.error == "False") {
        this.setState({
          executed: r.data,
          pending: r.pending,
          loading: false,
        });
      } else {
        alert(r.message);
      }
    });
  }

  load_custom_trade(a) {
    let data = {
      token: this.state.token,
      id: this.state.username_id,
      server_code: this.state.server_code,
      start:
        a == 1
          ? moment().format("DD-MM-YYYY 00:00:00")
          : a == 2
          ? moment()
              .subtract(1, "weeks")
              .startOf("week")
              .format("DD-MM-YYYY 00:00:00")
          : a == 3
          ? moment().startOf("month").format("DD-MM-YYYY 00:00:00")
          : this.state.start,
      end:
        a == 1
          ? moment().format("DD-MM-YYYY 00:00:00")
          : a == 2
          ? moment().format("DD-MM-YYYY 00:00:00")
          : a == 3
          ? moment().endOf("month").format("DD-MM-YYYY 00:00:00")
          : this.state.end,
    };
    backend.load_trade(data).then((r) => {
      console.log(r);
      if (r.error == "False") {
        this.setState({
          report: r.data,
          loading: false,
        });
      } else {
        alert(r.message);
      }
    });
  }

  render() {
    return (
      <div style={{ padding: 15 }}>
        <div
          style={{
            display: "flex",
            height: "55px",
            alignItems: "center",
          }}
        >
          <div
            onClick={() => this.setState({ tab: 1 })}
            style={{
              padding: 10,
              paddingLeft: 20,
              paddingRight: 20,
              backgroundColor: this.state.tab === 1 ? "#ffffff" : "#707070",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              marginRight: 20,
              marginTop: 10,
              height: "50px",
              color: this.state.tab === 1 ? Main_Color : "#ffffff",
              alignItems: "center",
              justifyContent: "flex-end",
              display: "flex",
            }}
          >
            <div
              style={{
                borderStyle: "solid",
                borderWidth: 0,
                borderBottomWidth: this.state.tab === 1 ? 2 : 0,
                borderBottomColor: Main_Color,
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Executed
            </div>
          </div>
          <div
            onClick={() => this.setState({ tab: 2 })}
            style={{
              padding: 10,
              paddingLeft: 20,
              paddingRight: 20,
              backgroundColor: this.state.tab === 2 ? "#ffffff" : "#707070",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              marginRight: 20,
              marginTop: 10,
              height: "50px",
              color: this.state.tab === 2 ? Main_Color : "#ffffff",
              alignItems: "center",
              justifyContent: "flex-end",
              display: "flex",
            }}
          >
            <div
              style={{
                borderStyle: "solid",
                borderWidth: 0,
                borderBottomWidth: this.state.tab === 2 ? 2 : 0,
                borderBottomColor: Main_Color,
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Pending
            </div>
          </div>
          <div
            onClick={() => this.setState({ tab: 3 })}
            style={{
              padding: 10,
              paddingLeft: 20,
              paddingRight: 20,
              backgroundColor: this.state.tab === 3 ? "#ffffff" : "#707070",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              marginRight: 20,
              marginTop: 10,
              height: "50px",
              color: this.state.tab === 3 ? Main_Color : "#ffffff",
              alignItems: "center",
              justifyContent: "flex-end",
              display: "flex",
            }}
          >
            <div
              style={{
                borderStyle: "solid",
                borderWidth: 0,
                borderBottomWidth: this.state.tab === 3 ? 2 : 0,
                borderBottomColor: Main_Color,
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Report
            </div>
          </div>
        </div>
        <div
          className="cards"
          style={{
            backgroundColor: "#fff",
            height: "78vh",
            marginTop: -10,
            position: "relative",
            borderRadius: 20,
            padding: 10,
            paddingTop: 0,
            overflowY: "scroll",
          }}
        >
          <div
            style={{
              display: "flex",
            }}
          >
            <TopCard tab={this.state.tab} />
          </div>
          {this.state.tab === 1 ? (
            <div
              style={{
                display: "flex",
                height: "100%",
                padding: 10,
                flexDirection: "column",
              }}
            >
              {this.state.executed.map((i, t) => {
                return <ExecutedCard item={i} />;
              })}
            </div>
          ) : null}
          {this.state.tab === 2 ? (
            <div
              style={{
                display: "flex",
                height: "100%",
                padding: 10,
                flexDirection: "column",
              }}
            >
              {this.state.pending.map((i, t) => {
                return <PendingCard item={i} />;
              })}
            </div>
          ) : null}
          {this.state.tab === 3 ? (
            <div
              style={{
                display: "flex",
                height: "100%",
                padding: 10,
                flexDirection: "column",
              }}
            >
              {this.state.report.map((i, t) => {
                return <ReportCard />;
              })}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

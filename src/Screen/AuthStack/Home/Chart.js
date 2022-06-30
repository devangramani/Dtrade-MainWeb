import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  AreaChart,
  Area,
  CartesianGrid,
  Legend,
} from "recharts";
import { CardBack } from "../../../Color/Color";
function Charts() {
  const data = [
    {
      name: "nifty",
      open: 1,
      close: 10,
      fees: 100,
    },
    {
      name: "nifty",
      open: 15,
      close: 16,
      fees: 400,
    },
    {
      name: "nifty",
      open: 5,
      close: 6,
      fees: 800,
    },
    {
      name: "nifty",
      open: 15,
      close: 11,
      fees: 1000,
    },
    {
      name: "nifty",
      open: 1,
      close: 10,
      fees: 100,
    },
    {
      name: "nifty",
      open: 15,
      close: 16,
      fees: 400,
    },
    {
      name: "nifty",
      open: 5,
      close: 6,
      fees: 800,
    },
    {
      name: "nifty",
      open: 15,
      close: 11,
      fees: 1000,
    },
  ];

  return (
    <div style={{ padding: 10 }}>
      <ResponsiveContainer width={"100%"} aspect={3}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray={"3 3"} />
          <XAxis dataKey={"fees"} />
          <Line dataKey={"open"} stroke="red" />
          <Line dataKey={"close"} stroke="green" />

          {/* <Area dataKey={"fees"} stroke="green" />
          <Area dataKey={"student"} stroke="red" />

          <Area dataKey={"fees"} stroke="green" />
          <Area dataKey={"student"} stroke="red" />

          <Area dataKey={"fees"} stroke="green" /> */}
          <YAxis dataKey={"open"} />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
      <div>
        <div
          style={{
            height: "40px",
            borderRadius: 10,
            backgroundColor: CardBack,
            display: "flex",
            flex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <div
                style={{
                  borderWidth: 0,
                  borderStyle: "solid",
                  borderBottomWidth: 3,

                  borderRadius: 2,
                }}
              >
                1M
              </div>
            </div>
            <div
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              15M
            </div>
            <div
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              20M
            </div>
            <div
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              30
            </div>
            <div
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              1H
            </div>
            <div
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              2H
            </div>
            <div
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              4H
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flex: 2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontSize: 13,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                fontWeight: "bold",
              }}
            >
              OPEM : 12000
            </div>
            <div
              style={{
                fontSize: 12,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                fontWeight: "bold",
              }}
            >
              Pre.Close : 122215.20
            </div>
            <div
              style={{
                fontSize: 13,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                fontWeight: "bold",
              }}
            >
              High : 122225.25
            </div>
            <div
              style={{
                fontSize: 13,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                fontWeight: "bold",
              }}
            >
              Low : 11002.02
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Charts;

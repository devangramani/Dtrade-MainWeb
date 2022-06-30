import React, { useEffect, useState } from "react";
import { Main_Color } from "../../../Color/Color";
import { useAlert } from "react-alert";
import Backend from "../../../Backend/Backend";
import axios from "axios";
import ReactLoading from "react-loading";
import "./Login.css";
const backend = new Backend();

const Login = () => {
  const [UserName, setUserName] = useState("");
  const [PassWord, setPassWord] = useState("");
  const [ip, setIP] = useState("");
  const [loading, setLoading] = useState(false);

  const alert = useAlert();

  useEffect(() => {
    //passing getData method to the lifecycle method
    getData();
  }, []);

  const getData = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    setIP(res.data.IPv4);
  };

  const login = () => {
    if (UserName == "") {
      alert.error("Invalid Username");
    } else if (PassWord == "") {
      alert.error("Invalid Password");
    } else {
      setLoading(true);
      let data = {
        UserName: UserName,
        PassWord: PassWord,
        server_code: "00001",
        ip: ip,
      };
      backend.login(data).then((r) => {
        setLoading(false);
        if (r.error == "False") {
          localStorage.setItem("username", r.data.username);
          localStorage.setItem("username_id", JSON.stringify(r.data.id));
          localStorage.setItem("username_data", JSON.stringify(r.data));
          localStorage.setItem("token", r.token);
          localStorage.setItem("server_code", r.data.server_code);
          localStorage.setItem("isLogged", "1");
          window.location = "/";
        } else {
          alert.error(r.message);
          setLoading(false);
        }
      });
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(to right, #1b64ee, #2068f0,#1c65ef)",
        height: "100vh",
        display: "flex",
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
        <div style={{ flex: 1 }}></div>
        <div style={{ flex: 2 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                marginBottom: 50,
              }}
            >
              <img
                src={require("../../../Photo/Logo1.png")}
                style={{ height: "75px", width: "75px" }}
              />
            </div>
            <div>
              <input
                value={UserName}
                onChange={(a) => setUserName(a.target.value)}
                placeholder="USERNAME"
                style={{
                  backgroundColor: "transparent",
                  borderStyle: "solid",
                  borderWidth: 0,
                  borderBottomWidth: 1,
                  borderBottomColor: "#fff",
                  width: "100%",
                  height: "55px",
                  color: "#fff",
                  paddingLeft: 40,
                  fontSize: 18,
                }}
              />
            </div>
            <div>
              <input
                value={PassWord}
                onChange={(a) => setPassWord(a.target.value)}
                placeholder="PASSWORD"
                type={"password"}
                style={{
                  backgroundColor: "transparent",
                  borderStyle: "solid",
                  borderWidth: 0,
                  borderBottomWidth: 1,
                  borderBottomColor: "#fff",
                  width: "100%",
                  height: "55px",
                  paddingLeft: 40,
                  color: "#fff",
                  fontSize: 18,
                }}
              />
            </div>

            {loading == true ? (
              <div
                style={{
                  display: "flex",
                  height: "50px",
                  width: "300px",
                  backgroundColor: "#ffffff",
                  borderRadius: 10,
                  justifyContent: "space-around",
                  alignItems: "center",
                  marginTop: "55px",
                }}
              >
                <ReactLoading
                  type={"bars"}
                  color={Main_Color}
                  height={45}
                  width={45}
                />
              </div>
            ) : (
              <div
                onClick={() => login()}
                style={{
                  display: "flex",
                  height: "50px",
                  width: "300px",
                  backgroundColor: "#ffffff",
                  borderRadius: 10,
                  justifyContent: "space-around",
                  alignItems: "center",
                  marginTop: "55px",
                }}
              >
                <div style={{ fontWeight: "bold", color: Main_Color }}>
                  LOGIN
                </div>
                <div>
                  <img
                    src={require("../../../Photo/BlueColor.png")}
                    style={{ height: "21px" }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <div style={{ flex: 1 }}></div>
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={require("../../../Photo/Profile.png")}
          style={{ height: "70%" }}
        />
      </div>
    </div>
  );
};

export default Login;

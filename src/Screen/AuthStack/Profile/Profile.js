import moment from "moment";
import React, { Component } from "react";
import { BUY, CardBack, Main_Color } from "../../../Color/Color";
import ReactLoading from "react-loading";
import SoundOn from "../../../Photo/sound.png";
import SoundOff from "../../../Photo/Soundoff.png";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userdata: JSON.parse(localStorage.getItem("username_data")),
      loading: false,
      sound: localStorage.getItem("sound"),
    };
  }

  componentDidMount() {
    this.Check_data();
  }
  Check_data() {
    if (this.state.userdata == "") {
      this.setState({
        loading: true,
      });
    } else {
      this.setState({
        loading: false,
      });
    }
  }
  logout() {
    localStorage.clear();
    window.location = "/";
  }

  sound() {
    let sound = this.state.sound == false ? 0 : 1;
    localStorage.setItem("sound", JSON.stringify(sound));
  }

  render() {
    return (
      <div>
        <div style={{ padding: 20 }}>
          {this.state.loading ? (
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
          ) : (
            <div
              className="cards"
              style={{
                height: "80vh",
                backgroundColor: "#fff",
                borderRadius: 10,
                fontFamily: "NexaBold",
              }}
            >
              <div
                style={{
                  height: "80px",
                  backgroundColor: Main_Color,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
                  <div style={{ paddingLeft: 30 }}>
                    <div
                      style={{
                        fontSize: 20,
                        color: "#fff",
                        fontWeight: "bold",
                      }}
                    >
                      {this.state.userdata.name}
                    </div>
                    <div
                      style={{
                        fontSize: 10,
                        color: "#fff",
                        fontWeight: "bold",
                        marginTop: 5,
                      }}
                    >
                      USERNAME : {this.state.userdata.username}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <div style={{ fontSize: 20 }}></div>
                  <div
                    onClick={() => this.logout()}
                    style={{
                      fontSize: 20,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={require("../../../Photo/Logout.png")}
                      style={{ height: "65px" }}
                    />
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", flex: 1, height: "85%" }}>
                <div
                  style={{
                    flex: 3,
                    display: "flex",
                    flexDirection: "column",
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
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        className="cards"
                        style={{
                          height: "70px",
                          width: "200px",
                          borderRadius: 10,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                          backgroundColor: CardBack,
                        }}
                      >
                        <div
                          style={{
                            marginTop: -30,
                            height: "40px",
                            backgroundColor: Main_Color,
                            marginLeft: 20,
                            marginRight: 20,
                            borderRadius: 10,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "75%",
                            color: "#fff",
                            fontSize: 15,
                          }}
                        >
                          Current Balance
                        </div>
                        <div
                          style={{
                            marginTop: 10,
                            fontSize: 23,
                            color: "#585858",
                          }}
                        >
                          {parseFloat(
                            this.state.userdata.deposit_current
                          ).toFixed(2)}
                        </div>
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        className="cards"
                        style={{
                          height: "70px",
                          width: "200px",
                          borderRadius: 10,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                          backgroundColor: CardBack,
                        }}
                      >
                        <div
                          style={{
                            marginTop: -30,
                            height: "40px",
                            backgroundColor: Main_Color,
                            marginLeft: 20,
                            marginRight: 20,
                            borderRadius: 10,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "75%",
                            color: "#fff",
                            fontSize: 15,
                          }}
                        >
                          Weekly P/L
                        </div>
                        <div
                          style={{
                            marginTop: 10,
                            fontSize: 23,
                            color: BUY,
                          }}
                        >
                          {parseFloat(
                            this.state.userdata.deposit_current
                          ).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      flex: 1.5,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                      paddingLeft: 50,
                      paddingRight: 50,
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      <div
                        style={{
                          flex: 1,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div
                          className="cards"
                          style={{
                            height: "40px",
                            width: "200px",
                            backgroundColor: CardBack,
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            paddingLeft: 10,
                            borderRadius: 6,
                            color: Main_Color,
                            fontWeight: "bold",
                          }}
                        >
                          Start Date
                        </div>
                      </div>
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
                            height: "40px",
                            width: "200px",
                            backgroundColor: "#fff",
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            paddingLeft: 10,
                            borderStyle: "solid",
                            borderWidth: 0,
                            borderBottomWidth: 3,
                            borderBottomColor: CardBack,
                            fontWeight: "bold",
                          }}
                        >
                          {moment(this.state.userdata.date_created).format(
                            "DD-MM-yyyy"
                          )}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div
                        style={{
                          flex: 1,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div
                          className="cards"
                          style={{
                            height: "40px",
                            width: "200px",
                            backgroundColor: CardBack,
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            paddingLeft: 10,
                            borderRadius: 6,
                            color: Main_Color,
                            fontWeight: "bold",
                          }}
                        >
                          Total Deposit
                        </div>
                      </div>
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
                            height: "40px",
                            width: "200px",
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            paddingLeft: 10,
                            fontWeight: "bold",
                            borderStyle: "solid",
                            borderWidth: 0,
                            borderBottomWidth: 3,
                            borderBottomColor: CardBack,
                          }}
                        >
                          {this.state.userdata.deposit_current == undefined
                            ? null
                            : JSON.parse(
                                this.state.userdata.deposit_total
                              ).toFixed(2)}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div
                        style={{
                          flex: 1,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div
                          className="cards"
                          style={{
                            height: "40px",
                            width: "200px",
                            backgroundColor: CardBack,
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            paddingLeft: 10,
                            borderRadius: 6,
                            color: Main_Color,
                            fontWeight: "bold",
                          }}
                        >
                          Current Deposit
                        </div>
                      </div>
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
                            height: "40px",
                            width: "200px",
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            paddingLeft: 10,
                            fontWeight: "bold",
                            borderStyle: "solid",
                            borderWidth: 0,
                            borderBottomWidth: 3,
                            borderBottomColor: CardBack,
                          }}
                        >
                          {this.state.userdata.deposit_current == undefined
                            ? null
                            : JSON.parse(
                                this.state.userdata.deposit_current
                              ).toFixed(2)}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div
                        style={{
                          flex: 1,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div
                          className="cards"
                          style={{
                            height: "40px",
                            width: "200px",
                            backgroundColor: CardBack,
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            paddingLeft: 10,
                            borderRadius: 6,
                            color: Main_Color,
                            fontWeight: "bold",
                          }}
                        >
                          Limit Multiplier
                        </div>
                      </div>
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
                            height: "40px",
                            width: "200px",
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            paddingLeft: 10,
                            fontWeight: "bold",
                            borderStyle: "solid",
                            borderWidth: 0,
                            borderBottomWidth: 3,
                            borderBottomColor: CardBack,
                          }}
                        >
                          100
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <img
                      src={require("../../../Photo/Settlement.png")}
                      style={{ height: "80px", width: "90px" }}
                    />
                  </div>
                  <div>
                    <img
                      src={require("../../../Photo/ChnagePassword.png")}
                      style={{ height: "90px", width: "90px" }}
                    />
                  </div>
                  <div
                    onClick={() =>
                      this.setState({ sound: !this.state.sound }, () =>
                        this.sound()
                      )
                    }
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    {this.state.sound == true ? (
                      <>
                        <img
                          src={SoundOn}
                          style={{ height: "85px", width: "90px" }}
                        />
                      </>
                    ) : (
                      <>
                        <img
                          src={SoundOff}
                          style={{ height: "60px", width: "60px" }}
                        />
                        <div
                          style={{
                            color: Main_Color,
                            fontSize: 12,
                            marginTop: 5,
                          }}
                        >
                          Sound Off
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Profile;

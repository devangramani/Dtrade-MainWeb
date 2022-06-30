import React, { Component } from "react";
import { CardBack, Main_Color, SELL, UnSelected } from "../../../Color/Color";
import { InputText } from "primereact/inputtext";
import { FiSearch } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import ScriptCard from "./ScriptCard";
import ReactLoading from "react-loading";
import Backend from "../../../Backend/Backend";
import AddScript from "./Script/AddScript";
import "./Side.css";

const backend = new Backend();

export default class Side extends Component {
  constructor() {
    super();
    this.state = {
      selected: 1,
      scriptdata: [],
      fut_data: [],
      fo_data: [],
      mcx_data: [],
      arrayholder_fut: [],
      arrayholder_fo: [],
      arrayholder_mcx: [],
      search: "",
      add_script: false,
      loading: false,
      delete: false,
    };
  }

  componentDidMount() {
    this.load_watchlist();
  }

  load_watchlist() {
    this.setState({ loading: true });
    let data = {
      token: localStorage.getItem("token"),
      id: localStorage.getItem("username_id"),
      server_code: localStorage.getItem("server_code"),
    };
    backend.load_watchlist(data).then((r) => {
      if (r.error == "False") {
        this.setState({
          fut_data: r.fut,
          arrayholder_fut: r.fut,
          fo_data: r.fo,
          arrayholder_fo: r.fo,
          mcx_data: r.mcx,
          arrayholder_mcx: r.mcx,
          loading: false,
        });
      } else if (r.message == "Invalid User Token") {
        this.logout();
      } else {
        alert(r.message);
      }
    });
  }

  logout() {
    localStorage.clear();
    window.location = "/";
  }

  search(text) {
    if (this.state.selected == 1) {
      if (text.length == 0) {
        this.setState({ fut_data: this.state.arrayholder_fut });
      } else {
        var data = [];
        data = this.state.arrayholder_fut.filter((x) =>
          x.name.toLowerCase().includes(text.toLowerCase())
        );
        this.setState({ fut_data: data });
      }
    } else if (this.state.selected == 2) {
      if (text.length == 0) {
        this.setState({ fo_data: this.state.arrayholder_fo });
      } else {
        var data = [];
        data = this.state.arrayholder_fo.filter((x) =>
          x.name.toLowerCase().includes(text.toLowerCase())
        );
        this.setState({ fo_data: data });
      }
    } else if (this.state.selected == 3) {
      if (text.length == 0) {
        this.setState({ mcx_data: this.state.arrayholder_mcx });
      } else {
        var data = [];
        data = this.state.arrayholder_mcx.filter((x) =>
          x.name.toLowerCase().includes(text.toLowerCase())
        );
        this.setState({ mcx_data: data });
      }
    }
  }

  render() {
    var data =
      this.state.selected == 1
        ? this.state.fut_data
        : this.state.selected == 2
        ? this.state.fo_data
        : this.state.selected == 3
        ? this.state.mcx_data
        : null;
    return (
      <div>
        <div>
          {this.state.add_script == true ? (
            <AddScript
              closeScript={() => {
                this.setState({ add_script: false });
                this.load_watchlist();
              }}
            />
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  padding: 10,
                }}
              >
                <div
                  onClick={() =>
                    this.setState({ selected: 1 }, () => this.load_watchlist())
                  }
                  style={{
                    backgroundColor:
                      this.state.selected === 1 ? UnSelected : CardBack,
                    height: "30px",
                    paddingLeft: 10,
                    paddingRight: 10,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontFamily: "NexaBold",
                    borderRadius: 7,
                    color: this.state.selected === 1 ? "#fff" : UnSelected,
                  }}
                >
                  NSE FUT
                </div>
                <div
                  onClick={() =>
                    this.setState({ selected: 2 }, () => this.load_watchlist())
                  }
                  style={{
                    backgroundColor:
                      this.state.selected === 2 ? UnSelected : CardBack,
                    height: "30px",
                    paddingLeft: 10,
                    paddingRight: 10,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontFamily: "NexaBold",
                    borderRadius: 7,
                    color: this.state.selected === 2 ? "#fff" : UnSelected,
                  }}
                >
                  NSE OPT
                </div>
                <div
                  onClick={() => {
                    this.setState({ selected: 3 }, () => this.load_watchlist());
                  }}
                  style={{
                    backgroundColor:
                      this.state.selected === 3 ? UnSelected : CardBack,
                    height: "30px",
                    paddingLeft: 10,
                    paddingRight: 10,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontFamily: "NexaBold",
                    borderRadius: 7,
                    color: this.state.selected === 3 ? "#fff" : UnSelected,
                  }}
                >
                  MCX
                </div>
              </div>
              <div
                style={{
                  height: "55px",
                  paddingBottom: 0,
                  marginLeft: 25,
                  marginRight: 25,
                  borderStyle: "solid",
                  borderWidth: 0,
                  borderBottomWidth: 2,
                  borderBottomColor: Main_Color,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "end",
                }}
              >
                {this.state.search.length > 0 ? (
                  <div
                    onClick={() => {
                      this.setState({ search: "" });
                      this.load_watchlist();
                    }}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <AiOutlineClose
                      style={{
                        fontSize: 30,
                        paddingBottom: 10,
                        color: Main_Color,
                      }}
                    />
                  </div>
                ) : (
                  <div
                    onClick={() => this.load_watchlist()}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <FiSearch
                      style={{
                        fontSize: 30,
                        paddingBottom: 10,
                        color: Main_Color,
                      }}
                    />
                  </div>
                )}

                <InputText
                  className="search"
                  id="search"
                  placeholder="Search script..."
                  style={{
                    width: "85%",
                    height: "35px",
                    borderRadius: 0,
                    borderStyle: "solid",
                    borderWidth: 0,
                    fontFamily: "NexaBold",
                  }}
                  value={this.state.search}
                  onChange={(e) => {
                    this.setState({ search: e.target.value });
                    this.search(e.target.value);
                  }}
                />

                <div
                  onClick={() => this.setState({ add_script: true })}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 8,
                  }}
                >
                  <img
                    src={require("../../../Photo/Add.png")}
                    style={{ height: "22px", width: "22px" }}
                  />
                </div>
                <div
                  onClick={() => this.setState({ delete: !this.state.delete })}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 8,
                  }}
                >
                  <MdDelete
                    style={{ height: "22px", width: "22px", color: SELL }}
                  />
                </div>
              </div>
              <div
                style={{
                  height: "74vh",
                  marginLeft: 20,
                  marginRight: 20,
                  overflowY: "scroll",
                }}
              >
                {this.state.loading == true ? (
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
                ) : data == undefined || data == [] || data.length == 0 ? (
                  <div
                    style={{
                      display: "flex",
                      backgroundColor: "#ffffff",
                      borderRadius: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      flexDirection: "column",
                    }}
                  >
                    <div style={{ fontFamily: "NexaBold" }}>NO DATA FOUND</div>
                    <div
                      onClick={() => this.load_watchlist()}
                      style={{
                        fontFamily: "NexaBold",
                        marginTop: 10,
                        height: "40px",
                        width: "100px",
                        borderRadius: 10,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: Main_Color,
                        color: "#ffffff",
                      }}
                    >
                      RELOAD
                    </div>
                  </div>
                ) : (
                  data.map((i, t) => {
                    return (
                      <ScriptCard
                        item={i}
                        delete={this.state.delete}
                        reload={() => this.load_watchlist()}
                      />
                    );
                  })
                )}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

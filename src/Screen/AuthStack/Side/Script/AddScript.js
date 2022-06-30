import React, { Component } from "react";
import { CardBack, Main_Color, UnSelected } from "../../../../Color/Color";
import { InputText } from "primereact/inputtext";
import { FiSearch } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import Backend from "../../../../Backend/Backend";
import AddScriptCard from "./AddScriptCard";
import ReactLoading from "react-loading";
const backend = new Backend();
export default class AddScript extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 1,
      scriptdata: [],
      search: "",
      loading: false,
      arryFilter_fut: [],
      arryFilter_mcx: [],
      arryFilter_fo: [],
      arryFilter_forex: [],
      fut: [],
      fo: [],
      mcx: [],
      forex: [],
    };
  }

  componentDidMount() {
    this.load_script();
  }

  load_script() {
    this.setState({ loading: true });
    let data = {
      token: localStorage.getItem("token"),
      id: localStorage.getItem("username_id"),
      server_code: localStorage.getItem("server_code"),
    };
    backend.load_script(data).then((r) => {
      if (r.error == "False") {
        this.setState({
          fut: r.fut,
          fo: r.fo,
          mcx: r.mcx,
          forex: r.forex,
          arryFilter_fut: r.fut,
          arryFilter_mcx: r.mcx,
          arryFilter_fo: r.fo,
          arryFilter_forex: r.forex,
          search: "",
          loading: false,
        });
      } else {
        alert(r.message);
      }
    });
  }

  _Search_script(text) {
    if (text.length == 0) {
      if (this.state.selected == 1) {
        this.setState({ script: this.state.arryFilter_fut });
      } else if (this.state.selected == 2) {
        this.setState({ script: this.state.arryFilter_fo });
      } else if (this.state.selected == 3) {
        this.setState({ script: this.state.arryFilter_mcx });
      } else {
      }
    } else {
      var data = [];

      if (this.state.selected == 1) {
        data = this.state.arryFilter_fut.filter((x) =>
          x.name.toLowerCase().includes(text.toLowerCase())
        );
      } else if (this.state.selected == 2) {
        data = this.state.arryFilter_fo.filter((x) =>
          x.name.toLowerCase().includes(text.toLowerCase())
        );
      } else if (this.state.selected == 3) {
        data = this.state.arryFilter_mcx.filter((x) =>
          x.name.toLowerCase().includes(text.toLowerCase())
        );
      } else {
      }
      if (this.state.selected == 1) {
        this.setState({ fut: data });
      } else if (this.state.selected == 2) {
        this.setState({ fo: data });
      } else if (this.state.selected == 3) {
        this.setState({ mcx: data });
      } else {
      }
    }
  }

  render() {
    var data =
      this.state.selected == 1
        ? this.state.fut
        : this.state.selected == 2
        ? this.state.fo
        : this.state.selected == 3
        ? this.state.mcx
        : null;
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            padding: 10,
          }}
        >
          <div
            onClick={() => this.setState({ selected: 1 })}
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
            onClick={() => this.setState({ selected: 2 })}
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
            onClick={() => this.setState({ selected: 3 })}
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
        <div>
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
                this._Search_script(e.target.value);
              }}
            />
            <div
              onClick={() => this.props.closeScript()}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
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
            </div>
          </div>
          <div
            style={{
              marginLeft: 25,
              marginRight: 25,
              height: "73vh",
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
            ) : data == undefined || data == [] ? (
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
                  <AddScriptCard
                    item={i}
                    reload={() => this.load_script()}
                    update={(a) =>
                      this.setState({
                        selected: a,
                      })
                    }
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    );
  }
}

import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import { BUY, CardBack, Main_Color, SELL } from "../../../Color/Color";
import { AiOutlineArrowRight } from "react-icons/ai";
import SocketContext from "../SocketContext";
import Modal from "react-modal";
import "./Position.css";
import SqOffCard from "./SqOffCard";
function PositionCard(props) {
  const socket = useContext(SocketContext);
  const [ask, setask] = useState(0);
  const [bid, setbid] = useState(0);
  const [pf, setpf] = useState(0);

  const [modalIsOpen, setIsOpen] = React.useState(false);

  const sockettrade = (msg) => {
    if (bid !== msg.Bid) {
      setbid(msg.Bid);
      if (props.item.buy_sale == 0) {
        let Profitloss = 0;
        if (msg.Bid > 0) {
          Profitloss =
            parseFloat(parseFloat(msg.Bid) - parseFloat(props.item.rate)) *
            parseFloat(props.item.qty);
        } else {
          Profitloss = 0;
        }
        if (Profitloss == 0) {
        } else {
          if (props.item.fut_mcx == 1 || props.item.fut_mcx == 2) {
            Profitloss =
              Profitloss -
              ((props.item.brokerage * props.item.qty) / props.item.lot_size) *
                2;
          } else {
            if (msg.Bid > 0) {
              Profitloss =
                parseFloat(Profitloss) -
                parseFloat(
                  (props.item.brokerage * props.item.qty * msg.Bid) / 100
                ) -
                parseFloat(
                  (props.item.brokerage * props.item.qty * props.item.rate) /
                    100
                );
            } else {
              Profitloss =
                parseFloat(Profitloss) -
                parseFloat(
                  (props.item.brokerage * props.item.qty * msg.LTP) / 100
                ) -
                parseFloat(
                  (props.item.brokerage * props.item.qty * props.item.rate) /
                    100
                );
            }
          }
        }
        setpf(Profitloss);
      }
    }
    if (ask !== msg.Ask) {
      setask(msg.Ask);
      if (props.item.buy_sale == 1) {
        let Profitloss2 = 0;
        if (parseFloat(msg.Ask) > 0) {
          Profitloss2 = (props.item.rate - msg.Ask) * props.item.qty;
        } else {
          Profitloss2 = 0;
        }

        if (Profitloss2 == 0) {
        } else {
          if (props.item.fut_mcx == 1 || props.item.fut_mcx == 2) {
            Profitloss2 =
              Profitloss2 -
              ((props.item.brokerage * props.item.qty) / props.item.lot_size) *
                2;
          } else {
            if (msg.Ask > 0) {
              Profitloss2 =
                parseFloat(Profitloss2) -
                parseFloat(
                  (props.item.brokerage * props.item.qty * msg.Ask) / 100
                ) -
                parseFloat(
                  (props.item.brokerage * props.item.qty * props.item.rate) /
                    100
                );
            } else {
              Profitloss2 =
                parseFloat(Profitloss2) -
                parseFloat(
                  (props.item.brokerage * props.item.qty * msg.LTP) / 100
                ) -
                parseFloat(
                  (props.item.brokerage * props.item.qty * props.item.rate) /
                    100
                );
            }
          }
        }

        setpf(Profitloss2);
      }
    }
  };
  const socketbidask = (msg) => {
    if (bid !== msg.Bid) {
      setbid(msg.Bid);
      if (props.item.buy_sale == 0) {
        let Profitloss3 = 0;
        Profitloss3 = (msg.Bid - props.item.rate) * props.item.qty;
        if (props.item.fut_mcx == 1 || props.item.fut_mcx == 2) {
          Profitloss3 =
            Profitloss3 -
            ((props.item.brokerage * props.item.qty) / props.item.lot_size) * 2;
        } else {
          Profitloss3 =
            parseFloat(Profitloss3) -
            parseFloat(
              (props.item.brokerage * props.item.qty * msg.Bid) / 100
            ) -
            parseFloat(
              (props.item.brokerage * props.item.qty * props.item.rate) / 100
            );
        }
        setpf(Profitloss3);
      }
    }
    if (ask !== msg.Ask) {
      setask(msg.Ask);
      if (props.item.buy_sale == 1) {
        let Profitloss4 = 0;
        Profitloss4 = (props.item.rate - msg.Ask) * props.item.qty;
        if (props.item.fut_mcx == 1 || props.item.fut_mcx == 2) {
          Profitloss4 =
            Profitloss4 -
            ((props.item.brokerage * props.item.qty) / props.item.lot_size) * 2;
        } else {
          Profitloss4 =
            parseFloat(Profitloss4) -
            parseFloat(
              (props.item.brokerage * props.item.qty * msg.Ask) / 100
            ) -
            parseFloat(
              (props.item.brokerage * props.item.qty * props.item.rate) / 100
            );
        }
        setpf(Profitloss4);
      }
    }
  };

  useEffect(() => {
    socket.emit("giverate", props.item.script_id);

    socket.on("trade" + props.item.script_id, sockettrade);

    socket.on("bidask" + props.item.script_id, socketbidask);

    return () => {
      socket.off("trade" + props.item.script_id, sockettrade);

      socket.off("bidask" + props.item.script_id, socketbidask);
    };
  }, []);

  props.calc_pf(props.item.id, pf, props.total);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  function closeModal_SqOff() {
    props.reload();
    setIsOpen(false);
  }

  const i = props.item;
  return (
    <div
      key={i.id}
      style={{
        display: "flex",
        height: "40px",
        alignItems: "center",
        borderStyle: "solid",
        marginLeft: 20,
        marginRight: 20,
        borderWidth: 0,
        borderBottomWidth: 2,
        borderBottomColor: CardBack,
        justifyContent: "center",
      }}
    >
      <div
        style={{
          flex: 2,
          paddingLeft: 20,
          color: Main_Color,
          display: "flex",
          alignItems: "center",
          fontFamily: "NexaBold",
        }}
      >
        {i.symbol}
      </div>
      <div
        style={{
          flex: 2,
          color: BUY,
          display: "flex",
          alignItems: "center",
          fontFamily: "NexaBold",
          color: i.buy_sale == 0 ? BUY : SELL,
        }}
      >
        {i.buy_sale == 0 ? `BUY (${i.qty})` : `SELL(${i.qty})`}
      </div>
      <div
        style={{
          flex: 2,
          color: "#585858",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{ fontFamily: "NexaBold" }}>
          C :{" "}
          {props.item.buy_sale == 0
            ? parseFloat(bid).toFixed(2)
            : parseFloat(ask).toFixed(2)}
        </div>
        <div style={{ paddingLeft: 5, paddingRight: 5 }}>
          <AiOutlineArrowRight />
        </div>
        <div style={{ fontFamily: "NexaBold" }}> S : {props.item.rate}</div>
      </div>
      <div
        style={{
          flex: 1,
          color: parseFloat(pf).toFixed(2) < 0 ? SELL : BUY,
          display: "flex",
          alignItems: "center",
          fontFamily: "NexaBold",
        }}
      >
        {parseFloat(pf).toFixed(2)}
      </div>
      <div
        onClick={openModal}
        style={{
          flex: 0.6,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          fontFamily: "NexaBold",
          backgroundColor: SELL,
          height: "80%",
          paddingLeft: 5,
          paddingRight: 5,
          borderRadius: 10,
          justifyContent: "center",
        }}
      >
        SQ OFF
      </div>
      <Modal className="modal" isOpen={modalIsOpen} onRequestClose={closeModal}>
        <SqOffCard
          closeModal={() => closeModal_SqOff()}
          data={props.item}
          ask={ask}
          bid={bid}
          pf={pf}
        />
      </Modal>
    </div>
  );
}

const MapStateToDispatch = (dispatch) => {
  return {
    calc_pf: (r, h, total) => {
      dispatch({ type: "PF", script_id: r, pf: h, total: total });
    },
  };
};

export default connect(null, MapStateToDispatch)(PositionCard);

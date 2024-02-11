import { useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import Confetti from "react-confetti";

import style from "./style.module.scss";

const WheelofFoutune = ({
  fontFamily = "",
  items = [],
  itemColors = [],
  onHide = () => {},
  onWinner = () => {},
  primaryColor = "",
  secondaryColor = "",
  showConfettiOnWin = false,
  spinButtonTitle = "Spin",
  spinDelay = 2000,
  wheelSliceSpacing = "",
  wheelBorderSize = "",
  winners = [],
}) => {
  const winnersList = useRef(winners);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSpinEnabled, enableSpin] = useState(true);
  const [spinsLeft, setSpinsLeft] = useState(winners.length);
  const wheelVars = {
    "--wheel-font": fontFamily || `"Lato", "Quicksand", sans-serif`,
    "--wheel-size": "40rem",
    "--wheel-slice-spacing": wheelSliceSpacing || "20px",
    "--wheel-border-size": wheelBorderSize || "15px",
    "--PI": "3.14159265358979",
    "--item-nb": 0,
    "--nb-turn": 5,
    "--nb-item": items.length,
    "--selected-item": selectedItem,
    "--spinning-duration": `${spinDelay}ms`,
    "--reset-duration": `${selectedItem === null ? "0s" : "0.25s"}`,
    "--primary-color": `${primaryColor || "black"}`,
    "--secondary-color": `${secondaryColor || "white"}`,
  };

  const handleSpin = () => {
    if (!isSpinEnabled || spinsLeft <= 0) return;
    enableSpin(false);
    let winner = winnersList.current.shift();
    if (!winner) return;
    onWinner(items[winner]);
    setSelectedItem(winner);
    setTimeout(() => setShowSuccessModal(true), spinDelay + 500);
  };

  const handleModalAction = () => {
    enableSpin(true);
    setSpinsLeft(spinsLeft - 1);
    setSelectedItem(null);
    setShowSuccessModal(false);
    onHide();
  };

  return (
    <>
      <section className={style["spin-wheel-section"]} style={wheelVars}>
        {
          <h4 className={style["spins-left"]}>
            Spins left : <span>{spinsLeft}</span>
          </h4>
        }
        {spinsLeft <= 0 && (
          <div className={style["blur"]}>
            <h4>You have no spins left!</h4>
          </div>
        )}
        <div className={style["wheel-container"]}>
          <div
            className={`${style["wheel"]} ${
              selectedItem !== null ? style["spinning"] : ""
            }`.trim()}
          >
            {items.map((item, index) => (
              <div
                className={style["wheel-item"]}
                key={index}
                style={{
                  "--item-nb": index,
                  "--item-bg-color": itemColors[index % itemColors.length],
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <button
          className={style["theme-btn"]}
          onClick={handleSpin}
          disabled={!isSpinEnabled}
        >
          {spinButtonTitle}
        </button>
      </section>
      {showConfettiOnWin && showSuccessModal && <Confetti></Confetti>}
      <Modal
        show={showSuccessModal}
        contentClassName={`${style["spin-modal"]}`}
        centered
      >
        <Modal.Header className={style["spin-modal-header"]}>
          Congratulations
        </Modal.Header>
        <Modal.Body className={style["spin-modal-body"]}>
          <h3>{`Prize: ${items[selectedItem]}`}</h3>
          <div className={style["button-block"]}>
            <button onClick={handleModalAction}>Ok</button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default WheelofFoutune;

import { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import Confetti from "react-confetti";

import style from "./style.module.scss";

const WheelComponent = ({
  segments,
  segColors,
  winningSegment,
  onFinished,
  primaryColor = "black",
  contrastColor = "white",
  buttonText = "Spin",
  isOnlyOnce,
  upDuration = 300,
  downDuration = 3000,
  fontFamily = "proxima-nova",
  onHide = () => {},
  ...props
}) => {
  const canvasContainerRef = useRef();
  const canvasRef = useRef();
  const coords = useRef({});
  const [isFinished, setFinished] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  let maxSpeed = Math.PI / `${segments.length}`;
  const upTime = segments.length * upDuration;
  const downTime = segments.length * downDuration;
  const timerDelay = segments.length;
  let currentSegment = "";
  let timerHandle = 0;
  let angleCurrent = 0;
  let angleDelta = 0;
  let spinStart = 0;
  let frames = 0;

  useEffect(() => {
    wheelInit();
    setTimeout(() => {
      window.scrollTo(0, 1);
    }, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const wheelInit = () => {
    initCanvas();
    wheelDraw();
  };

  const initCanvas = () => {
    let canvas = document.getElementById("canvas");
    let canvasWidth = canvasContainerRef.current.scrollWidth;
    let canvasHeight = canvasContainerRef.current.scrollHeight;
    let minLength = canvasWidth < canvasHeight ? canvasWidth : canvasHeight;
    canvasRef.current.setAttribute("width", canvasWidth);
    canvasRef.current.setAttribute("height", canvasHeight);

    if (navigator.userAgent.indexOf("MSIE") !== -1) {
      canvas = document.createElement("canvas");
      canvas.setAttribute("id", "canvas");
      document.getElementById("wheel").appendChild(canvas);
    }
    // canvas.addEventListener("click", spin, false);
    coords.current.centerX = canvas.width / 2;
    coords.current.centerY = canvas.height / 2;
    coords.current.outerCircleRadius = minLength / 2 - 10;
    coords.current.innerCircleRadius = coords.current.outerCircleRadius / 2;
  };

  const spin = () => {
    if (timerHandle === 0) {
      spinStart = new Date().getTime();
      maxSpeed = Math.PI / segments.length;
      frames = 0;
      timerHandle = setInterval(onTimerTick, timerDelay);
    }
  };

  const onTimerTick = () => {
    frames++;
    draw();
    const duration = new Date().getTime() - spinStart;
    let progress = 0;
    let finished = false;
    if (duration < upTime) {
      progress = duration / upTime;
      angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2);
    } else {
      if (winningSegment) {
        if (currentSegment === winningSegment && frames > segments.length) {
          progress = duration / upTime;
          angleDelta =
            maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
          progress = 1;
        } else {
          progress = duration / downTime;
          angleDelta =
            maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
        }
      } else {
        progress = duration / downTime;
        angleDelta =
          maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
      }
      if (progress >= 1) finished = true;
    }
    angleCurrent += angleDelta;
    while (angleCurrent >= Math.PI * 2) angleCurrent -= Math.PI * 2;
    if (finished) {
      setFinished(true);
      setShowSuccessModal(true);
      onFinished(currentSegment);
      clearInterval(timerHandle);
      timerHandle = 0;
      angleDelta = 0;
    }
  };

  const wheelDraw = () => {
    clear();
    drawWheel();
    drawNeedle();
  };

  const draw = () => {
    clear();
    drawWheel();
    drawNeedle();
  };

  const drawSegment = (key, lastAngle, angle) => {
    const ctx = canvasRef.current.getContext("2d");
    const value = segments[key];
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(coords.current.centerX, coords.current.centerY);
    ctx.arc(
      coords.current.centerX,
      coords.current.centerY,
      coords.current.outerCircleRadius,
      lastAngle,
      angle,
      false
    );
    ctx.lineTo(coords.current.centerX, coords.current.centerY);
    ctx.closePath();
    ctx.fillStyle = segColors[key];
    ctx.fill();
    ctx.stroke();
    ctx.save();
    ctx.translate(coords.current.centerX, coords.current.centerY);
    ctx.rotate((lastAngle + angle) / 2);
    ctx.fillStyle = contrastColor;
    ctx.font = "bold 1em " + fontFamily;
    ctx.fillText(value.substr(0, 21), coords.current.innerCircleRadius + 20, 0);
    ctx.restore();
  };

  const drawWheel = () => {
    const ctx = canvasRef.current.getContext("2d");
    let lastAngle = angleCurrent;
    const len = segments.length;
    const PI2 = Math.PI * 2;
    ctx.lineWidth = 1;
    ctx.strokeStyle = primaryColor;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.font = "1em " + fontFamily;
    for (let i = 1; i <= len; i++) {
      const angle = PI2 * (i / len) + angleCurrent;
      drawSegment(i - 1, lastAngle, angle);
      lastAngle = angle;
    }

    // Draw a center circle
    ctx.beginPath();
    ctx.arc(coords.current.centerX, coords.current.centerY, 50, 0, PI2, false);
    ctx.closePath();
    ctx.fillStyle = primaryColor;
    ctx.lineWidth = 10;
    ctx.strokeStyle = contrastColor;
    ctx.fill();
    ctx.font = "bold 1em " + fontFamily;
    ctx.fillStyle = contrastColor;
    ctx.textAlign = "center";
    ctx.fillText(
      buttonText,
      coords.current.centerX,
      coords.current.centerY + 3
    );
    ctx.stroke();

    // Draw outer circle
    ctx.beginPath();
    ctx.arc(
      coords.current.centerX,
      coords.current.centerY,
      coords.current.outerCircleRadius,
      0,
      PI2,
      false
    );
    ctx.closePath();

    ctx.lineWidth = 10;
    ctx.strokeStyle = primaryColor;
    ctx.stroke();
  };

  const drawNeedle = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineWidth = 1;
    ctx.strokeStyle = contrastColor;
    ctx.fileStyle = contrastColor;
    ctx.beginPath();
    ctx.moveTo(coords.current.centerX + 20, coords.current.centerY - 50);
    ctx.lineTo(coords.current.centerX - 20, coords.current.centerY - 50);
    ctx.lineTo(coords.current.centerX, coords.current.centerY - 70);
    ctx.closePath();
    ctx.fill();
    const change = angleCurrent + Math.PI / 2;
    let i =
      segments.length -
      Math.floor((change / (Math.PI * 2)) * segments.length) -
      1;
    if (i < 0) i = i + segments.length;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = primaryColor;
    ctx.font = "bold 1.5em " + fontFamily;
    currentSegment = segments[i];
  };
  const clear = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, 1000, 800);
  };
  return (
    <>
      <div id="wheel" className={style["spin-wheel"]} ref={canvasContainerRef}>
        <canvas
          ref={canvasRef}
          id="canvas"
          width={"100%"}
          height={"100%"}
          onClick={spin}
          style={{
            pointerEvents: isFinished && isOnlyOnce ? "none" : "auto",
          }}
        />
      </div>
      {showSuccessModal && <Confetti></Confetti>}
      <Modal
        show={showSuccessModal}
        contentClassName={`${style["spin-modal"]}`}
        centered
      >
        <Modal.Header
          closeButton
          onHide={() => {
            setShowSuccessModal(false);
            onHide();
          }}
          closeVariant={"white"}
          className={style["spin-modal-header"]}
        >
          Congratulations
        </Modal.Header>
        <Modal.Body className={style["spin-modal-body"]}>
          <h3>{`You have won ${winningSegment}`}</h3>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default WheelComponent;

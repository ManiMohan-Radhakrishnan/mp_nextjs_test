import Image from "next/image";
import { useState } from "react";
import {
  AiOutlineRotateLeft,
  AiOutlineZoomIn,
  AiOutlineZoomOut,
} from "react-icons/ai";
import { MdOutlineFlip } from "react-icons/md";
import { GrPowerReset } from "react-icons/gr";
import { PanViewer } from "react-image-pan-zoom-rotate";
import style from "./style.module.scss";

const ReactPanZoom = ({
  image,
  alt,
  ref,
  disableZoom = false,
  disableFlip = false,
  disableRotate = false,
  disableReset = false,
  disablePan = false,
}) => {
  const [dx, setDx] = useState(0);
  const [dy, setDy] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [flip, setFlip] = useState(false);

  const resetAll = () => {
    setDx(0);
    setDy(0);
    setZoom(1);
    setRotation(0);
    setFlip(false);
  };

  const zoomIn = () => {
    setZoom(zoom + 0.2);
  };

  const zoomOut = () => {
    if (zoom >= 1) {
      setZoom(zoom - 0.2);
    }
  };

  const rotateLeft = () => {
    if (rotation === -3) {
      setRotation(0);
    } else {
      setRotation(rotation - 1);
    }
  };

  const flipImage = () => {
    setFlip(!flip);
  };

  const onPan = (dx, dy) => {
    setDx(dx);
    setDy(dy);
  };

  return (
    <div className={style["pan-image"]}>
      <div className={style["controls"]}>
        {!disableZoom ? (
          <>
            <div className={style["control"]} onClick={zoomIn}>
              <AiOutlineZoomIn />
            </div>
            <div className={style["control"]} onClick={zoomOut}>
              <AiOutlineZoomOut />
            </div>
          </>
        ) : (
          <></>
        )}
        {!disableRotate ? (
          <div className={style["control"]} onClick={rotateLeft}>
            <AiOutlineRotateLeft />
          </div>
        ) : (
          <></>
        )}
        {!disableFlip ? (
          <div className={style["control"]} onClick={flipImage}>
            <MdOutlineFlip />
          </div>
        ) : (
          <></>
        )}
        {!disableReset ? (
          <div className={style["control"]} onClick={resetAll}>
            <GrPowerReset />
          </div>
        ) : (
          <></>
        )}
      </div>
      <PanViewer
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
        }}
        enablePan={!disablePan}
        zoom={zoom}
        setZoom={setZoom}
        pandx={dx}
        pandy={dy}
        onPan={onPan}
        rotation={rotation}
        key={dx}
      >
        <Image
          unoptimized={true}
          style={{
            transform: `rotate(${rotation * 90}deg) scaleX(${flip ? -1 : 1})`,
            width: "100%",
          }}
          height={30}
          width={20}
          src={image}
          alt={alt}
          ref={ref}
        />
      </PanViewer>
    </div>
  );
};

export default ReactPanZoom;

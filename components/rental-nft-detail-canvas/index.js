import { useState } from "react";
import { useRouter } from "next/router";
import { Offcanvas } from "react-bootstrap";

import RentedCardDetails from "../rented-card-details";

import style from "./style.module.scss";

const RentNftDetailCanvas = ({
  show,
  data,
  details,
  onHide = () => {},
  typeOfPlayer,
  homePage = false,
}) => {
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  const handleHide = () => {
    if (success) router.push(router.asPath);
    setSuccess(false);
    onHide();
  };

  return show ? (
    <Offcanvas
      className={style["rental-detail-canvas"]}
      show={show}
      onHide={handleHide}
      placement="end"
    >
      <Offcanvas.Header
        className={`rental-detail-canvas-header ${style["rental-detail-canvas-header"]}`}
        closeButton
      ></Offcanvas.Header>
      <Offcanvas.Body>
        <RentedCardDetails
          nftDetails={details}
          data={data}
          onRentalSuccess={handleHide}
          success={success}
          setSuccess={setSuccess}
          category={typeOfPlayer}
          homePage={homePage}
        />
      </Offcanvas.Body>
    </Offcanvas>
  ) : (
    <></>
  );
};

export default RentNftDetailCanvas;

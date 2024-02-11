import { useEffect, useMemo, useState, memo } from "react";
import { Modal } from "react-bootstrap";
import { MdCheckCircle } from "react-icons/md";

import style from "./style.module.scss";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

const Success = memo(
  ({
    show = false,
    toggleModal = () => {},
    modalState = {},
    onReload = () => {},
  }) => {
    return (
      <Modal
        show={show}
        animation={false}
        contentClassName={`${style["prebook-modal"]} prebook-modal`}
        className={`prebook-modal-main`}
        centered
      >
        <Modal.Header
          className={`${style["purchased"]}`}
          onHide={() => {
            onReload();
            toggleModal();
          }}
          closeButton
          closeVariant={"dark"}
        >
          <span className="fs-4">Free Claim Play Pass</span>
        </Modal.Header>
        <Modal.Body className={style["prebook-modal-body"]}>
          <div className={`${style["purchase-success"]} purchase-success mt-4`}>
            <MdCheckCircle
              fill="green"
              style={{ width: "4rem", height: "4rem", fill: "#00A506" }}
            />
            <p className="text-dark fs-3">Claim Successful!</p>
            <button
              className={`${style["theme-btn"]} mb-3 mt-4 w-100`}
              onClick={() => {
                window.open(
                  `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/game-pass`,
                  "_blank"
                );
                onReload();
                toggleModal();
              }}
            >
              View Game Pass
            </button>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
);

Success.displayName = "Success";

export default Success;

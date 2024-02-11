import { useState } from "react";

import JoinWaitListAppLink from "./joinwaitlist-applink";
import WaitlistImage from "../../../images/drop/car-nft-images/wait-list-bg.png";
// import images from "../images.json";

import style from "./style.module.scss";

const SuperLootWaitList = () => {
  const [phoneInfo, setPhoneInfo] = useState({
    phone_no: null,
    country_code: "in",
  });

  return (
    <section
      className={style["joinnow-section"]}
      style={{
        backgroundImage: `url(${WaitlistImage.src})`,
      }}
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className={style["joinnow-flex"]}>
              <div className={style["content-block"]}>
                <h4>BE THE FIRST TO KNOW WHEN THE RACE STARTS!</h4>
                <p>Join the waitlist now</p>
              </div>
              <div className={style["joinwaitlist-box"]}>
                <JoinWaitListAppLink />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuperLootWaitList;

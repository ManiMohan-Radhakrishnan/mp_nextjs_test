import dayjs from "dayjs";

import Image from "next/image";

import style from "./style.module.scss";

import TradeImage from "../../../images/drop/metaverse-section/trade-image.svg";

const CallitCard = ({ className, eventlist, textColor }) => {
  const getEventTitle = (eventitem) => {
    let template = eventitem?.title;
    if (template && eventitem?.expected_price) {
      template = template?.replace(
        /{{expected_price}}/g,
        eventitem?.expected_price
      );
    }
    if (template && eventitem?.expires_at) {
      template = template?.replace(
        /{{end_time}}/g,
        dayjs(eventitem?.expires_at).format("hh:mm A")
      );
    }
    return template;
  };
  return (
    <div
      className={`${style["more-card"]} ${style["jt-card"]} ${style[className]}`}
    >
      <div className={style["top-content-title"]}>
        {/* <div className="heart_box">
          <div className="svg_size filled_heart_icon"></div> */}

        {/* <div className="svg_size heart_icon"></div> */}
        {/* </div> */}

        <div
          style={{ color: textColor }}
          className={style["more-nft-info-header"]}
        >
          <div className={style["more-nft-title"]}>
            <div className={style["more-nft-title-box"]}>
              <div className={style["more-nft-ownername-info"]}>
                {eventlist?.contest?.name && (
                  <div className={style["more-nft-desc1"]}>
                    <Image
                      unoptimized={true}
                      width="50"
                      height="50"
                      src={
                        eventlist?.contest?.image_url
                          ? eventlist?.contest?.image_url
                          : TradeImage
                      }
                      alt="Player-status"
                      loading="lazy"
                    />{" "}
                    {eventlist?.contest?.name}
                  </div>
                )}
                <div
                  className={`${style["more-nft-desc"]} ${style["owner-name"]}`}
                  onClick={() =>
                    window.open(
                      `${process.env.NEXT_PUBLIC_CALL_IT_URL}/event/${eventlist?.id}?way=market`
                    )
                  }
                >
                  <p> {getEventTitle(eventlist)}</p>
                </div>
              </div>
              {/* <span className={style["more-nft-name"]}>
                {eventlist?.contest?.guidelines}
              </span> */}
              <div
                className={`${style["btn-block"]}`}
                onClick={() =>
                  window.open(
                    `${process.env.NEXT_PUBLIC_CALL_IT_URL}/event/${eventlist?.id}?way=market`
                  )
                }
              >
                <button className={style["yes-btn"]}>Yes</button>
                <button className={style["no-btn"]}>No</button>
              </div>
            </div>
            {/* <div className={style["more-nft-ownername-info"]}>
              {eventlist?.contest?.name && (
                <div className={style["more-nft-desc"]}>
                  {eventlist?.contest?.name}
                </div>
              )}
              <div
                className={`${style["more-nft-desc"]} ${style["owner-name"]}`}
                // onClick={() => {
                //   router.push(`/user/${nft?.owner_slug}/details`);
                // }}
              >
                {eventlist?.contest?.guidelines}
              </div>
            </div> */}

            {/* <span className={style["nft-type-badge"]}>
              {nft?.nft_type?.toUpperCase()}
            </span> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallitCard;

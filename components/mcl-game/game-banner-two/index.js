import Image from "next/image";

import images from "../../../utils/images.json";
import style from "../style.module.scss";

const MclGameTwo = () => {
  return (
    <>
      <section className={`${style["whitepaper_sec"]} py-5`}>
        <div className="container">
          <div className="row justify-content-center">
            <div
              className={`${style["whitepaper_box"]} p-4 text-center position-relative`}
            >
              {/* <h2
                className={`${style["download_app"]} display-1 text-uppercase fw-bold`}
              >
                Meta Cricket League
              </h2> */}
              <h2
                className={`${style["marketplace_app"]} display-1 text-uppercase fw-bold`}
              >
                MCL Whitepaper
              </h2>
              <p className={`my-3 text-capitaliz fs-2 ${style["h-meduim"]}`}>
                <span>
                  Meta Cricket League is a Hit-to-Earn game that brings the
                  excitement of cricket to the metaverse. Read the whitepaper to
                  learn more about the game, its structure, and key details.
                </span>
              </p>
              {/* <p className={`${style["theme-color"]} fs-3 text-capitalize`}>
                <strong>
                  <span>Learn about meta cricket league</span>
                </strong>
              </p> */}
              <a
                href="http://mcl-wp.jump.trade/"
                target="_blank"
                rel="noreferrer"
              >
                <button className={`${style["read_moree"]} fs-5 fw-bold`}>
                  <span>Read Now</span>
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className={style["hr-line"]}></div>
      {/* <section className={`${style["mcl-game-three"]} pt-5 pb-0`}>
        <div className="row">
          <div className="col-md-6 text-center text-md-start d-flex d-sm-flex d-md-flex justify-content-center align-items-center justify-content-md-start align-items-md-center justify-content-xl-end mb-4">
            <div className="p-lg-5 p-2">
              <h2
                className={`${style["download_app"]} display-1 text-uppercase fw-bold`}
              >
                Download the
              </h2>
              <h2
                className={`${style["marketplace_app"]} display-1 text-uppercase fw-bold`}
              >
                Marketplace app
              </h2>
              
              <div
                className={`d-flex text-md-start d-flex d-sm-flex d-md-flex justify-content-center align-items-center justify-content-md-start align-items-md-center justify-content-xl-start mt-5 ${style["app-download-icons"]}`}
              >
                <a
                  className="me-4"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  href="https://play.google.com/store/apps/details?id=com.jump.trade"
                >
                  <Image unoptimized={true}
                    
                    height="100"
                    width="100"
                    src={images.playStore}
                    alt="PlayStore Images"
                  />
                </a>
                <a
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  href="https://apps.apple.com/in/app/jump-trade/id1618739753"
                >
                  <Image unoptimized={true}
                    
                    height="100"
                    width="100"
                    src={images.appStore}
                    alt="AppStore Images"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-0">
            <div className="p-0 mx-lg-0">
              <Image unoptimized={true}
                className={`img-fluid  w-100% fit-cover  ${style["mock-device-image"]}`}
                src={images.device}
                height="350"
                width="350"
                alt="Device"
              />
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
};

export default MclGameTwo;

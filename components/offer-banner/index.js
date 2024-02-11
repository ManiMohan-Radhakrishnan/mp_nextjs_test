import Image from "next/image";

import Header from "../header";
import Footer from "../footer";
import images from "../../utils/images.json";
import style from "./style.module.scss";
import useWindowUtils from "../../hooks/useWindowUtils";

const OfferBanner = () => {
  const windowq = useWindowUtils();
  const { width: innerWidth } = windowq;

  return (
    <>
      <Header bgImage />
      <div>
        <section
          className={style["buy-banner-sec"]}
          // style={
          //   innerWidth && {
          //     backgroundImage: `url(${
          //       innerWidth > 769 ? images.buyWeb : images.buyMobile
          //     })`,
          //   }
          // }
        >
          <div className={style["buy-content-block"]}>
            {innerWidth && (
              <Image
                unoptimized={true}
                layout="fill"
                src={
                  innerWidth > 767 ? images.buyWebText : images.buyMobileText
                }
                alt="Best NFT Marketplace"
                className={style["buy-content-img"]}
                loading="lazy"
                height={450}
                width={1900}
              />
            )}

            <div className={style["buy-content-box"]}>
              <div>
                <Image
                  unoptimized={true}
                  layout="fixed"
                  src={images.buyUCoinLogo}
                  alt="UCoin Logo"
                  width="200"
                  height="70"
                />
              </div>
              <div className={style["buy-btn-block"]}>
                <a
                  className={style["theme-btn"]}
                  onClick={() =>
                    window.open(process.env.NEXT_PUBLIC_BUYUCOIN_URL, "_blank")
                  }
                >
                  <span>Visit BuyUcoin</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default OfferBanner;

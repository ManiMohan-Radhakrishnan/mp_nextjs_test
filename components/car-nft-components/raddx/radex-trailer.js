import style from "./style.module.scss";

import NEARLogo from "../../../images/raddx-nft/NEARLogo.png";
import Image from "next/image";

const RadexTrailer = () => {
  return (
    <>
      {/* <section className={`${style["near-info-section"]}`}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className={style["next-info-block"]}>
                <p>THE MOST AUTHENTIC CAR RACING EXPERIENCE IN THE METAVERSE</p>
                <h5>The #1 Game ON</h5>

                <Image unoptimized={true}
                  
                  alt="Near"
                  src={NEARLogo}
                  width="100"
                  height="100"
                  decoding="async"
                  data-nimg="future"
                />
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <section className={`${style["raddx-youtube-trailer-section"]}`}>
        <div className={`${style["youtube-trailer-wrapper"]}`}>
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/tJfal6DSNB4?si=C03pXpG5KT23SzOK"
            title="Raddx Racing Metaverse NFTs"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>
    </>
  );
};

export default RadexTrailer;

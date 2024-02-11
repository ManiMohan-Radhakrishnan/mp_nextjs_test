import Image from "next/image";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { AiOutlineShareAlt } from "react-icons/ai";
import { RiUserShared2Line, RiGiftLine, RiShareLine } from "react-icons/ri";
import { GoGift } from "react-icons/go";
import images from "../../utils/images-new.json";
import style from "./style.module.scss";

const Winnings = () => {
  return (
    <>
      <section className={style["winning-head"]}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className={style["content-center"]}>
                <h4>SPREAD THE WORD ✦</h4>
                <h2>REFER &amp; EARN</h2>
                <p>
                  Spread The Joy Of Playing MCL And Collecting Jump.trade NFTs.
                  Refer A Friend &amp; Earn Rewards... For Both You And Your NFT
                  Buddy!
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-6">
              <div className={style["refer-steps"]}>
                <div className={style["steps-box"]}>
                  <span className={style["steps-box-count"]}>1</span>
                  <div className={style["image-box"]}>
                    <AiOutlineShareAlt />
                  </div>
                  <div className={style["content"]}>
                    <h5 className={style["title"]}>Share The Unique Code!</h5>
                    <p className={style["description"]}>
                      Create &amp; Share Your Unique Referral Code With Your
                      Friends!
                    </p>
                  </div>
                </div>
                <div className={style["steps-box"]}>
                  <span className={style["steps-box-count"]}>2</span>
                  <div className={style["image-box"]}>
                    <RiUserShared2Line />
                  </div>
                  <div className={style["content"]}>
                    <h5 className={style["title"]}>
                      Let Your Friends Sign Up!
                    </h5>
                    <p className={style["description"]}>
                      Let Your Friends Use Your Unique Referral Code &amp; Sign
                      Up On Jump.trade!
                    </p>
                  </div>
                </div>
                <div className={style["steps-box"]}>
                  <span className={style["steps-box-count"]}>3</span>
                  <div className={style["image-box"]}>
                    <GoGift />
                  </div>
                  <div className={style["content"]}>
                    <h5 className={style["title"]}>Get Rewarded!</h5>
                    <p className={style["description"]}>
                      Upon Successful Completion Of KYC, Both Will Be Rewarded
                      $10 To Buy NFTs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className={style["email-border"]}>
                <div className={style["content-column"]}>
                  <Image
                    unoptimized={true}
                    height="40"
                    width="40"
                    alt="Referral"
                    src={images.link_image}
                    className={style["content-column-img"]}
                  ></Image>
                  <h6>Enter Your Email To Generate Referral Code</h6>
                  <input
                    className={style["mail-input"]}
                    type="text"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Winnings;

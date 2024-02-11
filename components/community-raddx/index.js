import React from "react";
import {
  FaDiscord,
  FaInstagram,
  FaTwitter,
  FaTelegramPlane,
  FaYoutube,
  FaFacebook,
  //   IoLogoWhatsapp
} from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { EVENT_NAMES, invokeTrackEvent } from "../../utils/track-events";

import style from "./style.module.scss";

const RaddxLandCommunity = () => {
  return (
    // <div>index</div>
    <section className={style["community-section"]}>
      <div className={`container-fluid ${style["content-container"]}`}>
        <div className="row">
          <div className="col-12">
            <div className={style["content-center"]}>
              <h2 className={style["title"]}>JOIN OUR COMMUNITY !</h2>
              <p className={style["description"]}>
                JOIN THE COMMUNITY OF CREATORS AND EXPLORERS IN THE WORLD THAT
                YOU HAVE THE POWER TO OWN AND SHAPE.
              </p>
            </div>
            <div>
              <ul className={style["social-media"]}>
                <li
                  onClick={() =>
                    invokeTrackEvent(EVENT_NAMES?.SOCIAL_MEDIA_ICON_CLICKED, {
                      name: "discord",
                    })
                  }
                >
                  <a
                    href="https://discord.gg/guardianlink"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                  >
                    <FaDiscord />
                  </a>
                </li>
                <li
                  onClick={() =>
                    invokeTrackEvent(EVENT_NAMES?.SOCIAL_MEDIA_ICON_CLICKED, {
                      name: "twitter",
                    })
                  }
                >
                  <a
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    href="https://twitter.com/Jumptradenft"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 512 512"
                      fill="#ffffff"
                    >
                      <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                    </svg>
                  </a>
                </li>
                <li
                  onClick={() =>
                    invokeTrackEvent(EVENT_NAMES?.SOCIAL_MEDIA_ICON_CLICKED, {
                      name: "facebook",
                    })
                  }
                >
                  <a
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    href="https://www.facebook.com/jumptradeofficialnfts"
                  >
                    <FaFacebook />
                  </a>
                </li>
                <li
                  onClick={() =>
                    invokeTrackEvent(EVENT_NAMES?.SOCIAL_MEDIA_ICON_CLICKED, {
                      name: "instagram",
                    })
                  }
                >
                  <a
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    href="https://www.instagram.com/jumptradenft/"
                  >
                    <FaInstagram />
                  </a>
                </li>
                <li
                  onClick={() =>
                    invokeTrackEvent(EVENT_NAMES?.SOCIAL_MEDIA_ICON_CLICKED, {
                      name: "telegram",
                    })
                  }
                >
                  <a
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    href="https://t.me/jumptradenft"
                  >
                    <FaTelegramPlane />
                  </a>
                </li>
                <li
                  onClick={() =>
                    invokeTrackEvent(EVENT_NAMES?.SOCIAL_MEDIA_ICON_CLICKED, {
                      name: "youtube",
                    })
                  }
                >
                  <a
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    href="https://www.youtube.com/channel/UCBjyJeYnDeml1aE6URwUfdA"
                  >
                    <FaYoutube />
                  </a>
                </li>
                <li
                  onClick={() =>
                    invokeTrackEvent(EVENT_NAMES?.SOCIAL_MEDIA_ICON_CLICKED, {
                      name: "whatsapp",
                    })
                  }
                >
                  <a
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    href="https://api.whatsapp.com/send?l=en&amp;text=Hi,%20I%20have%20a%20query%20here!&amp;phone=918925512070"
                  >
                    <IoLogoWhatsapp />
                  </a>
                </li>
              </ul>
            </div>
            <a
              href="mailto:support@jump.trade"
              rel="nofollow noopener noreferrer"
              className={`${style["support-link"]}`}
            >
              support@jump.trade
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RaddxLandCommunity;

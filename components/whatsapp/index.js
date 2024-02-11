import Image from "next/image";

import whatsappImg from "../../images/whatsapp.png";
import style from "./style.module.scss";

const WhatsappChat = () => {
  return (
    <div className={style["whatsapp-chat"]}>
      <a
        target="_blank"
        rel="nofollow noopener noreferrer"
        href="https://api.whatsapp.com/send?l=en&amp;text=Hi,%20I%20have%20a%20query%20here!&amp;phone=918925512070"
      >
        <Image
          unoptimized={true}
          alt="whatsApp"
          src={whatsappImg}
          height={100}
          width={100}
        />
      </a>
    </div>
  );
};
export default WhatsappChat;

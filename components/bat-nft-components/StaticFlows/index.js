import Image from "next/image";

import useWindowSize from "../../../hooks/useWindowSize";
import Flow from "../flow";

import MobCryptoBat_1 from "../../../images/drop/bat-drop/MobCryptoBat_4.jpg";
import MobCryptoBat_2 from "../../../images/drop/bat-drop/MobCryptoBat_5.jpg";
import MobCryptoBat_3 from "../../../images/drop/bat-drop/MobCryptoBat_6.jpg";
import WebCryptoBat_1 from "../../../images/drop/bat-drop/WebCryptoBat_1.jpg";
import WebCryptoBat_2 from "../../../images/drop/bat-drop/WebCryptoBat_2.jpg";
import WebCryptoBat_3 from "../../../images/drop/bat-drop/WebCryptoBat_3.jpg";
import yieldBat from "../../../images/yield-bat.png";
import yieldPercentage from "../../../images/yield-percentage.png";
import yieldPeople from "../../../images/yield-people.png";
import yieldSeperator from "../../../images/yield-seperator.png";
import utilityThunder from "../../../images/utility-thunder.png";
import utilityBall from "../../../images/utility-ball.png";
import utilitySix from "../../../images/utility-six.png";

import images from "../../../utils/images.json";

const WebCryptoBats = [
  { src: WebCryptoBat_1 },
  { src: WebCryptoBat_2 },
  { src: WebCryptoBat_3 },
];

const MobCryptoBats = [
  { src: MobCryptoBat_1 },
  { src: MobCryptoBat_2 },
  { src: MobCryptoBat_3 },
];

const StaticFlows = () => {
  const { width } = useWindowSize();
  return (
    <>
      <Flow
        classNames="bat-infosection"
        title="CRYPTO BAT NFTs..."
        themeTitle="EXPLAINED"
        description="All you can know... and need to know about the Crypto Bat NFTs!"
        images={width > 580 ? WebCryptoBats : MobCryptoBats}
        componentType="carousal"
      />
      <Flow
        classNames="proof-infosection"
        themeTitle="PROOF-OF-RESERVES"
        description="Check proof of all crypto assets attached to your Crypto Bat NFTs in real-time, directly on-chain."
        images={
          width > 768
            ? { src: images.web_bat_proof }
            : { src: images.mob_bat_proof }
        }
      />
      <Flow
        classNames="yield-infosection"
        themeTitle="YIELD"
        description="Everytime a Crypto  Bat NFT gets traded on the Jump.trade marketplace, the Genesis MCL Signed Bat holders will receive a share of the royalty fees."
        images={[
          {
            src: yieldBat,
            description: "Crypto NFT Bats are traded on Jump.trade.",
          },
          {
            src: yieldPercentage,
            description: (
              <>
                Genesis MCL Signed Bat holders get a cut of the royalty fees.
                <sup>#</sup>
              </>
            ),
          },
          {
            src: yieldPeople,
            description:
              "Higher grade Genesis MCL Signed Bat holders get higher royalties.",
          },
        ]}
        seperator={
          <Image
            unoptimized={true}
            className="seperator"
            src={yieldSeperator}
            alt="Yield"
            height={50}
            width={100}
          ></Image>
        }
      />
      <Flow
        classNames="utility-infosection"
        themeTitle="UTILITY"
        description="The Crypto Bat NFTs are playable in the MCL game just like any other Bat NFT."
        images={[
          {
            src: utilityThunder,
            description: "2X Power Ups",
          },
          {
            src: utilityBall,
            description: "Negative Runs Reduction",
          },
          {
            src: utilitySix,
            description: "Sixes Distance",
          },
        ]}
        seperator={<span className="seperator">+</span>}
      />
    </>
  );
};

export default StaticFlows;

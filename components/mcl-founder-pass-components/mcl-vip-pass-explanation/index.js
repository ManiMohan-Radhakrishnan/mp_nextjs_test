import Image from "next/image";
import CommandoImage from "../../../images/captain-meta-cool.png";
import { getOS } from "../../../utils/common";
import images from "../../../utils/images.json";
import style from "./style.module.scss";
const MclVIPPassExplanation = () => {
  return (
    <section className={`${style["fusor-section"]}`}>
      <div className="container-fluid ">
        <div className="row">
          <div className="col-12">
            <div className={`${style["sec-header"]}`}>
              <h3 className={`${style["sec-title"]}`}>
                UNIQUELY CRAFTED PERKS WITH FOUNDER PASS
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid ">
        <div className="row">
          <div className="col-12">
            <div className={`${style["content-block"]}`}>
              <h4>HOST CUSTOMIZED TOURNAMENTS AND EARN REWARDS</h4>
              <p>
                Unleash your creativity and become the master of your own Custom
                Tournaments Tailored to perfection. Take charge of organizing
                exclusive, private, and special tournaments crafted to your
                liking. Earn not just glory, but also rewards as you curate
                unforgettable gaming experiences for yourself and fellow players
              </p>
            </div>
            <div className={`${style["content-block"]}`}>
              <h4>GET EARLY BETA ACCESS</h4>
              <p>
                Get your golden ticket to the forefront of gaming innovation.
                Gain exclusive entry to limited-release games and be among the
                very first to immerse yourself in groundbreaking experiences and
                cutting-edge features. With Early Beta Access, you become an
                integral part of the development process, providing invaluable
                feedback to shape the future of these games. Discover and
                witness the evolution of gaming firsthand
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MclVIPPassExplanation;

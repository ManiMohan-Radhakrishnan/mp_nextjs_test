import Image from "next/image";
import Link from "next/link";
import { Navbar } from "react-bootstrap";

import AppHelmet from "../components/helmet/index";
import images from "../utils/images.json";
import { FiSettings } from "react-icons/fi";

const SiteMaintenances = () => {
  return (
    <>
      <AppHelmet title="" description="" image="" hideCanonical />
      <section className="notfound-section">
        <div className="container">
          <div
            className="row align-items-center justify-content-center"
            style={{
              minHeight: "calc(100vh - 10rem)",
            }}
          >
            <center>
              <Navbar.Brand
                onClick={() =>
                  window.open(process.env.NEXT_PUBLIC_WEBSITE_URL, "_blank")
                }
                role="button"
                className="not-found "
              >
                <Image
                  unoptimized={true}
                  src={images.jumpTradeLogoSVG}
                  className="logo-img"
                  alt="JumpTradelogo"
                  width={200}
                  height={200}
                />
              </Navbar.Brand>
              <div className="notfound-text-block">
                <FiSettings size={50} /> {"  "}
                <p>
                  {" "}
                  We&apos;re Taking A Vital Break!
                  <br />
                  Our Techies Are Working On A Few Vital Changes And Upgrades To
                  The Site And Its Elements. The Site Will Be Back To Its Full
                  Function Soon!
                </p>
              </div>
            </center>
          </div>
        </div>
      </section>
    </>
  );
};

export default SiteMaintenances;

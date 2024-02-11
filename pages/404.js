import Image from "next/image";
import Link from "next/link";
import { Navbar } from "react-bootstrap";

import AppHelmet from "../components/helmet/index";
import images from "./../utils/images.json";

const NotFound = () => {
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
                <h1>404</h1>
                <h4>This page doesn&apos;t exist.</h4>
                <h5>
                  Go to Marketplace{" "}
                  <Link
                    legacyBehavior
                    href={"/"}
                    target="_self"
                    rel="noreferrer"
                  >
                    <div>Home</div>
                  </Link>{" "}
                  Page
                </h5>
              </div>
            </center>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;

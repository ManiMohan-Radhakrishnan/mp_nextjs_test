import Header from "../../../components/header";
import Footer from "../../../components/footer";
import SpinWheelContest from "../../../components/spin-wheel-contest";

const SpinContest = () => {
  return (
    <>
      <Header
        bgImage
        title={
          "$6000 SPIN-THE-WHEEL | MCL Signature Shots - Mystery Box | Jump.trade"
        }
        description={
          "Own the MCL Signature Shots - Mystery Box today to get an opportunity to SPIN-THE-WHEEL and win rewards worth $6000!"
        }
        image={
          "https://cdn.guardianlink.io/product-hotspot/images/Spin-the-Banner-Desktop.jpg"
        }
      />
      <SpinWheelContest />
      <Footer />
    </>
  );
};

export default SpinContest;

import Header from "../../../components/header";
import Footer from "../../../components/footer";
import AppHelmet from "../../../components/helmet";
import ContestPage from "../../../components/santa-contest";

const Contest = () => {
  return (
    <>
      <Header
        bgImage
        title={"$12000 Super Santa Treasure Box Contest | Jump.trade"}
        description={
          "Buy and Sell NFTs on Jump.trade to enter the $12000 Super Santa Treasure Box Contest. 200 Winners. Hurry now!"
        }
        image={
          "https://cdn.guardianlink.io/product-hotspot/images/SUPER-SANTA-TREASURE-BOX-OG-Image.png"
        }
      />
      <ContestPage />
      <Footer />
    </>
  );
};

export default Contest;

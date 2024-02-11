import Header from "../../components/header";
import Footer from "../../components/footer";
import RaddxSection from "../../components/car-nft-components/raddx";
import Community from "../../components/community";
import RadexTrailer from "../../components/car-nft-components/raddx/radex-trailer";

const Raddx = () => {
  return (
    <>
      <Header
        title="RADDX Car NFTs | Metaverse Racing Game | Jump.Trade"
        description="RADDX Is The First-Of-Its-Kind Metaverse Car Racing Game You Can Play With $1 Car NFTs & Win Big Cash Rewards. Prebook Your Digital Car Now!"
        image="https://cdn.guardianlink.io/product-hotspot/images/Raddx_OG_Image_v1.jpg"
      />
      <RaddxSection />
      <RadexTrailer />
      <Community />

      <Footer />
    </>
  );
};

export default Raddx;

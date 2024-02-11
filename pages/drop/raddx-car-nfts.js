import CarBanner from "../../components/car-nft-components/car-banner";
import Faq from "../../components/car-nft-components/faq";
import JoinWaitList from "../../components/car-nft-components/join-wait-list";
import SensationalNftCar from "../../components/car-nft-components/sensational-nft-car";
import SuperLootWaitList from "../../components/car-nft-components/super-loot-wait-list";
import Footer from "../../components/footer";
import Community from "../../components/car-nft-components/car-community";
import Header from "../../components/header";
import ReferWin from "../../components/car-nft-components/refer-win";

export async function getServerSideProps() {
  return {
    redirect: {
      permanent: false,
      destination: "https://raddx.jump.trade",
    },
  };
}

const CarNftDrop = () => {
  return (
    <>
      <Header
        title="RADDX Car NFTs | Metaverse Racing Game | Jump.Trade"
        description="RADDX Is The First-Of-Its-Kind Metaverse Car Racing Game You Can Play With $1 Car NFTs & Win Big Cash Rewards. Prebook Your Digital Car Now!"
        image="https://cdn.guardianlink.io/product-hotspot/images/Raddx_OG_Image_v1.jpg"
      />
      <CarBanner />
      <JoinWaitList />
      <SensationalNftCar />
      <ReferWin />
      <SuperLootWaitList />
      <Faq />
      <Community />
      <Footer />
    </>
  );
};

export default CarNftDrop;

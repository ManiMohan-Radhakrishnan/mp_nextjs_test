import Header from "../../components/header";
import Footer from "../../components/footer";
import RaddxSection from "../../components/car-nft-components/raddx";
import Community from "../../components/community";
import RadexTrailer from "../../components/car-nft-components/raddx/radex-trailer";
import MclSection from "../../components/car-nft-components/mcl-section";
import ProductBanner from "../../components/car-nft-components/product-banner";
import MclTrailer from "../../components/car-nft-components/mcl-trailer";
import OurBrandCollaborations from "../../components/car-nft-components/our-brand-collaborations";
import ReachOutUs from "../../components/car-nft-components/reach-out-us";
// import ogImage from "../../images/JT_OG_image.jpg";
import images from "../../utils/images.json";

const Product = () => {
  return (
    <>
      <Header
        title="Asia's Largest NFT Marketplace | Jump.trade"
        description="Jump.trade is Asia's largest NFT marketplace for you to trade exclusive digital collectibles. Buy your digital assets from the best NFT gaming marketplace."
        canonical={`${process.env.NEXT_PUBLIC_MARKETPLACE_URL}`}
        // image={process.env.NEXT_PUBLIC_MARKETPLACE_URL + images?.Og_Image}
        image={images?.Og_Image}
      />
      <ProductBanner />
      <MclSection />
      <MclTrailer />
      <RaddxSection />
      <RadexTrailer />
      <OurBrandCollaborations />
      <ReachOutUs />
      <Community />

      <Footer />
    </>
  );
};

export default Product;

import { useRouter } from "next/router";
import Footer from "../../components/footer";
import Header from "../../components/header";
import PrivacyComponent from "../../components/privacy-policy";

const PrivacyPolicy = () => {
  const router = useRouter();
  const { hide } = router.query;
  return (
    <>
      {!hide && (
        <Header
          bgImage
          title="Privacy Policy | Jump.Trade"
          description="The Jump.trade NFT marketplace is committed to protect the privacy of all user information."
        />
      )}
      <PrivacyComponent />
      {!hide && <Footer />}
    </>
  );
};

export default PrivacyPolicy;

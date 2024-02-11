import Footer from "../../components/footer";
import Header from "../../components/header";
import TermsAndConditions from "../../components/terms-and-condition";
import { useRouter } from "next/router";

const Terms = () => {
  const router = useRouter();
  const { hide } = router.query;
  return (
    <>
      {!hide && (
        <Header
          bgImage
          title="Terms And Conditions | T&C | Jump.Trade"
          description="The Jump.trade NFT marketplace's terms and conditions are  in the interest of our community, creators, and our business."
        />
      )}
      <TermsAndConditions />
      {!hide && <Footer />}
    </>
  );
};

export default Terms;

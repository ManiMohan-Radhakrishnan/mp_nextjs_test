import Header from "../../components/header";
import Footer from "../../components/footer";
import useQuery from "../../hooks/useQuery";
import SpinWheelTermsAndConditions from "../../components/spin-wheel-tc";

const Terms = () => {
  const query = useQuery();
  const hide = query.get("hide");
  return (
    <>
      {!hide && (
        <Header
          bgImage
          title="Contest Terms And Conditions | T&C | Jump.Trade"
          description="The Jump.trade NFT marketplace's terms and conditions are  in the interest of our community, creators, and our business."
        />
      )}
      <SpinWheelTermsAndConditions />
      {!hide && <Footer />}
    </>
  );
};

export default Terms;

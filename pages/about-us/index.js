import OurInvestor from "../../components/about-us/our-investors";
import OurTeam from "../../components/about-us/our-team";
import OurTeamBeyond from "../../components/about-us/our-team-beyond";
import Header from "../../components/header";
import Footer from "../../components/footer";

const AboutUs = () => {
  return (
    <div>
      <Header bgImage />
      <OurTeam />
      <OurInvestor />
      <OurTeamBeyond />
      <Footer />
    </div>
  );
};

export default AboutUs;

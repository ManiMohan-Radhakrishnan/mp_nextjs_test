import { Container } from "react-bootstrap";

import Header from "../../components/header";
import Footer from "../../components/footer";
import WheelOfFortune from "../../components/wheel-of-fortune-custom";

// Comment the below function the SPIN WHEEL
export async function getServerSideProps() {
  return {
    redirect: {
      permanent: false,
      destination: "/404",
    },
  };
}

const SpinWheel = () => {
  const segments = [
    "better luck next time - 1",
    "won 70 - 2",
    "won 10 - 3",
    "better luck next time - 4",
    "won 2 - 5",
    "won uber pass - 6",
    "better luck next time - 7",
    "won a voucher - 8",
    "better luck next time - 9",
    "won 70 - 10",
    "won 10 - 11",
    "better luck next time - 12",
    "won 2 - 13",
    "won uber pass - 14",
    "better luck next time - 15",
    "won a voucher - 16",
  ];
  const segColors = ["#B70F53", "#FFFFFF"];
  const onFinished = (winner) => {
    console.log(`winner : ${winner}`);
  };
  return (
    <>
      <Header></Header>
      <Container fluid>
        <WheelOfFortune
          items={segments}
          itemColors={segColors}
          winners={[2, 5, 3, 6]}
          spinDelay={3000}
          onWinner={onFinished}
          primaryColor={"#400b37"}
          secondaryColor={"#FFD700"}
          showConfettiOnWin
        />
      </Container>
      <Footer></Footer>
    </>
  );
};

export default SpinWheel;

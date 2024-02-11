import React from "react";
import CreatorForm from "../../components/creator-form";
import Footer from "../../components/footer";
import Header from "../../components/header";

// export async function getServerSideProps() {
//   return {
//     redirect: {
//       permanent: false,
//       destination: "/404",
//     },
//   };
// }

const CreatorApplication = () => {
  return (
    <>
      <Header />
      <CreatorForm />
      <Footer />
    </>
  );
};

export default CreatorApplication;

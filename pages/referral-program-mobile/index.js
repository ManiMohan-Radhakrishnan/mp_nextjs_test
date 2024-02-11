import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import ReferralInstruction from "../../components/referral-instruction";

const ReferralMobile = () => {
  return (
    <>
      <ReferralInstruction />
    </>
  );
};

export default ReferralMobile;

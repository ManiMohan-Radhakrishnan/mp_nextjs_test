import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Footer from "../../../components/footer";
import Header from "../../../components/header";
import UserBanner from "../../../components/user-banner";
import UserDetailsBlock from "../../../components/user-details-block";
import { userProfileDetailApi } from "../../../utils/methods";

const UserDetails = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [userDetail, setUserDetail] = useState({ users: [] });
  //const { user } = useSelector((state) => state.user.data);

  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    slug && getSellerDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const getSellerDetail = async () => {
    try {
      const result = await userProfileDetailApi({ slug });
      setUserDetail(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header bgImage description="" title={userDetail?.users[0]?.user_name} />
      <main className="user-profile-bg">
        <UserBanner userDetail={userDetail} />
        <UserDetailsBlock userDetail={userDetail} />
      </main>
      <Footer />
    </>
  );
};

export default UserDetails;

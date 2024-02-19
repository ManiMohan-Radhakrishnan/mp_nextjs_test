import { useSelector } from "react-redux";
import store from "../../redux/store";

import {
  getHideMenuStatus,
  setHideMenuStatus,
} from "../../redux/reducers/user_reducer";
import { getMetaDetails } from "../../utils/common";

import Header from "../../components/header";
import Footer from "../../components/footer";
import TournamentScheduleList from "../../components/tournament-schedule-list";
import AppHelmet from "../../components/helmet";
export const runtime = "nodejs";
export const dynamic = "force-static";

const Tournaments = ({ meta_information }) => {
  const metaDetails = meta_information;
  const hideMenus = useSelector(getHideMenuStatus);

  return (
    <>
      <AppHelmet
        title={metaDetails?.title}
        description={metaDetails?.description}
        image={metaDetails?.image}
      />
      {!hideMenus && <Header bgImage />}
      <TournamentScheduleList />
      {!hideMenus && <Footer />}
    </>
  );
};

export async function getServerSideProps({ query, req }) {
  const pathName = req?.url;
  const metaDetails = getMetaDetails(pathName);

  let { hideMenus } = query;
  if (hideMenus === "true") {
    store.dispatch(setHideMenuStatus(true));
  }
  return {
    props: {
      meta_information: metaDetails,
    },
  };
}

export default Tournaments;

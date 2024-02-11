import { CELEBRITIES, isValidCelebrity } from "../../utils/celebrity-config";

const ExploreAll = () => {
  return <></>;
};

export default ExploreAll;

export async function getServerSideProps({ query }) {
  let { celebrity = CELEBRITIES.DEFAULT.name } = query;
  return {
    redirect: {
      permanent: false,
      destination: `/nft-marketplace/${
        isValidCelebrity(celebrity) ? celebrity : "/404"
      }`,
    },
    props: {},
  };
}

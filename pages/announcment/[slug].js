import Header from "../../components/header";
import Footer from "../../components/footer";
import AnnounceDetail from "../../components/blogs/announcedetails";
import { getBlogCateListApi, getBlogCattApi } from "../../utils/methods";
import { errorRedirect } from "../../utils/common";

const AnnouncementDetails = (props) => {
  return (
    <>
      <Header
        bgImage
        title="NFT Marketplace | Cricket NFT Marketplace | Buy & Sell Cricket NFTs "
      />
      <AnnounceDetail data={props} />
      <Footer />
    </>
  );
};

export async function getServerSideProps({ query }) {
  const props = {};
  const { slug } = query;
  try {
    const blogData = await getBlogCateListApi();
    const CateData = await getBlogCattApi();
    const filteredblogData = blogData?.data?.filter(
      (data) => data.slug === slug
    );
    props.blogData = filteredblogData[0];
    const filteredcateData = CateData?.data?.filter(
      (item) => item.id === filteredblogData[0]?.categories
    );
    props.cate = filteredcateData[0].name;
  } catch (error) {
    console.log(error);
    // return errorRedirect(err?.status);
  }
  return { props };
}

export default AnnouncementDetails;

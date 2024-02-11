import Header from "../../components/header";
import Footer from "../../components/footer";
import AnnouncementDetail from "../../components/blogs/announcement-list";
import { getBlogCateListApi, getBlogCattApi } from "../../utils/methods";
import { errorRedirect } from "../../utils/common";

const AnnouncementList = () => {
  return (
    <>
      <Header
        bgImage
        title="NFT Marketplace | Cricket NFT Marketplace | Buy & Sell Cricket NFTs "
        description="Jump.trade is the most secured NFT marketplace where you can buy & sell rare cricket NFTs. Discover, collect, and trade authentic cricket player NFTs on our NFT gaming marketplace. Sign up now!"
      />
      <AnnouncementDetail data={props.data} />
      <Footer />
    </>
  );
};

export async function getServerSideProps() {
  const props = {};
  try {
    const blogData = await getBlogCateListApi();
    const CateData = await getBlogCattApi();
    const filteredCategoryData = CateData?.data?.filter(
      (data) => data.slug === "announcement"
    );
    const filteredBlogData = blogData?.data?.filter((item) =>
      item.categories.includes(filteredCategoryData[0]?.id)
    );
    props.data = filteredBlogData;
  } catch (error) {
    console.log(error);
    // return errorRedirect(err?.status);
  }

  return { props };
}

export default AnnouncementList;

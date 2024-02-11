import Header from "../../components/header";
import Footer from "../../components/footer";
import BlogList from "../../components/blogs";
import {
  getBlogCateListApi,
  getBlogCattApi,
  getBlogListApi,
} from "../../utils/methods";
import { errorRedirect } from "../../utils/common";

const Blog = (props) => {
  return (
    <>
      <Header
        bgImage
        title="Insights on NFT Games, P2E Guides & More | Jump.trade"
        description="Keep yourself updated with the latest stories, insightful information, and latest trends in the web3 space brought to you by Jump.trade, the most trusted NFT marketplace in the world."
      />
      <BlogList {...props} />
      <Footer />
    </>
  );
};

export async function getServerSideProps() {
  let props = {};
  try {
    const categoryData = await getBlogCattApi();
    const blogData = await getBlogCateListApi();
    const filteredCategoryData = categoryData?.data?.filter(
      (data) => data.slug === "blog"
    );

  
  //console.log(filteredCategoryData, "filteredCategoryData");
    const filteredBlogData = blogData?.data?.filter((item) =>
      item.categories.includes(filteredCategoryData[0].id)
    );
    //console.log(filteredBlogData, "filteredBlogData");
    const filteredAnnouncementCategoryData = categoryData?.data?.filter(
      (data) => data.slug === "announcement"
    );
    const BlogAnnouncmentData = await getBlogCateListApi();
    const filteredAnnouncementBlogData = BlogAnnouncmentData?.data?.filter(
      (item) =>
        item.categories.includes(filteredAnnouncementCategoryData[0]?.id)
    );
    const annoncedata = [...filteredAnnouncementBlogData];
    const AnnouncementData = annoncedata[0];

    props = {
      bannerData: filteredBlogData[0] || null,
      sliderData: filteredBlogData.slice(1, 4),
      announcementData: AnnouncementData,
      announcementSliderData: annoncedata.slice(1, 4),
      announcementSplitData: annoncedata.slice(4, 7),
    };
  } catch (error) {
    console.log(error);
    // return errorRedirect(err?.status);
  }

  return { props };
}

export default Blog;

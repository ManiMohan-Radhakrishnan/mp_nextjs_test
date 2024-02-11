import Header from "../../components/header";
import Footer from "../../components/footer";
import BlogDetail from "../../components/blogs/blog-list";
import { getBlogCateListApi, getBlogCattApi } from "../../utils/methods";
import { errorRedirect } from "../../utils/common";

const BlogList = (props) => {
  return (
    <>
      <Header
        bgImage
        title="Find All Our Blogs Here | Jump.trade"
        description="Your one-stop-shop for all the blogs and updates posted on Jump.trade. Keep yourself updated on everything web3, play-to-earn games, NFT, and jump.trade here."
      />
      <BlogDetail data={props.data} />
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
      (data) => data.slug === "blog"
    );
    const filteredBlogData = blogData?.data?.filter((item) =>
      item.categories.includes(filteredCategoryData[0].id)
    );
    props.data = filteredBlogData;
  } catch (error) {
    console.log(error);
    // return errorRedirect(err?.status);
  }
  return { props };
}

export default BlogList;

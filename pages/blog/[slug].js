import Header from "../../components/header";
import Footer from "../../components/footer";
import BlogDetail from "../../components/blogs/detail";
import {
  getBlogCateListApi,
  getBlogCattApi,
  getBlogMetaApi,
} from "../../utils/methods";
import { errorRedirect } from "../../utils/common";

const BlogDetails = (props) => {
  return (
    <>
      <Header
        bgImage
        title={props?.title}
        description={props?.description}
        image={props?.image}
        height="630"
        width="1200"
      />
      <BlogDetail {...props} />
      <Footer />
    </>
  );
};

export async function getServerSideProps({ query }) {
  let props = {};
  const { slug } = query;
  try {
    const GetmetaDetails = await getBlogMetaApi({ slug });
    const blogData = await getBlogCateListApi();
    const CateData = await getBlogCattApi();
    const filteredblogData = blogData?.data?.filter(
      (data) => data.slug === slug
    );
    const filteredcateData = CateData?.data?.filter(
      (item) => item.id === filteredblogData[0]?.categories
    );
    const filteredCategoryData = CateData?.data?.filter(
      (data) => data?.slug === "blog"
    );
    const filteredBlogData = blogData?.data?.filter((item) =>
      item?.categories?.includes(filteredCategoryData[0].id)
    );
    let arr2 = [1796,1771,1746,1724];
    let res = filteredBlogData.filter((item) => arr2.includes(item.id));

    props = {
      title: GetmetaDetails?.data?.json?.og_title,
      description:
        GetmetaDetails?.data?.json?.description ||
        GetmetaDetails?.data?.json?.og_description,
      image: GetmetaDetails?.data?.json?.og_image[0]?.url,
      data: filteredblogData[0],
      recent: filteredBlogData.slice(0, 4),
      cate: filteredcateData[0]?.name || "",
      popular: res,
    };
  } catch (error) {
    console.log(error);
    // return errorRedirect(err?.status);
  }
  return { props };
}

export default BlogDetails;

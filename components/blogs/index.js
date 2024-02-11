import Banner from "../blogs/blog-banner";
import BlogAnnouncment from "../blogs/blog-announcement";
import BlogNews from "../blogs/blog-news";
import VideoBlog from "./video";

const BlogList = ({
  bannerData = {},
  sliderData = [],
  announcementData = {},
  announcementSliderData = [],
  announcementSplitData = [],
}) => {
  return (
    <div>
      <Banner bannerData={bannerData} sliderData={sliderData} />
      <BlogNews />
      <BlogAnnouncment
        AnnouncementData={announcementData}
        announcementSliderData={announcementSliderData}
        announcementSplitData={announcementSplitData}
      />
      <VideoBlog />
    </div>
  );
};

export default BlogList;

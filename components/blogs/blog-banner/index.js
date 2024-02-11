import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

import InnerHTML from "../../InnerHTML";
import style from "../style.module.scss";

const BlogBanner = ({ bannerData = {}, sliderData = {} }) => {
  return (
    <div>
      <section className={`${style["ptb-100"]} bg-dark`}>
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12 col-sm-12 order-lg-2">
              <Link legacyBehavior href={"/blog/" + bannerData?.slug}>
                {/* <a> */}
                {bannerData?._embedded &&
                  bannerData?._embedded["wp:featuredmedia"]?.length > 0 && (
                    <Image
                      unoptimized={true}
                      width={580}
                      height={340}
                      src={
                        bannerData?._embedded &&
                        bannerData?._embedded["wp:featuredmedia"]["0"][
                          "source_url"
                        ]
                      }
                      alt="BannerData"
                      className={`img-fluid br-5 mt-5 ${style["banner-data-image"]}`}
                    />
                  )}
                {/* </a> */}
              </Link>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 order-lg-1">
              <div className={`${style["banner_contents"]} p-3 mt-5`}>
                <p className="text-white">
                  {dayjs(bannerData?.date).format("MMM D, YYYY")}
                </p>
                <h2 className="text-white">
                  <Link legacyBehavior href={"/blog/" + bannerData?.slug}>
                    {/* <a> */}
                    <InnerHTML content={bannerData?.title?.rendered} />
                    {/* </a> */}
                  </Link>
                </h2>
                <span
                  className={`mt-4 mb-4 text-white ${style["banner-description-blog"]}`}
                >
                  <InnerHTML content={bannerData?.content?.rendered} />
                </span>{" "}
                <Link legacyBehavior href={"/blog/" + bannerData?.slug}>
                  <div className={`mt-3 ${style["btn-readmore"]}`}>
                    Read more
                  </div>
                </Link>{" "}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={`${style["blog-list"]} p-80`}>
        <div className={`container-fluid ${style["container_fluid"]}`}>
          <div className="row">
            {sliderData?.map((item, i) => (
              <div className="col-md-4 col-lg-4 col-sm-4" key={item?.id || i}>
                <div className={style["b-list"]}>
                  <Link legacyBehavior href={"/blog/" + item?.slug}>
                    {/* <a> */}
                    {item?._embedded["wp:featuredmedia"]?.length > 0 && (
                      <Image
                        unoptimized={true}
                        width={580}
                        height={340}
                        src={
                          item?._embedded["wp:featuredmedia"]["0"]["source_url"]
                        }
                        alt="Embedded Item"
                        className="img-fluid"
                      />
                    )}
                    {/* </a> */}
                  </Link>
                  <h2>
                    <Link legacyBehavior href={"/blog/" + item?.slug}>
                      <a href={"/blog/" + item?.slug}>
                        {/* {item?.title?.rendered} */}
                        <InnerHTML content={item?.title?.rendered} />
                      </a>
                    </Link>
                  </h2>
                </div>
              </div>
            ))}
            <div className="d-flex justify-content-center my-5">
              <Link legacyBehavior href={"/blog/list"}>
                <a className={style["blog-view-more"]}> View More </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogBanner;

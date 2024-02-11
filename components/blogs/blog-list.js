import Image from "next/image";
import Link from "next/link";

import InnerHTML from "../InnerHTML";
import style from "./style.module.scss";

const BlogList = ({ data }) => {
  const getCategoryDetails = () => {
    const categoryname = [];
    if (categoryname?.length > 0) {
      if (categoryname?.length >= 2) {
        return categoryname[1];
      } else {
        return categoryname.toString();
      }
    }
  };
  return (
    <>
      {!data ? (
        <div className={style["blog-loader"]}>
          <div className="span">
            <div className={style["lds-ripple"]}>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      ) : (
        <section className={`${style["blog-list"]} ${style["ptb-100"]}`}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12">
                <div
                  className={`${style["sec-heading"]} ${style["live-flex-box"]}`}
                >
                  <span className={style["title"]}>Blog</span>
                </div>
              </div>
            </div>
            <div className="row">
              {data?.map((item, i) => (
                <div
                  key={item?.id || i}
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                >
                  <Link legacyBehavior href={"/blog/" + item?.slug}>
                    <a
                      className={`${style["single-card-blog"]} ${style["anchor"]}`}
                    >
                      <div className={style["blog_box"]}>
                        <div className={style["bg-color"]}>
                          <div className={style["box_img"]}>
                            {item?._embedded["wp:featuredmedia"]?.length >
                              0 && (
                              <Image
                                unoptimized={true}
                                src={
                                  item?._embedded["wp:featuredmedia"]["0"][
                                    "source_url"
                                  ]
                                }
                                width={330}
                                height={180}
                                alt="Embedded Item"
                                className="img-fluid"
                              />
                            )}
                          </div>

                          <div className={`${style["blog_content"]} mt-2 `}>
                            <span className={style["cat-des"]}>
                              {getCategoryDetails(item.categories)}
                            </span>
                            <h5 className="mt-3">
                              <InnerHTML content={item?.title?.rendered} />
                            </h5>
                          </div>
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}{" "}
    </>
  );
};

export default BlogList;

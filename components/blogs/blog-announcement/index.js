import Image from "next/image";
import Link from "next/link";

import InnerHTML from "../../InnerHTML";
import images from "../../../utils/images.json";
import style from "../style.module.scss";

const BlogAnnouncment = ({
  AnnouncementData = {},
  announcementSliderData = [],
  announcementSplitData = [],
}) => {
  return (
    <section className={`bg_green ${style["announcement"]} ptb-100"`}>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 py-5">
            <h2 className={style["sectionTitle"]}>ANNOUNCEMENTS</h2>
          </div>
        </div>
        <div className="row">
          {Object.keys(AnnouncementData).length !== 0 && (
            <div className="col-xl-9 col-lg-9 col-sm-12 col-12">
              <div className={style["spl-announcement"]}>
                <Link
                  legacyBehavior
                  href={"/announcment/" + AnnouncementData?.slug}
                >
                  {/* <a> */}
                  <div className="row align-items-center">
                    <div className="col-xl-6 col-sm-6 col-12">
                      <div>
                        <div className={style["f_book"]}>
                          <Image
                            unoptimized={true}
                            src={images.batimg}
                            alt="AnnouncementData"
                            height={100}
                            width={100}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6 col-sm-6 col-12">
                      <div>
                        <div className={style["s_book"]}>
                          <div className={style["content_book"]}>
                            <span className={style["cat_1"]}>ANNOUNCEMENT</span>
                            <h2>{AnnouncementData?.title?.rendered}</h2>

                            <div className={style["announcemet-content"]}>
                              <InnerHTML
                                content={AnnouncementData?.content?.rendered}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* </a> */}
                </Link>
              </div>
            </div>
          )}
          {announcementSliderData.length !== 0 && (
            <div className="col-xl-3 col-lg-3  col-sm-12 col-12">
              {announcementSliderData?.map((item, i) => (
                <Link
                  legacyBehavior
                  href={"/announcment/" + item?.slug}
                  key={item?.id || i}
                >
                  {/* <a> */}
                  <div
                    className={`${style["book_xtra"]} d-flex align-items-center`}
                  >
                    <div>
                      <span className={style["cat_1"]}>ANNOUNCEMENT</span>
                      <h2>
                        <InnerHTML content={item?.title?.rendered} />
                      </h2>
                    </div>
                  </div>
                  {/* </a> */}
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className="row">
          {announcementSplitData.length !== 0 &&
            announcementSplitData?.map((item, i) => (
              <div className="col-lg-4" key={item?.id || i}>
                <Link legacyBehavior href={"/announcment/" + item?.slug}>
                  {/* <a> */}
                  <div
                    className={`${style["book_bottom"]} ${style["banner-description-blog"]}`}
                  >
                    <h2>
                      <InnerHTML content={item?.title?.rendered} />
                    </h2>
                  </div>
                  {/* </a> */}
                </Link>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default BlogAnnouncment;

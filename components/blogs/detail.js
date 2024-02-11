import dayjs from "dayjs";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import { FaFacebook, FaTwitter } from "react-icons/fa";

import style from "./style.module.scss";
import InnerHTML from "../InnerHTML";

const BlogDetail = ({ data, recent, popular }) => {
  const {
    query: { slug },
  } = useRouter();
  const [key, setKey] = useState("recent");
  const shareUrl = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/blog/${slug}`;

  return (
    <section className={`${style["ptb-100"]} ${style["blog_page"]}`}>
      <div className="container">
        <div className="row"></div>
        <div className="row">
          <div className="col-lg-8">
            <div className={style["blog_section"]}>
              <div className={style["blog_heading"]}>
                <h1>
                  <InnerHTML content={data?.title?.rendered} />
                </h1>
                <p className="text-muted">
                  By ADMIN / {dayjs(data?.date).format("MMM D, YYYY")}
                </p>
              </div>
              <div className={`${style["blog_banner"]} rounded`}>
                {data?._embedded["wp:featuredmedia"]?.length > 0 && (
                  <Image
                    unoptimized={true}
                    height={152}
                    width={290}
                    src={data?._embedded["wp:featuredmedia"]["0"]["source_url"]}
                    className="img-fluid rounded w-100"
                    alt="blog"
                  />
                )}
              </div>
              <div
                className={`${style["blog_content"]} ${style["text-size"]}  mt-5`}
              >
                {" "}
                <div
                  dangerouslySetInnerHTML={{
                    __html: data?.content?.rendered.replace(
                      /(<? *script)/gi,
                      "illegalscript"
                    ),
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div
              className={`${style["post-tabs"]} ${style["rounded"]} ${style["bordered"]} p-4 mt-2`}
            >
              <h4>Recently Post</h4>
              <ul
                className={`${style["nav-tabs"]} ${style["nav-pills"]} nav nav-tabs nav-pills nav-fill mt-4`}
                id="postsTab"
                role="tablist"
              >
                <li
                  className={`${style["nav-item"]} nav-item`}
                  role="presentation"
                >
                  <button
                    aria-controls="popular"
                    aria-selected="true"
                    className={`nav-link ${style["nav-link"]}  ${
                      key === "recent" ? style["active"] : ""
                    }`}
                    data-bs-target="#popular"
                    data-bs-toggle="tab"
                    id="popular-tab"
                    role="tab"
                    type="button"
                    onClick={() => setKey("recent")}
                  >
                    Recent
                  </button>
                </li>
                <li className={`${"nav-item"} nav-item`} role="presentation">
                  <button
                    aria-controls="recent"
                    aria-selected="false"
                    className={`nav-link ${style["nav-link"]}  ${
                      key === "popular" ? style["active"] : ""
                    }`}
                    data-bs-target="#recent"
                    data-bs-toggle="tab"
                    id="recent-tab"
                    role="tab"
                    type="button"
                    onClick={() => setKey("popular")}
                  >
                    Popular
                  </button>
                </li>
              </ul>

              <div className="tab-content mt-2" id="postsTabContent">
                <div
                  aria-labelledby="popular-tab"
                  className={`tab-pane fade  ${
                    key === "recent" ? "show" + " " + "active" : ""
                  }`}
                  id="popular"
                  role="tabpanel"
                >
                  {recent?.map((item, i) => (
                    <div
                      key={item?.id || i}
                      className="post post-list-sm position-relative circle d-flex justify-content-start align-items-center py-3"
                    >
                      <div className="thumb rounded-circle">
                        <a
                          className={style["anchor"]}
                          href={"/blog/" + item?.slug}
                        >
                          <div className={style["inner"]}>
                            {item?._embedded["wp:featuredmedia"]?.length >
                              0 && (
                              <Image
                                unoptimized={true}
                                height={30}
                                width={30}
                                src={
                                  item?._embedded["wp:featuredmedia"]["0"][
                                    "source_url"
                                  ]
                                }
                                className="rounded-circle me-3"
                                alt="post-title"
                              />
                            )}
                          </div>
                        </a>
                      </div>
                      <div
                        className={`${style["details"]} ${style["clearfix"]}`}
                      >
                        <h6 className="post-title my-0">
                          <a
                            href={"/blog/" + item?.slug}
                            className={`${style["anchor"]} text-decoration-none text-dark lh-base lh-base`}
                          >
                            <InnerHTML content={item?.title?.rendered} />
                          </a>
                        </h6>
                        <ul className="meta list-inline mt-1 mb-0">
                          <li className="list-inline-item">
                            {dayjs(item?.date).format("D MMM  YYYY")}
                          </li>
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  aria-labelledby="recent-tab"
                  // className="tab-pane fade"
                  className={`tab-pane fade  ${
                    key === "popular" ? "show" + " " + "active" : ""
                  }`}
                  id="recent"
                  role="tabpanel"
                >
                  {popular?.map((item, i) => (
                    <div
                      key={item?.id || i}
                      className="post post-list-sm position-relative circle d-flex justify-content-start align-items-center py-3"
                    >
                      <div className="thumb rounded-circle">
                        <a
                          className={style["anchor"]}
                          href={"/blog/" + item?.slug}
                        >
                          <div className={style["inner"]}>
                            {item?._embedded["wp:featuredmedia"]?.length >
                              0 && (
                              <Image
                                unoptimized={true}
                                height={30}
                                width={30}
                                src={
                                  item?._embedded["wp:featuredmedia"]["0"][
                                    "source_url"
                                  ]
                                }
                                className="rounded-circle me-3"
                                alt="post-title"
                              />
                            )}
                          </div>
                        </a>
                      </div>
                      <div
                        className={`${style["details"]} ${style["clearfix"]}`}
                      >
                        <h6 className="post-title my-0">
                          <a
                            href={"/blog/" + item?.slug}
                            className={`${style["anchor"]} text-decoration-none text-dark lh-base lh-base`}
                          >
                            <InnerHTML content={item?.title?.rendered} />
                          </a>
                        </h6>
                        <ul className="meta list-inline mt-1 mb-0">
                          <li className="list-inline-item">
                            {dayjs(item?.date).format("D MMM  YYYY")}
                          </li>
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={`${style["social_links"]} mt-3`}>
                  <h4>Social links</h4>
                  <ul className="d-flex align-items-center justify-content-start p-0 list-unstyled mt-3">
                    <li>
                      <a
                        className={style["anchor"]}
                        target="_blank"
                        onClick={() =>
                          window.open(
                            `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}}%26quote=${encodeURIComponent(
                              data?.title?.rendered
                            )}`
                          )
                        }
                      >
                        <FaFacebook />
                      </a>
                    </li>
                    <li>
                      <a
                        className={style["anchor"]}
                        target="_blank"
                        onClick={() =>
                          window.open(
                            `https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(
                              data?.title?.rendered
                            )}`
                          )
                        }
                      >
                        <FaTwitter />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetail;

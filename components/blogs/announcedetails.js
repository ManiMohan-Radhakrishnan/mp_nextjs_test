import dayjs from "dayjs";

import InnerHTML from "../InnerHTML";
import style from "./style.module.scss";

const BlogDetail = ({ data }) => {
  return (
    <>
      {!data?.blogData ? (
        <div className={style["blog-loader"]}>
          <div className="span">
            <div className={style["lds-ripple"]}>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      ) : (
        <div className={style["single-post"]}>
          <section className={`${style["blog-content"]} p-80`}>
            <div className="container">
              <div className="row">
                <div className={`${style["title-head"]} text-center`}>
                  <h3>
                    <span>{data?.cate}</span>
                  </h3>
                  <h2>
                    <InnerHTML content={data?.blogData?.title?.rendered} />
                  </h2>
                  <h5 className={style["b_date"]}>
                    {dayjs(data?.blogData?.date).format("MMM D, YYYY")}
                  </h5>
                </div>
              </div>
              <div className="row">
                <div className="border-line"></div>
              </div>
              <div className="row">
                <div className="col-md-10 col-lg-10 col-sm-10 col-xs-12 offset-md-1 offset-lg-1 offset-sm-1">
                  <div className={style["right-blog-cnt"]}>
                    <InnerHTML content={data?.blogData?.content?.rendered} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="border-line"></div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default BlogDetail;

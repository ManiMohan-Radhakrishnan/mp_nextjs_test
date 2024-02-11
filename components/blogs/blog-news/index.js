import Link from "next/link";
import Image from "next/image";

import style from "../style.module.scss";
import images from "../../../utils/images.json";

const BlogNews = () => {
  return (
    <section className={`${style["news"]} py-5`}>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 py-4">
            <h2 className={`${style["section-heading"]} text-center`}>
              <span className={style["main-title"]}>The News Box</span>{" "}
            </h2>
          </div>
        </div>
        <div className={style["news_box"]}>
          <div className={style["news_img"]}>
            <Link
              legacyBehavior
              rel="nofollow noopener noreferrer"
              href="https://www.ndtv.com/business/worlds-first-play-to-earn-nft-cricket-game-to-launch-soon-by-guardianlink-2838323"
            >
              <a target="_blank">
                <Image
                  unoptimized={true}
                  src={images.ndtv_logo}
                  alt="NDTV Logo"
                  height={100}
                  width={100}
                />
              </a>
            </Link>
          </div>
          <div className={style["news_img"]}>
            <Link
              legacyBehavior
              rel="nofollow noopener noreferrer"
              href="https://twitter.com/livemint/status/1506561708109996033?s=20&t=pDxQGzoXHqZFWDJr143NZg"
            >
              <a target="_blank">
                <Image
                  unoptimized={true}
                  src={images.mint}
                  alt="Mint"
                  height={100}
                  width={100}
                />
              </a>
            </Link>
          </div>
          <div className={style["news_img"]}>
            <Link
              legacyBehavior
              rel="nofollow noopener noreferrer"
              href="https://www.outlookindia.com/business/jump-trade-registers-1-2-million-nft-buyers-through-cricket-nft-drop-news-195121"
            >
              <a target="_blank">
                <Image
                  unoptimized={true}
                  src={images.out}
                  alt="Out "
                  height={100}
                  width={100}
                />
              </a>
            </Link>
          </div>

          <div className={style["news_img"]}>
            <Link
              legacyBehavior
              rel="nofollow noopener noreferrer"
              href="https://timesofindia.indiatimes.com/business/india-business/guardianlink-enters-nft-gaming-with-new-cricket-game/articleshow/90394235.cms"
            >
              <a target="_blank">
                <Image
                  unoptimized={true}
                  src={images.times}
                  alt="TimesOfIndia"
                  height={100}
                  width={100}
                />
              </a>
            </Link>
          </div>
          <div className={style["news_img"]}>
            <Link
              legacyBehavior
              rel="nofollow noopener noreferrer"
              href="http://bwdisrupt.businessworld.in/article/GuardianLink-Enters-NFT-Gaming-Space-With-P2E-Cricket-Game-/24-03-2022-423588/"
            >
              <a target="_blank">
                <Image
                  unoptimized={true}
                  src={images.bw}
                  alt="bw"
                  height={100}
                  width={100}
                />
              </a>
            </Link>
          </div>
          <div className={style["news_img"]}>
            <Link
              legacyBehavior
              rel="nofollow noopener noreferrer"
              href="https://economictimes.indiatimes.com/markets/cryptocurrency/jump-trade-sells-55000-nfts-of-meta-cricket-leagues-in-just-9-mins/articleshow/91071815.cms?utm_source=contentofinterest&utm_medium=text&utm_campaign=cppst"
            >
              <a target="_blank">
                <Image
                  unoptimized={true}
                  src={images.et}
                  alt="et"
                  height={100}
                  width={100}
                />
              </a>
            </Link>
          </div>

          <div className={style["news_img"]}>
            <Link
              legacyBehavior
              rel="nofollow noopener noreferrer"
              href="https://www.cnbctv18.com/startup/startup-digest-babychakra-acquires-tinystep-meesho-launches-integrated-e-commerce-app-guardianlink-launches-nft-cricket-game--crypto-investor-katie-haun-raises-15bn-for-new-fund-12923142.htm"
            >
              <a target="_blank">
                <Image
                  unoptimized={true}
                  src={images.cnbc}
                  alt="cnbc"
                  height={100}
                  width={100}
                />
              </a>
            </Link>
          </div>
          <div className={style["news_img"]}>
            <Link
              legacyBehavior
              rel="nofollow noopener noreferrer"
              href="https://www.news18.com/news/business/cryptocurrency/worlds-first-nft-cricket-game-is-here-all-you-need-to-know-4901660.html"
            >
              <a target="_blank">
                <Image
                  unoptimized={true}
                  src={images.n18}
                  alt="n18"
                  height={100}
                  width={100}
                />
              </a>
            </Link>
          </div>
          <div className={style["news_img"]}>
            <Link
              legacyBehavior
              rel="nofollow noopener noreferrer"
              href="https://www.financialexpress.com/digital-currency/international-gaming-platform-jump-trade-sells-out-55000-nfts/2502822/"
            >
              <a target="_blank">
                <Image
                  unoptimized={true}
                  src={images.tfe}
                  alt="tfe"
                  height={100}
                  width={100}
                />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogNews;

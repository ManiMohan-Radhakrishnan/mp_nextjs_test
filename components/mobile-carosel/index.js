import Link from "next/link";
import style from "./style.module.scss";
import NewImage from "../../utils/images.json";
import images from "../../utils/images-new.json";
import Image from "next/image";
import { useRouter } from "next/router";
import { Nationality } from "../../utils/common";

const MobCarousel = ({ list }) => {
  const router = useRouter();
  // router.push(`/user/${userSlug}/details`);
  const NationalityData = Nationality(
    list?.core_statistics?.nationality?.value
  );
  return (
    <div
      onClick={() => router.push(`/nft-marketplace/details/${list?.slug}`)}
      className={style["highlight-card"]}
    >
      <div className={style["nft-card-info"]}>
        {/* <Link href={`/nft-marketplace/details/${list?.slug}`}> */}
        <Image
          unoptimized={true}
          src={list?.asset_url}
          alt="Asset"
          width="600"
          height="600"
          placeholder={"blur"}
          blurDataURL={"/sample.gif"}
        />
        {/* </Link> */}

        {list?.core_statistics?.role?.value !== "Shot" ? (
          <>
            <div className={style["nft-card-info-cntnt"]}>
              <h5 className={style["rare-nft-title"]}>
                {list?.name.split("#")[0]}
              </h5>
              <h5 className={style["rare-nft-subtitle"]}>
                #{list?.name.split("#")[1]}
              </h5>
            </div>
          </>
        ) : (
          <>
            {" "}
            <div className={style["nft-card-info-cntnt"]}>
              <h5 className={style["rare-nft-title"]}>{list?.name}</h5>
            </div>
          </>
        )}
      </div>
      {list?.core_statistics?.role?.value === "Bat" ? (
        <div className={style["bat-card-details"]}>
          <div className={`${style["bat-card-set"]} ${style["category"]}`}>
            <Image
              unoptimized={true}
              alt="card"
              src={images.card}
              width="20"
              height="20"
            />
            <div className={style["category-info"]}>
              <h4>Category</h4>
              <h2>
                <span>{list.core_statistics?.category?.value} </span>
                {/* {list[activeSlide]?.signed_by[0].split(" ")[1]} */}
              </h2>
            </div>
          </div>
          {list?.signed_by?.length > 0 && (
            <div className={style["bat-card-set"]}>
              <h4>SIGNED BY ✦</h4>
              <h2>
                <span>{list?.signed_by[0].split(" ")[0]} </span>
                {list?.signed_by[0].split(" ")[1]}
              </h2>
            </div>
          )}
        </div>
      ) : (
        <>
          {!["Fusor", "Shot"].includes(list?.core_statistics?.role?.value) ? (
            <>
              <div className={style["player-details"]}>
                <div className={style["nft-details-row"]}>
                  <div className={style["stats-col"]}>
                    <div className={style["img-block"]}>
                      <Image
                        unoptimized={true}
                        alt="Trophy"
                        src={images.trophy}
                        width="200"
                        height="200"
                      />
                    </div>
                    <div className={style["info-block"]}>
                      <span className={style["highlight"]}>Rank</span>
                      <span>
                        {list?.core_statistics?.rank?.value}/{" "}
                        {list?.core_statistics.rank?.maximum}
                      </span>
                    </div>
                  </div>

                  <div className={style["stats-col"]}>
                    <div className={style["img-block"]}>
                      <Image
                        unoptimized={true}
                        alt="Star"
                        src={images.star}
                        width="200"
                        height="200"
                      />
                    </div>
                    <div className={style["info-block"]}>
                      <span className={style["highlight"]}>Level</span>
                      <span>{list?.core_statistics?.level?.value}</span>
                    </div>
                  </div>
                </div>
                <div className={style["nft-details-row"]}>
                  <div className={style["stats-col"]}>
                    <div className={style["img-block"]}>
                      {list?.core_statistics?.role?.value === "Bowler" && (
                        <>
                          <Image
                            unoptimized={true}
                            alt="Bowler"
                            src={images.right_bowl}
                            width="200"
                            height="200"
                          />
                        </>
                      )}
                      {list?.core_statistics?.role?.value === "Batsman" && (
                        <>
                          {list?.core_statistics?.dominant_hand?.value ===
                          "RH" ? (
                            <Image
                              unoptimized={true}
                              alt="Batsman"
                              src={images.right}
                              width="200"
                              height="200"
                            />
                          ) : (
                            <Image
                              unoptimized={true}
                              alt="Batsman"
                              src={images.left}
                              width="200"
                              height="200"
                            />
                          )}
                        </>
                      )}
                    </div>
                    <div className={style["info-block"]}>
                      <span className={style["highlight"]}>
                        {list?.core_statistics?.role?.value}
                      </span>
                      <span>
                        {list?.core_statistics?.role?.value === "Bowler"
                          ? list?.core_statistics?.bowling_style?.value
                          : list?.core_statistics?.dominant_hand?.value}
                      </span>
                    </div>
                  </div>

                  <div className={style["stats-col"]}>
                    <div className={style["img-block"]}>
                      <Image
                        unoptimized={true}
                        alt="Card"
                        src={images.card}
                        width="200"
                        height="200"
                      />
                    </div>
                    <div className={style["info-block"]}>
                      <span className={style["highlight"]}>Category</span>
                      <span> {list?.core_statistics?.category?.value}</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {!["Fusor"].includes(list?.core_statistics?.role?.value) && (
                <div className={style["player-details"]}>
                  <div className={style["nft-details-row"]}>
                    <div className={style["stats-col"]}>
                      <div className={style["img-block"]}>
                        <Image
                          unoptimized={true}
                          alt="Trophy"
                          src={NationalityData?.value}
                          width="200"
                          height="200"
                        />
                      </div>
                      <div className={style["info-block"]}>
                        <span className={style["highlight"]}>Nationality</span>
                        <span>{list?.core_statistics?.nationality?.value}</span>
                      </div>
                    </div>
                  </div>
                  <div className={style["nft-details-row"]}>
                    <div className={style["stats-col"]}>
                      <div className={style["img-block"]}>
                        <Image
                          unoptimized={true}
                          alt="Star"
                          src={images.hot_selling_calendar}
                          width="200"
                          height="200"
                        />
                      </div>
                      <div className={style["info-block"]}>
                        <span className={style["highlight"]}>Year</span>
                        <span>{list?.core_statistics?.year?.value}</span>
                      </div>
                    </div>
                  </div>
                  <div className={style["nft-details-row"]}>
                    <div className={style["stats-col"]}>
                      <div className={style["img-block"]}>
                        <Image
                          unoptimized={true}
                          alt="Card"
                          src={images.card}
                          width="200"
                          height="200"
                        />
                      </div>
                      <div className={style["info-block"]}>
                        <span className={style["highlight"]}>Category</span>
                        <span> {list?.core_statistics?.category?.value}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};
export default MobCarousel;

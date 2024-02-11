import Image from "next/image";
import Marquee from "react-fast-marquee";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { AiFillAndroid } from "react-icons/ai";

import Tournament from "./tournament";
import style from "./style.module.scss";
import images from "../../utils/images.json";
// import MCL from "../../images/mcl-game-launcher/mcl.png";
import { downloadApk, tournamentsApi } from "../../utils/base-methods";
import Link from "next/link";
import { useSelector } from "react-redux";
import { getAndroidAPK } from "../../redux/reducers/user_reducer";

const MclTournaments = (props) => {
  const [tournamentData, setTournamentData] = useState([]);
  const androidAPK = useSelector(getAndroidAPK);

  useEffect(() => {
    dataCheck(props.data?.data);
    // tournamentsTimer()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tournamentsTimer = async () => {
    try {
      let result = await tournamentsApi();
      // setTournamentData([]);
      dataCheck(result?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const dataCheck = (tournamentDetails) => {
    let finishedData = tournamentDetails?.finished;
    if (tournamentDetails?.active.length >= 1) {
      let appendData = [];
      if (tournamentDetails?.active.length === 1) {
        appendData.push({ name: "Up Next", schedule: true });
        setTournamentData([
          finishedData[0],
          ...tournamentDetails?.active,
          ...appendData,
        ]);
      } else {
        setTournamentData([finishedData[0], ...tournamentDetails?.active]);
      }
    } else {
      let reverseFinishedData = tournamentDetails?.finished.reverse() || [];
      let appendData = [];
      for (let load = 0; load < 1; load++) {
        appendData.push({ name: "Up Next", schedule: true });
      }
      setTournamentData([
        ...reverseFinishedData,
        // ...tournamentDetails?.active,
        ...appendData,
      ]);
    }
  };

  return (
    <>
      <section className={`${style["trailer_section"]} ${style["live"]}`}>
        <div className={style["trailer-container"]}>
          <div className="">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className={style["trailer-content"]}>
                <div
                  className={`${style["mock-device"]} ${style["mcl-logo-launch"]}`}
                >
                  <Image
                    unoptimized={true}
                    height={100}
                    width={100}
                    alt="MCL Icon"
                    src={images.mcl}
                  />
                </div>
                {tournamentData.length > 0 && (
                  <Swiper
                    className={`${style["tournament-list-carousel"]} tournaments-list-carousel`}
                    slidesPerView={3}
                    centeredSlides={true}
                    initialSlide={1}
                    pagination={{
                      clickable: true,
                    }}
                    modules={[Pagination]}
                    breakpoints={{
                      0: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                      },
                      600: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                      },
                      992: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                      },
                      1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                      },
                      1200: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                      },
                      1541: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                      },
                    }}
                    slideToClickedSlide
                  >
                    {tournamentData.map((data, index) => {
                      {
                        return (
                          <SwiperSlide
                            className={`${style["owl-item"]}`}
                            key={`swp-${index}`}
                          >
                            <Tournament
                              index={index}
                              statusChange={() => tournamentsTimer()}
                              tournamentData={data}
                            />
                          </SwiperSlide>
                        );
                      }
                    })}
                  </Swiper>
                )}
                <div className={style["marque-block"]}>
                  <Marquee pauseOnHover speed={100}>
                    <span>WANT TO PLAY? DOWNLOAD THE GAME NOW!</span>{" "}
                    <span>WANT TO PLAY? DOWNLOAD THE GAME NOW!</span>{" "}
                    <span>WANT TO PLAY? DOWNLOAD THE GAME NOW!</span>{" "}
                    <span>WANT TO PLAY? DOWNLOAD THE GAME NOW!</span>{" "}
                  </Marquee>
                </div>

                {/* <a
                  href={process.env.NEXT_PUBLIC_MCL_GAME_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className={`${style["download-icon-btn"]} ${style["black-btn"]} fs-5 fw-bold`}
                >
                  <span>
                    {" "}
                    <AiFillAndroid /> Download MCL Game
                  </span>
                </a> */}

                <a
                  href={androidAPK}
                  // target="_blank"
                  rel="noreferrer"
                  className={`${style["download-icon-btn"]} ${style["black-btn"]} fs-5 fw-bold`}
                >
                  <span>
                    {" "}
                    <AiFillAndroid /> Download MCL Game
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MclTournaments;

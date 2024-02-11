import Image from "next/image";
import { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import CryptoGraphTable from "../crypto-graph-table";

import style from "./style.module.scss";
import "swiper/css/pagination";

const Flow = ({
  classNames,
  title = "",
  themeTitle = "",
  description = "",
  images = [] || {},
  seperator = null,
  showGraph = false,
  componentType = "",
}) => {
  const isMultipleImagesPresent = Array.isArray(images) && images.length > 1;

  return (
    <section className={`${style["flow-section"]} ${classNames}`}>
      {(title || themeTitle) && (
        <h4 className={`${style["title"]} title`}>
          {title} <span>{themeTitle}</span>
        </h4>
      )}
      {description && (
        <p className={`${style["description"]} description`}>{description}</p>
      )}
      {componentType === "carousal" ? (
        <Swiper
          className={`${style["hero-carousel"]}`}
          slidesPerView={1}
          modules={[Navigation, Autoplay, Pagination]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          speed={500}
          loop
          uniqueNavElements
        >
          {images.map((image, i) => (
            <SwiperSlide key={i}>
              <Image
                unoptimized={true}
                className="swiper-image-bat"
                src={image.src}
                alt="flow Image"
                height={1000}
                width={1000}
              ></Image>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : isMultipleImagesPresent ? (
        <div className={`${style["image-block"]} image-block `}>
          {images.map(
            (image, i) =>
              image?.src && (
                <>
                  <div
                    className={`${style["content-container"]} content-container`}
                  >
                    <div
                      className={`${style["image-container"]} image-container`}
                    >
                      <Image
                        unoptimized={true}
                        className={`${style["image"]} image`}
                        src={image?.src}
                        alt="Crypto Bat NFTs"
                        height={1000}
                        width={1000}
                      ></Image>
                    </div>
                    <p
                      className={`${style["image-description"]} image-description`}
                    >
                      {image?.description}
                    </p>
                  </div>
                  {seperator && i < images.length - 1 && seperator}
                </>
              )
          )}
        </div>
      ) : (
        <div className={`${style["image-block"]} image-block`}>
          {images?.src && (
            <Image
              unoptimized={true}
              className={`${style["image-single"]} image-single`}
              src={images?.src}
              alt="Crypto Bat NFTs"
              height={1000}
              width={1000}
            ></Image>
          )}
          {showGraph && <CryptoGraphTable />}
        </div>
      )}
    </section>
  );
};

export default Flow;

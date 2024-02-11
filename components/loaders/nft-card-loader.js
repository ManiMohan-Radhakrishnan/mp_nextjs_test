import ContentLoader from "react-content-loader";

import useWindowUtils from "../../hooks/useWindowUtils";
import style from "./style.module.scss";

const NFTCardLoader = (props) => {
  const { width } = useWindowUtils();
  const isMobile = width <= 576;
  const isTab = width <= 991;
  const is1K = width <= 1200;
  const is2K = width <= 1440;
  const is4K = width <= 3560;
  return (
    <>
      {isMobile ? (
        <>
          <ContentLoader
            viewBox="0 0 510 610"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]}`}
          >
            <rect x="0" y="5" rx="8" ry="8" width="510" height="600" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 0 510 610"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]}`}
          >
            <rect x="0" y="5" rx="8" ry="8" width="510" height="600" />
          </ContentLoader>
        </>
      ) : isTab ? (
        <ContentLoader
          viewBox="0 0 900 600"
          speed={1}
          backgroundColor="#4d4a5f"
          foregroundColor="#212031"
          className={`${style["mb-load"]}`}
          {...props}
        >
          <rect x="0" y="5" rx="10" ry="10" width="440" height="580" />
          <rect x="460" y="5" rx="10" ry="10" width="440" height="580" />
        </ContentLoader>
      ) : is1K ? (
        <ContentLoader
          viewBox="0 20 830 550"
          speed={1}
          backgroundColor="#4d4a5f"
          foregroundColor="#212031"
          className={`${style["mb-load"]}`}
          {...props}
        >
          <rect x="0" y="5" rx="10" ry="10" width="400" height="550" />
          <rect x="420" y="5" rx="10" ry="10" width="400" height="550" />
        </ContentLoader>
      ) : is2K ? (
        <>
          <ContentLoader
            viewBox="0 6 1100 540"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]} mt-1`}
            {...props}
          >
            <rect x="0" y="5" rx="8" ry="8" width="350" height="520" />
            <rect x="370" y="5" rx="8" ry="8" width="350" height="520" />
            <rect x="740" y="5" rx="8" ry="8" width="350" height="520" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 0 1100 610"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]} mt-1`}
            {...props}
          >
            <rect x="0" y="5" rx="8" ry="8" width="350" height="520" />
            <rect x="370" y="5" rx="8" ry="8" width="350" height="520" />
            <rect x="740" y="5" rx="8" ry="8" width="350" height="520" />
          </ContentLoader>
        </>
      ) : is4K ? (
        <>
          <ContentLoader
            viewBox="0 6 2000 890"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            {...props}
          >
            <rect x="0" y="5" rx="10" ry="10" width="32.5%" height="850" />
            <rect x="34.25%" y="5" rx="10" ry="10" width="32.5%" height="850" />
            <rect x="68.25%" y="5" rx="10" ry="10" width="32.5%" height="850" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 6 2000 910"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            {...props}
          >
            <rect x="0" y="5" rx="10" ry="10" width="32.5%" height="850" />
            <rect x="34.25%" y="5" rx="10" ry="10" width="32.5%" height="850" />
            <rect x="68.25%" y="5" rx="10" ry="10" width="32.5%" height="850" />
          </ContentLoader>
        </>
      ) : null}
    </>
  );
};

export default NFTCardLoader;

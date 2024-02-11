import ContentLoader from "react-content-loader";

import useWindowUtils from "../../hooks/useWindowUtils";
import style from "./style.module.scss";

const NFTMiniCardLoader = (props) => {
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
            viewBox="0 0 900 550"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]}`}
          >
            <rect x="0" y="5" rx="8" ry="8" width="45%" height="500" />
            <rect x="50%" y="5" rx="8" ry="8" width="45%" height="500" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 0 900 550"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]}`}
          >
            <rect x="0" y="5" rx="8" ry="8" width="45%" height="500" />
            <rect x="50%" y="5" rx="8" ry="8" width="45%" height="500" />
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
          <rect x="0" y="5" rx="8" ry="8" width="33%" height="320" />
          <rect x="33.33%" y="5" rx="8" ry="8" width="33%" height="320" />
          <rect x="66.66%" y="5" rx="8" ry="8" width="33%" height="320" />
        </ContentLoader>
      ) : is1K ? (
        <>
          <ContentLoader
            viewBox="0 6 1600 540"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]} mt-1`}
            {...props}
          >
            <rect x="0" y="5" rx="8" ry="8" width="33%" height="320" />
            <rect x="33.33%" y="5" rx="8" ry="8" width="33%" height="320" />
            <rect x="66.66%" y="5" rx="8" ry="8" width="33%" height="320" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 6 1600 540"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]} mt-1`}
            {...props}
          >
            <rect x="0" y="5" rx="8" ry="8" width="30%" height="520" />
            <rect x="33.33%" y="5" rx="8" ry="8" width="30%" height="520" />
            <rect x="66.66%" y="5" rx="8" ry="8" width="30%" height="520" />
          </ContentLoader>
        </>
      ) : is2K ? (
        <>
          <ContentLoader
            viewBox="0 6 2000 550"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            {...props}
          >
            <rect x="0" y="5" rx="10" ry="10" width="22%" height="500" />
            <rect x="25%" y="5" rx="10" ry="10" width="22%" height="500" />
            <rect x="50%" y="5" rx="10" ry="10" width="22%" height="500" />
            <rect x="75%" y="5" rx="10" ry="10" width="22%" height="500" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 6 2000 550"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            {...props}
          >
            <rect x="0" y="5" rx="10" ry="10" width="22%" height="500" />
            <rect x="25%" y="5" rx="10" ry="10" width="22%" height="500" />
            <rect x="50%" y="5" rx="10" ry="10" width="22%" height="500" />
            <rect x="75%" y="5" rx="10" ry="10" width="22%" height="500" />
          </ContentLoader>
        </>
      ) : is4K ? (
        <>
          <ContentLoader
            viewBox="0 6 2000 550"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            {...props}
          >
            <rect x="0" y="5" rx="10" ry="10" width="22%" height="500" />
            <rect x="25%" y="5" rx="10" ry="10" width="22%" height="500" />
            <rect x="50%" y="5" rx="10" ry="10" width="22%" height="500" />
            <rect x="75%" y="5" rx="10" ry="10" width="22%" height="500" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 6 2000 550"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            {...props}
          >
            <rect x="0" y="5" rx="10" ry="10" width="22%" height="500" />
            <rect x="25%" y="5" rx="10" ry="10" width="22%" height="500" />
            <rect x="50%" y="5" rx="10" ry="10" width="22%" height="500" />
            <rect x="75%" y="5" rx="10" ry="10" width="22%" height="500" />
          </ContentLoader>
        </>
      ) : null}
    </>
  );
};

export default NFTMiniCardLoader;

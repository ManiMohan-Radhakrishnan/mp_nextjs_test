import ContentLoader from "react-content-loader";

import useWindowUtils from "../../hooks/useWindowUtils";
import style from "./style.module.scss";

const NFTListLoader = (props) => {
  const { width } = useWindowUtils();
  const isMobile = width <= 576;
  const isTab = width <= 991;
  const is1K = width <= 1200;
  const is2K = width <= 1440;
  const is4K = width <= 3560;
  return (
    <>
      {isMobile && isTab ? (
        <>
          <ContentLoader
            viewBox="0 0 1920 80"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]}`}
          >
            <rect x="0" y="5" rx="8" ry="8" width="1920" height="80" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 0 1920 80"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]}`}
          >
            <rect x="0" y="5" rx="8" ry="8" width="1920" height="80" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 0 1920 80"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]}`}
          >
            <rect x="0" y="5" rx="8" ry="8" width="1920" height="80" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 0 1920 80"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]}`}
          >
            <rect x="0" y="5" rx="8" ry="8" width="1920" height="80" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 0 1920 80"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]}`}
          >
            <rect x="0" y="5" rx="8" ry="8" width="1920" height="80" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 0 1920 80"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]}`}
          >
            <rect x="0" y="5" rx="8" ry="8" width="1920" height="80" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 0 1920 80"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]}`}
          >
            <rect x="0" y="5" rx="8" ry="8" width="1920" height="80" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 0 1920 80"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]}`}
          >
            <rect x="0" y="5" rx="8" ry="8" width="1920" height="80" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 0 1920 80"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]}`}
          >
            <rect x="0" y="5" rx="8" ry="8" width="1920" height="80" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 0 1920 80"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]}`}
          >
            <rect x="0" y="5" rx="8" ry="8" width="1920" height="80" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 0 1920 80"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]}`}
          >
            <rect x="0" y="5" rx="8" ry="8" width="1920" height="80" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 0 1920 80"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]}`}
          >
            <rect x="0" y="5" rx="8" ry="8" width="1920" height="80" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 0 1920 80"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]}`}
          >
            <rect x="0" y="5" rx="8" ry="8" width="1920" height="80" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 0 1920 80"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]}`}
          >
            <rect x="0" y="5" rx="8" ry="8" width="1920" height="80" />
          </ContentLoader>
        </>
      ) : is1K && is2K && is4K ? (
        <>
          <ContentLoader
            viewBox="0 0 1920 80"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]}`}
          >
            <rect x="0" y="5" rx="8" ry="8" width="1920" height="80" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 0 1920 80"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]}`}
          >
            <rect x="0" y="5" rx="8" ry="8" width="1920" height="80" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 0 1920 80"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]}`}
          >
            <rect x="0" y="5" rx="8" ry="8" width="1920" height="80" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 0 1920 80"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]}`}
          >
            <rect x="0" y="5" rx="8" ry="8" width="1920" height="80" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 0 1920 80"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]}`}
          >
            <rect x="0" y="5" rx="8" ry="8" width="1920" height="80" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 0 1920 80"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]}`}
          >
            <rect x="0" y="5" rx="8" ry="8" width="1920" height="80" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 0 1920 80"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]}`}
          >
            <rect x="0" y="5" rx="8" ry="8" width="1920" height="80" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 0 1920 80"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]}`}
          >
            <rect x="0" y="5" rx="8" ry="8" width="1920" height="80" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 0 1920 80"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]}`}
          >
            <rect x="0" y="5" rx="8" ry="8" width="1920" height="80" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 0 1920 80"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]}`}
          >
            <rect x="0" y="5" rx="8" ry="8" width="1920" height="80" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 0 1920 80"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]}`}
          >
            <rect x="0" y="5" rx="8" ry="8" width="1920" height="80" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 0 1920 80"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]}`}
          >
            <rect x="0" y="5" rx="8" ry="8" width="1920" height="80" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 0 1920 80"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]}`}
          >
            <rect x="0" y="5" rx="8" ry="8" width="1920" height="80" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 0 1920 80"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]}`}
          >
            <rect x="0" y="5" rx="8" ry="8" width="1920" height="80" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 0 1920 80"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]}`}
          >
            <rect x="0" y="5" rx="8" ry="8" width="1920" height="80" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 0 1920 80"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]}`}
          >
            <rect x="0" y="5" rx="8" ry="8" width="1920" height="80" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 0 1920 80"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]}`}
          >
            <rect x="0" y="5" rx="8" ry="8" width="1920" height="80" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 0 1920 80"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]}`}
          >
            <rect x="0" y="5" rx="8" ry="8" width="1920" height="80" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 0 1920 80"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]}`}
          >
            <rect x="0" y="5" rx="8" ry="8" width="1920" height="80" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 0 1920 80"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]}`}
          >
            <rect x="0" y="5" rx="8" ry="8" width="1920" height="80" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 0 1920 80"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]}`}
          >
            <rect x="0" y="5" rx="8" ry="8" width="1920" height="80" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 0 1920 80"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]}`}
          >
            <rect x="0" y="5" rx="8" ry="8" width="1920" height="80" />
          </ContentLoader>
        </>
      ) : (
        <>
          <ContentLoader
            viewBox="0 0 1920 100"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]}`}
          >
            <rect x="0" y="5" rx="8" ry="8" width="1920" height="80" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 0 1920 100"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]}`}
          >
            <rect x="0" y="5" rx="8" ry="8" width="1920" height="80" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 0 1920 100"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]}`}
          >
            <rect x="0" y="5" rx="8" ry="8" width="1920" height="80" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 0 1920 100"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]}`}
          >
            <rect x="0" y="5" rx="8" ry="8" width="1920" height="80" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 0 1920 100"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]}`}
          >
            <rect x="0" y="5" rx="8" ry="8" width="1920" height="80" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 0 1920 100"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]}`}
          >
            <rect x="0" y="5" rx="8" ry="8" width="1920" height="80" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 0 1920 100"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]}`}
          >
            <rect x="0" y="5" rx="8" ry="8" width="1920" height="80" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 0 1920 100"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]}`}
          >
            <rect x="0" y="5" rx="8" ry="8" width="1920" height="80" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 0 1920 100"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]}`}
          >
            <rect x="0" y="5" rx="8" ry="8" width="1920" height="80" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 0 1920 100"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]}`}
          >
            <rect x="0" y="5" rx="8" ry="8" width="1920" height="80" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 0 1920 100"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]}`}
          >
            <rect x="0" y="5" rx="8" ry="8" width="1920" height="80" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 0 1920 100"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]}`}
          >
            <rect x="0" y="5" rx="8" ry="8" width="1920" height="80" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 0 1920 100"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]}`}
          >
            <rect x="0" y="5" rx="8" ry="8" width="1920" height="80" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 0 1920 100"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={`${style["mb-load"]}`}
          >
            <rect x="0" y="5" rx="8" ry="8" width="1920" height="80" />
          </ContentLoader>
        </>
      )}
    </>
  );
};

export default NFTListLoader;

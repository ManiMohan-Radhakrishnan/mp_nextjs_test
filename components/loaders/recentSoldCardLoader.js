import ContentLoader from "react-content-loader";

import useWindowUtils from "../../hooks/useWindowUtils";
import style from "./style.module.scss";

const RecentSoldLoader = (props) => {
  const { width } = useWindowUtils();
  const isMobile = width <= 575;
  const isTab = width <= 991;
  const isLaptop = width <= 1199;
  const is2K = width <= 1640;
  const is4K = width <= 3560;
  return (
    <>
      {isMobile ? (
        <>
          <ContentLoader
            viewBox="0 0 200 210"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            // className="mb-load"
          >
            <rect x="2" y="5" rx="3" ry="3" width="198" height="205" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 0 200 210"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            // className="mb-load"
          >
            <rect x="2" y="10" rx="3" ry="3" width="198" height="205" />
          </ContentLoader>
        </>
      ) : isTab ? (
        <ContentLoader
          viewBox="0 50 900 630"
          speed={1}
          backgroundColor="#4d4a5f"
          foregroundColor="#212031"
          // className="mb-load"
          {...props}
        >
          <rect x="0" y="5" rx="12" ry="12" width="435" height="600" />
          <rect x="455" y="5" rx="12" ry="12" width="435" height="600" />
        </ContentLoader>
      ) : isLaptop ? (
        <ContentLoader
          viewBox="0 0 1200 510"
          // width={1200}
          // height={510}
          backgroundColor="#4d4a5f"
          foregroundColor="#212031"
          // className="mb-load-1"
          {...props}
        >
          <rect x="0" y="5" rx="8" ry="8" width="390" height="500" />
          <rect x="410" y="5" rx="8" ry="8" width="390" height="500" />
          <rect x="820" y="5" rx="8" ry="8" width="390" height="500" />
        </ContentLoader>
      ) : is2K ? (
        <>
          <ContentLoader
            viewBox="0 0 1600 510"
            // width={1600}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            className={style["mb-load-1"]}
            {...props}
          >
            <rect x="0" y="0" rx="8" ry="8" width="382" height="500" />
            <rect x="407" y="0" rx="8" ry="8" width="382" height="500" />
            <rect x="814" y="0" rx="8" ry="8" width="382" height="500" />
            <rect x="1218" y="0" rx="8" ry="8" width="382" height="500" />
          </ContentLoader>
        </>
      ) : is4K ? (
        <>
          <ContentLoader
            viewBox="0 20 900 310"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            {...props}
          >
            <rect x="0" y="5" rx="2" ry="2" width="220" height="1000" />
            <rect x="230" y="5" rx="2" ry="2" width="220" height="1000" />
            <rect x="460" y="5" rx="2" ry="2" width="220" height="1000" />
            <rect x="690" y="5" rx="2" ry="2" width="220" height="1000" />
          </ContentLoader>
          <ContentLoader
            viewBox="0 20 900 310"
            speed={1}
            backgroundColor="#4d4a5f"
            foregroundColor="#212031"
            {...props}
          >
            <rect x="0" y="5" rx="2" ry="2" width="220" height="1000" />
            <rect x="230" y="5" rx="2" ry="2" width="220" height="1000" />
            <rect x="460" y="5" rx="2" ry="2" width="220" height="1000" />
            <rect x="690" y="5" rx="2" ry="2" width="220" height="1000" />
          </ContentLoader>
        </>
      ) : null}
    </>
  );
};

export default RecentSoldLoader;

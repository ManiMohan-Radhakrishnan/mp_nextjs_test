import Image from "next/image";
import NFTPropPills from "../nft-prop-pills";
import images from "../../utils/images.json";

const NFTProperties = ({ properties = [], statistics }) => {
  return (
    <div className={"chain-attributes"}>
      <div className={`chain-att-title rank-title`}>
        Properties
        {statistics?.rank && (
          <div className={"rank-block"}>
            <Image
              unoptimized={true}
              height={20}
              width={20}
              className="me-2"
              src={images.reward}
              alt="trophy"
            />
            <span className={"title"}>Rank</span>
            <span className={"rank-value"}>
              {statistics?.rank?.value}/{statistics?.rank?.maximum}
            </span>
          </div>
        )}
      </div>
      <div className={`chain-att-content mt-2`}>
        {properties.map((property, i) => {
          return (
            <NFTPropPills
              key={`property-${i}`}
              title={Object.keys(property)}
              property={property[Object.keys(property)]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NFTProperties;

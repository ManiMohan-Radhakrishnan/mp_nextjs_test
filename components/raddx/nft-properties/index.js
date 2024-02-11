import Image from "next/image";
import { FaAsterisk } from "react-icons/fa";

import NFTPropPills from "../../nft-prop-pills";

import images from "../../../utils/images.json";

const NFTProperties = ({ role = "", properties = [], statistics, nftType }) => {
  const isLand = role === "Land";
  return (
    <div className={"chain-attributes"}>
      <div className={`chain-att-title rank-title`}>
        {isLand ? "LAND NFT PROPERTIES" : "Properties"}
        {statistics?.rank && (
          <div className={"rank-block"}>
            <Image
              unoptimized={true}
              width={20}
              height={20}
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
      {nftType?.categorable_type === "RaddxWeapon" && (
        <span>
          <FaAsterisk color="white" fontSize="0.8rem" cursor="pointer" /> -{" "}
          <span style={{ "font-size": "0.9rem" }}>
            Subjected to change based on the game beta testing.
          </span>
        </span>
      )}
    </div>
  );
};

export default NFTProperties;

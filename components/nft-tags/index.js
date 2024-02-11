import Tag from "./tag";
// import style from "./style.module.scss";

const NFTTags = ({ tags }) => {
  return (
    <div className={"nft-tags"}>
      <div className={"nft-tag-title"}>
        Tags
        {tags && <span className={"title-count"}>({tags.length})</span>}
      </div>
      <div className={`nft-tag-content mt-2`}>
        {tags && tags.map((tag, i) => <Tag key={`tag${i}`} text={tag} />)}
      </div>
    </div>
  );
};

export default NFTTags;

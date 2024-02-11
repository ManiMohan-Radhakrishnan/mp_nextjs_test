import Image from "next/image";
import { useSelector } from "react-redux";

import images from "../../utils/images.json";
import style from "./style.module.scss";

const UserBanner = ({ userDetail }) => {
  const { user } = useSelector((state) => state.user.data);
  return (
    <>
      <article
        className={style["user-hero-section"]}
        style={{
          backgroundImage: `url("${
            !userDetail?.users[0]?.private && userDetail?.users[0]?.banner_url
              ? userDetail?.users[0]?.banner_url
              : user?.slug === userDetail?.users[0]?.slug &&
                userDetail?.users[0]?.banner_url
              ? userDetail?.users[0]?.banner_url
              : images.userBanner
          }")`,
        }}
      ></article>
      {userDetail && (
        <article className={style["user-info-box"]}>
          <Image
            unoptimized={true}
            height={"100"}
            width={"100"}
            className={style["user-info-image"]}
            src={
              !userDetail?.users[0]?.private && userDetail?.users[0]?.avatar_url
                ? userDetail?.users[0]?.avatar_url
                : user?.slug === userDetail?.users[0]?.slug &&
                  userDetail?.users[0]?.avatar_url
                ? userDetail?.users[0]?.avatar_url
                : images.userJPG
            }
            alt="user-info"
          />
          <div>
            {userDetail?.users[0]?.slug && (
              <h6 className={style["user-info-subname"]}>
                {user?.slug === userDetail?.users[0]?.slug
                  ? `@${user?.first_name}${user?.last_name}`
                  : userDetail?.users[0]?.user_name}
              </h6>
            )}

            {/* <h4 className={style["user-info-name"]}>James</h4> */}
          </div>
          {/* <ul className={style["user-info-list"]}>
            <li>
              <span className="key">Favorites</span>
              <span className="value">
                {userDetail.faved_count}
              </span>
            </li>
            <li>
              <span className="key">Owned</span>
              <span className="value">
                {userDetail.owned_count}
              </span>
            </li>
          </ul> */}
        </article>
      )}
    </>
  );
};

export default UserBanner;

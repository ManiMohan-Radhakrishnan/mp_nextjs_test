import Image from "next/image";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import images from "../../../utils/images.json";

const BidName = ({
  imgUrl,
  text,
  isTable = false,
  slug,
  static_name = false,
}) => {
  const router = useRouter();
  const { user } = useSelector((state) => state.user.data);

  const username =
    user?.slug === slug ? `@${user?.first_name + user?.last_name}` : text;
  return isTable ? (
    <div className="expand-history-owner">
      <Image
        unoptimized={true}
        height={30}
        width={20}
        src={imgUrl ? imgUrl : images.userJPG}
        alt="nfImages"
        loading="lazy"
      />
      <div>
        <div
          className="text-secondary"
          role={static_name ? "none" : "button"}
          onClick={() =>
            !static_name && user?.slug === slug
              ? window.open(
                  `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/profile`
                )
              : router.push(`/user/${slug}/details`)
          }
        >
          {username}
        </div>
      </div>
    </div>
  ) : (
    <span
      className="text-secondary"
      role={static_name ? "none" : "button"}
      onClick={() =>
        !static_name && user?.slug === slug
          ? window.open(
              `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/profile`
            )
          : router.push(`/user/${slug}/details`)
      }
    >
      {username}
    </span>
  );
};

export default BidName;

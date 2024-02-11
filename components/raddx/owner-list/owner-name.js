import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import images from "../../../utils/images.json";

const OwnerName = ({
  imgUrl,
  text,
  isTable = false,
  slug,
  static_name = false,
  seller = false,
}) => {
  const router = useRouter();
  const { user } = useSelector((state) => state.user.data);

  const username =
    user?.slug === slug ? `@${user?.first_name + user?.last_name}` : text;

  return isTable ? (
    <div className="expand-history-owner">
      <Image
        unoptimized={true}
        width={30}
        height={30}
        src={imgUrl ? imgUrl : images.userJPG}
        alt="nfImages"
        loading="lazy"
      />
      <div>
        <div
          className="text-secondary"
          role={static_name ? "none" : "button"}
          onClick={() => {
            if (seller) {
              router.push(`/user/${slug}/details`);
            } else {
              !static_name && user?.slug === slug
                ? window.open(
                    `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/profile`
                  )
                : router.push(`/user/${slug}/details`);
            }
          }}
        >
          {username}
        </div>
      </div>
    </div>
  ) : (
    <span
      className="text-secondary"
      role={static_name ? "none" : "button"}
      onClick={() => {
        if (seller) {
          router.push(`/user/${slug}/details`);
        } else {
          !static_name && user?.slug === slug
            ? window.open(
                `${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/accounts/profile`
              )
            : router.push(`/user/${slug}/details`);
        }
      }}
    >
      {username}
    </span>
  );
};

export default OwnerName;

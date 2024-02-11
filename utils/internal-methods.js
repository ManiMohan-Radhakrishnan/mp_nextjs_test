import appAxiosInternal from "./axios-internal-utils";

import { ParamsSerialize } from "./params-serialize";

export const nftShowAllApi = ({ page, per_page, filter = {}, sort }) =>
  appAxiosInternal.get(`/dashboard/index?page=${page}&per_page=${per_page}`, {
    params: {
      filter,
      sort,
      time: new Date().getTime(),
    },
    paramsSerializer: (params) => {
      return ParamsSerialize(params);
    },
  });

export const nftExplorePageInternalApi = ({
  page,
  per_page,
  filter = {},
  sort,
}) =>
  appAxiosInternal.get(
    `/dashboard/evqcrhcrwe?page=${page}&per_page=${per_page}`,
    {
      params: {
        filter,
        sort,
        time: new Date().getTime(),
      },
      paramsSerializer: (params) => {
        return ParamsSerialize(params);
      },
    }
  );

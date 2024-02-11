import React from "react";
import { useRouter } from "next/router";

const useQuery = () => {
  const search = useRouter();

  return React.useMemo(() => new URLSearchParams(search), [search]);
};

export default useQuery;

import { useRouter } from "next/router";
const Page = () => {
  const router = useRouter();
  return <div>{router.pathname}</div>;
};

export default Page;

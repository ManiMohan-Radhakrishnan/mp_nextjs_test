import { useEffect, useRef } from "react";

const InnerHTML = ({ content = "" }) => {
  const ref = useRef();
  useEffect(() => {
    ref.current.innerHTML = content;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <span ref={ref}></span>;
};

export default InnerHTML;

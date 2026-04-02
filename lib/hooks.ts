import { useEffect, useState } from "react";

const useWidth = () => {
  const [width, setWidth] = useState(768);
  useEffect(() => {
    const findWidth = () => setWidth(window.innerWidth);
    findWidth();
    window.addEventListener("resize", findWidth);

    return () => window.removeEventListener("resize", findWidth);
  }, []);
  return width;
};

export default useWidth;

import { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    document.title = "صفحه اصلی فروشگاه";
  }, []);
  return <div></div>;
};

export default HomePage;

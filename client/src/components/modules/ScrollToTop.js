import { useEffect } from "react";
import { useLocation } from "react-router";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.querySelector("#navbarSupportedContent").classList.remove("show");
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;

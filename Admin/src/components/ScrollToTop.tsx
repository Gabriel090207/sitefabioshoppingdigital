import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    requestAnimationFrame(() => {
      // scroll da página inteira
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      // scroll do layout admin (se existir)
      const content = document.getElementById("admin-content");
      if (content) {
        content.scrollTop = 0;
      }
    });
  }, [pathname]);

  return null;
}

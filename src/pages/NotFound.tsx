import { useEffect } from "react";
import { useLocation } from "react-router-dom";


export default function NotFound() {
  const location = useLocation();
  useEffect(() => {
    const path = location.pathname + location.search;
    const url = encodeURIComponent(path);
    window.location.replace(`${import.meta.env.BASE_URL}404.html?url=${url}`);
  }, [location]);

  return null;
}

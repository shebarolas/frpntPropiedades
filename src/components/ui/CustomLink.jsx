import { useLocation } from "react-router";
import { Link } from "react-router-dom";

export default function CustomLink({ url, label = "Inicio" }) {
  const location = useLocation();

  return (
    <Link
      to={url}
      className={`text-sm ${
        location.pathname !== "/" &&
        "bg-white text-black transition-all duration-300 ease-in-out hover:text-primary"
      }`}
    >
      {label}
    </Link>
  );
}

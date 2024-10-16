import { Link } from "react-router-dom";

const SidebarLink = ({ to, imgSrc, text, open }) => {
  return (
    <Link
      to={to}
      className={`flex items-center py-4 px-4 hover:bg-blue-500 text-white mb-5 mt-16 font-normal rounded-md cursor-pointer ${
        !open ? "justify-center" : ""
      }`}
    >
      <img
        src={imgSrc}
        className={`mr-2 transition-all duration-300 ${
          open ? "h-8 w-8" : "h-6 w-6"
        }`}
        alt={text}
      />
      <span className={`${!open ? "hidden" : "block"}`}>{text}</span>
    </Link>
  );
};

export default SidebarLink;

import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const handleClick = () => {
    window.open("https://github.com/Abbas-Khann", "_blank");
  };

  return (
    <footer className="sticky top-full bg-transparent px-2 sm:px-14 py-2 mt-12 flex items-center justify-between border-t-[0.1px]">
      <p className="text-white font-extralight">
        Built with ❤️ by{" "}
        <span className="cursor-pointer text-blue-400" onClick={handleClick}>
          Abbas Khan
        </span>
      </p>
      <div className="flex items-center">
        <a
          href="https://twitter.com/KhanAbbas201"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white mx-4 hover:text-gray-400"
        >
          <FaInstagram className="text-2xl" />
        </a>
        <a
          href="https://twitter.com/KhanAbbas201"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white mx-4 hover:text-gray-400"
        >
          <FaTwitter className="text-2xl" />
        </a>
        <a
          href="https://github.com/Abbas-Khann"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white mx-4 hover:text-gray-400"
        >
          <FaGithub className="text-2xl" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;

import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      <img
        src="/Elite-Arena-Logo.png"
        alt="Elite Arena Logo"
        className="w-32"
      />
    </Link>
  );
};

export default Logo;

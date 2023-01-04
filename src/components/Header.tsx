import React from "react";
import { Link } from "raviger";

import logo from "../assets/logo.png";

const routeLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "https://dharm.netlify.app" },
];

const Header = () => {
  return (
    <div className="flex justify-between gap-2 items-center">
      <img
        src={logo}
        alt="React Logo"
        className="animate-spin h-14 w-14"
        style={{ animation: "spin 0.3s linear " }}
      />
      <div className="flex gap-3">
        {routeLinks.map((link) => (
          <div className="flex-1" key={link.name}>
            <Link
              className="text-center block border-white rounded-full text-black"
              href={link.path}
            >
              {link.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  //toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navitems = [
    { link: "Home", path: "/" },
    { link: "Category", path: "/category" },
    { link: "Products", path: "/products" },
    { link: "Purchase", path: "/purchase" },
    { link: "Customers", path: "/customers" },
    { link: "Suppliers", path: "/suppliers" },
    { link: "Sales", path: "/sales" },
  ];

  return (
    <header>
      <nav>
        <div > 
          {/* nav items */}
          <ul>
            {navitems.map(({ link, path }) => (
              <Link key={path} to={path} className="flex flex-col h-max text-base text-black px-5 cursor-pointer hover:text-blue-700">
                {link}
              </Link>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default sidebar;

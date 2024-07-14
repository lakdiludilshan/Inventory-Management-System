import React, { useState, useEffect } from "react";
import { Link, useLocation} from "react-router-dom";

const sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const location = useLocation();

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
    { link: "Home", path: "/", },
    { link: "Category", path: "/category" },
    { link: "Products", path: "/products" },
    { link: "Purchase", path: "/purchase" },
    { link: "Customers", path: "/customers" },
    { link: "Suppliers", path: "/suppliers" },
    { link: "Sales", path: "/sales" },
    { link: "User", path: "/user" },
    { link: "Report", path: "/report" },
  ];

  return (
    <div className="h-full w-full bg-blue-950 border-0" >
    <header >
      <nav>
        <div>
          <div className="flex-col flex-auto items-center justify-center py-4 w-full mx-auto">
            <div className="bg-white rounded-full w-20 h-20 flex-auto items-center justify-center mx-auto">
              {/* Add your logo here */}
            </div>
            <div className="flex w-full items-center justify-center mx-auto ">
              <h1 className="text-white text-2xl font-bold mt-2">Lakdilu Dilshan</h1>
            </div>
          </div>
        </div>
        <div className="flex-auto items-center justify-center py-3 h-full w-full mx-auto my-auto"> 
          {/* nav items */}
          <ul>
            {navitems.map(({ link, path }) => (
              <Link 
              key={path} 
              to={path} 
              className={`flex flex-col flex-auto items-center justify-center h-max text-base text-white px-5 cursor-pointer hover:bg-blue-900 py-2 border border-gray-900 ${
            location.pathname === path ? 'bg-blue-900' : ''}`} >
                {link}
              </Link>
            ))}
          </ul>
        </div>
      </nav>
    </header>
    </div>
  );
};

export default sidebar;

import { Switch } from "@/components/ui/switch";
import { FaHamburger } from "react-icons/fa";
import { useState } from "react";
import ResponsiveNavBar from "./ResponsiveNavBar";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({ darkMode, handleDarkMode }) => {
  const [showResponsiveNav, setShowResponsiveNav] = useState(false);

  const toggleResponsiveNav = () => {
    setShowResponsiveNav((prev) => !prev);
  };

  return (
    <>
      <nav className="max-container py-6 flex justify-between items-center gap-6 sticky top-0 z-10 bg-[#FFFFFF] dark:bg-[#141624] pl-[2.5rem] pr-[2.5rem]">
        <Link to="/" className="text-[#141624] text-2xl font-semibold dark:text-[#FFFFFF]">
          MindFolio
        </Link>

        <ul className="flex items-center justify-end gap-5 text-[#3B3C4A] lg:flex-1 max-md:hidden dark:text-[#FFFFFF]">
          {/* <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-600 text-white px-4 py-1.5 rounded-[5px] font-medium transition"
                  : "text-[#3B3C4A] dark:text-[#f5f5f6] hover:text-blue-600 transition"
              }
            >
              Hi, Manu
            </NavLink>
          </li> */}

          <li>Logout</li>
          <li>Login</li>
          <li>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-600 text-white px-4 py-1.5 rounded-[5px] font-medium transition"
                  : "text-[#3B3C4A] dark:text-[#f5f5f6] hover:text-blue-600 transition"
              }
            >
              Register
            </NavLink>
          </li>
          <li className="font-semibold">Create post</li>
        </ul>

        {/* Theme Switch */}
        <Switch
          checked={darkMode}
          onCheckedChange={handleDarkMode}
          className={`transition-all duration-300 ${darkMode ? 'bg-white' : 'bg-black'}`}
        />

        {/* Hamburger Icon */}
        <FaHamburger
          onClick={toggleResponsiveNav}
          className="text-2xl cursor-pointer hidden max-md:block dark:text-white"
        />
      </nav>

      {/* Conditionally show ResponsiveNavBar */}
      {showResponsiveNav && (
        <ResponsiveNavBar
          isAuthenticated={true}
          username="Manu"
          logout={() => alert("Logging out...")}
        />
      )}
    </>
  );
};

export default NavBar;

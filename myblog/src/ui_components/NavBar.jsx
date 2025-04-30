import { Switch } from "@/components/ui/switch";
import { FaHamburger } from "react-icons/fa";
import ResponsiveNavBar from "./ResponsiveNavBar";
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({
  darkMode,
  handleDarkMode,
  isAuthenticated,
  username,
  setIsAuthenticated,
  setUsername,
}) => {
  const [showNavBar, setShowNavBar] = useState(false);

  useEffect(() => {
    // Retrieve username from localStorage on initial load
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername); // Set username from localStorage
      setIsAuthenticated(true); // Set as authenticated
    }
  }, [setUsername, setIsAuthenticated]);

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("username"); // Remove username on logout
    setIsAuthenticated(false);
    setUsername(null);
  };

  return (
    <>
      <nav className="max-container py-6 flex justify-between items-center gap-6 sticky top-0 z-10 bg-[#FFFFFF] dark:bg-[#141624] pl-[2.5rem] pr-[2.5rem]">
        <Link to="/" className="text-[#141624] text-2xl font-semibold dark:text-[#FFFFFF]">
          MindFolio
        </Link>

        <ul className="flex items-center justify-end gap-9 text-[#3B3C4A] lg:flex-1 max-md:hidden dark:text-[#FFFFFF]">
          {isAuthenticated ? (
            <>
              <li>
                <NavLink
                  to={`/profile/${username}`}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Hi, {username}
                </NavLink>
              </li>
              <li onClick={logout} className="cursor-pointer">
                Logout
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/signin"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Login
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/signup"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Register
                </NavLink>
              </li>
            </>
          )}

          <li className="font-semibold">
            <NavLink
              to="/create"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Create Post
            </NavLink>
          </li>
        </ul>

        {/* Theme Switch */}
        <Switch
          onCheckedChange={handleDarkMode}
          checked={darkMode}
          className={`transition-all duration-300 ${darkMode ? 'bg-white' : 'bg-black'}`}
        />

        {/* Hamburger Icon */}
        <FaHamburger
          className="text-2xl cursor-pointer hidden max-md:block dark:text-white"
          onClick={() => setShowNavBar((curr) => !curr)}
        />
      </nav>

      {/* Conditionally show ResponsiveNavBar */}
      {showNavBar && (
        <ResponsiveNavBar
          isAuthenticated={isAuthenticated}
          username={username}
          logout={logout}
        />
      )}
    </>
  );
};

export default NavBar;

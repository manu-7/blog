import { useEffect, useState } from "react";
import Footer from "./Footer";
import NavBar from "./Navbar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {

  useEffect(function(){
    if(localStorage.getItem("dark") ===null){
      localStorage.setItem("dark","false")
    }
  },[])

  const [darkMode, setDarkMode] = useState(localStorage.getItem("dark")==="true");

  const handleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem("dark",newDarkMode?"true":"false")
  };

 

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <main className="w-full bg-[#ffffff] dark:bg-[#181A2A]">
      <NavBar darkMode={darkMode} handleDarkMode={handleDarkMode} />
      <Outlet />
      <Footer />
    </main>
  );
};

export default AppLayout;

import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import SideBar from "./SideBar";
import Timeline from "./Timeline";
import Canvas from "./Canvas";

export default function Dashboard() {
  const [sidebarHeight, setSidebarHeight] = useState(500);
  useEffect(() => {
    setSidebarHeight(
      window.innerHeight -
        document.getElementById("header").offsetHeight -
        document.getElementById("footer").offsetHeight
    );
  }, []);
  return (
    <>
      <Header />
      <main className="d-flex">
        <SideBar height={sidebarHeight} />
        <div className="d-flex flex-column flex-grow-1 px-3">
          <Timeline />
          <Canvas />
        </div>
      </main>
      <Footer />
    </>
  );
}

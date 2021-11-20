import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import SideBar from "./SideBar";
import Timeline from "./Timeline";
import Canvas from "./Canvas";

export default function Dashboard() {
  const sidebarHeight = window;
  return (
    <>
      <Header />
      <main className="d-flex">
        <SideBar className="flex-grow-1" />
        <div className="d-flex flex-column">
          <Timeline />
          <Canvas />
        </div>
      </main>
      <Footer />
    </>
  );
}

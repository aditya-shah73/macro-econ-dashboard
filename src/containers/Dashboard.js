import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import SideBar from "./SideBar";
import Timeline from "./Timeline";
import Canvas from "./Canvas";

export default function Dashboard() {
  return (
    <>
      <Header />
      <main>
        <SideBar />
        <div>
          <Timeline />
          <Canvas />
        </div>
      </main>
      <Footer />
    </>
  );
}

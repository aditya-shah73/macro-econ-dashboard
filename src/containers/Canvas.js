import React, { useState, useEffect } from "react";
import Graph from "./Graph";

export default function Canvas() {
  const [height, setHeight] = useState(500);
  useEffect(() => {
    setHeight(
      window.innerHeight -
        document.getElementById("header").offsetHeight -
        document.getElementById("timeline").offsetHeight -
        document.getElementById("footer").offsetHeight
    );
    return () => {};
  }, []);
  return (
    <div style={{ overflowY: "scroll", height: height }}>
      <Graph />
      <Graph />
      <Graph />
      <Graph />
      <Graph />
      <Graph />
      <Graph />
    </div>
  );
}

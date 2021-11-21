import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Graph from "./Graph";

function Canvas({ graphs }) {
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
      {graphs.map((graph) => (
        <Graph key={graph} />
      ))}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    graphs: state.global.graphs,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Canvas);

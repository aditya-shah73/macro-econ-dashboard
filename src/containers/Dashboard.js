import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import SideBar from "./SideBar";
import Timeline from "./Timeline";
import Canvas from "./Canvas";
import { connect } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";

function Dashboard({ addGraph, removeGraph, reorderGraph }) {
  const [sidebarHeight, setSidebarHeight] = useState(500);
  useEffect(() => {
    setSidebarHeight(
      window.innerHeight -
        document.getElementById("header").offsetHeight -
        document.getElementById("footer").offsetHeight
    );
  }, []);
  const onDragEnd = (result) => {
    const { source, destination } = result;
    debugger;
    // dropped outside the list
    if (!destination) {
      return;
    }

    if (destination.droppableId === "1") {
      return;
    }

    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      reorderGraph(source.index, destination.index);
    } else {
      addGraph(destination.index, source.index);
    }
  };

  return (
    <>
      <Header />
      <main className="d-flex">
        <DragDropContext onDragEnd={onDragEnd}>
          <SideBar height={sidebarHeight} />
          <div className="d-flex flex-column flex-grow-1 px-3">
            <Timeline />
            <Canvas />
          </div>
        </DragDropContext>
      </main>
      <Footer />
    </>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    addGraph: (index, graph) => {
      dispatch({ type: "ADD_GRAPH", payload: { index: index, graph: graph } });
    },
    removeGraph: (index) => {
      dispatch({ type: "REMOVE_GRAPH", payload: { index: index } });
    },
    reorderGraph: (moveFrom, moveTo) => {
      dispatch({
        type: "REORDER_GRAPH",
        payload: { moveFrom: moveFrom, moveTo: moveTo },
      });
    },
  };
};
export default connect(null, mapDispatchToProps)(Dashboard);

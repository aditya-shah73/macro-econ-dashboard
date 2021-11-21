import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Graph from "./Graph";
import { Droppable, Draggable } from "react-beautiful-dnd";

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "white",
  height:'100%'
});

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  // change background colour if dragging
  background: isDragging ? "lightgreen" : "lightgrey",
  "&:hover": {
    background: "lightblue",
  },
  ...draggableStyle,
});
function Canvas({ graphs, addGraph, removeGraph, reorderGraph }) {
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
      <Droppable droppableId={`0`}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
            {...provided.droppableProps}
          >
            {graphs.map((graph, index) => (
              <Draggable key={graph} draggableId={graph} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    <Graph type={graph} />
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    graphs: state.global.graphs,
  };
};

export default connect(mapStateToProps, null)(Canvas);

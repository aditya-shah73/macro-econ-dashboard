import React from "react";
import TimelineIcon from "@mui/icons-material/TimelineSharp";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { connect } from "react-redux";
import { Draggable } from "react-beautiful-dnd";

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  // change background colour if dragging
  "&:hover": {
    background: "lightblue",
  },
  ...draggableStyle,
});
function CollapsibleListItem({ data, isAdded }) {
  const { title, key } = data;
  return (
    <>
      {isAdded ? (
        <ListItemButton sx={{ pl: 4 }}>
          <ListItemIcon>
            <TimelineIcon />
          </ListItemIcon>
          <ListItemText primary={title} />
        </ListItemButton>
      ) : (
        <Draggable key={key} draggableId={key} index={key}>
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
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <TimelineIcon />
                </ListItemIcon>
                <ListItemText primary={title} />
              </ListItemButton>
            </div>
          )}
        </Draggable>
      )}
    </>
  );
}
const mapStateToProps = (state, ownProps) => {
  return {
    isAdded: state.global.graphs.includes(ownProps.data.key),
  };
};
export default connect(mapStateToProps, null)(CollapsibleListItem);

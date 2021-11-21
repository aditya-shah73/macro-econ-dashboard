import React from "react";
import TimelineIcon from "@mui/icons-material/TimelineSharp";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { connect } from "react-redux";

function CollapsibleListItem({ data, isAdded }) {
  const { title } = data;
  return (
    <ListItemButton sx={{ pl: 4 }} draggle={!isAdded}>
      <ListItemIcon>
        <TimelineIcon />
      </ListItemIcon>
      <ListItemText
        primary={isAdded ? "" : title}
        secondary={isAdded ? title : ""}
      />
    </ListItemButton>
  );
}
const mapStateToProps = (state, ownProps) => {
  return {
    isAdded: state.global.graphs.includes(ownProps.data.key),
  };
};
export default connect(mapStateToProps, null)(CollapsibleListItem);

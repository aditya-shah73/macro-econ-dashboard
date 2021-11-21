import React from "react";
import { connect } from "react-redux";

function Timeline({
  selectedYearFrom,
  selectedYearTo,
  updateYearFrom,
  updateYearTo,
}) {
  return (
    <div id="timeline">
      Timeline {selectedYearFrom}-{selectedYearTo}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    selectedYearFrom: state.global.yearFrom,
    selectedYearTo: state.global.yearTo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateYearFrom: (yearFrom) => {
      dispatch({ type: "YEARFROM", payload: yearFrom });
    },
    updateYearTo: (yearTo) => {
      dispatch({ type: "YEARTO", payload: yearTo });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);

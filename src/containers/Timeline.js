import React from "react";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const marks = [
  {
    value: 1960,
    label: "1960",
  },
  {
    value: 1970,
    label: "1970",
  },
  {
    value: 1980,
    label: "1980",
  },
  {
    value: 1990,
    label: "1990",
  },
  {
    value: 2000,
    label: "2000",
  },
  {
    value: 2010,
    label: "2010",
  },
  {
    value: 2020,
    label: "2020",
  },
];

function Timeline({
  selectedYearFrom,
  selectedYearTo,
  updateYearFrom,
  updateYearTo,
}) {
  const [value, setValue] = React.useState([selectedYearFrom, selectedYearTo]);

  const handleChange = (event, newValue) => {
    updateYearFrom(newValue[0]);
    updateYearTo(newValue[1]);
    setValue(newValue);
  };
  return (
    <div id="timeline" style={{display: "flex", justifyContent: "center"}}>
      <Box sx={{ width: 1000 , m: 2 }}>
        <Slider
          getAriaLabel={() => "Year range"}
          value={value}
          min={1960}
          max={2020}
          marks={marks}
          onChange={handleChange}
          valueLabelDisplay="on"
        />
      </Box>
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

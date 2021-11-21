import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Chart from "react-google-charts";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Graph(props) {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const saveAnnotations = () => {
    handleClose();
    //Make API Call here
  };

  console.log("Props: ", props);
  const baseURL = "https://macro-econ-backend.herokuapp.com/data?";
  const dataEndPoint =
    baseURL +
    "table=" +
    "GDP_GROWTH_RATE" +
    "&yearFrom=" +
    props.selectedYearFrom +
    "&yearTo=" +
    props.selectedYearTo +
    "&country=" +
    props.selected;
  useEffect(() => {
    Axios.get(dataEndPoint, { validateStatus: false }).then((response) => {
      console.log(response.data.rows);
      if (response.status === 200) {
        if (response.data) {
          setData(response.data.rows);
          setLoading(false);
        }
      }
    });
  }, [props]);

  const graphData = [];
  if (!loading) {
    graphData[0] = ["x", "y"];
    for (var i = 0; i < data.length; i++) {
      graphData[i + 1] = [data[i][0], data[i][1]];
    }
    console.log(graphData);
  }

  return (
    <div style={{ marginBottom: "15px", border: "1px solid black" }}>
      <div style={{ backgroundColor: "white" }}>
        <Button
          variant="primary"
          onClick={handleShow}
          style={{ marginTop: "10px", marginLeft: "10px" }}
        >
          Annotate
        </Button>
      </div>
      <div>
        <Chart
          chartType="LineChart"
          data={graphData}
          options={{
            title: "GDP Growth Rate",
            hAxis: {
              title: "Year",
              format: "0",
            },
            vAxis: {
              format: "long",
            },
          }}
        />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add annotations for:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            placeholder="Enter annotations for this data point"
            style={{ width: "300px" }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={saveAnnotations}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    selectedYearFrom: state.global.yearFrom,
    selectedYearTo: state.global.yearTo,
    selected: state.global.country,
  };
};

export default connect(mapStateToProps, null)(Graph);

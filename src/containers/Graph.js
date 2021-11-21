import React, { useState, useEffect } from "react";
import Chart from "react-google-charts";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Graph() {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const saveAnnotations = () => {
    handleClose();
    //Make API Call here
  };

  const dataEndPoint =
    "https://macro-econ-backend.herokuapp.com/data?table=GDP_GROWTH_RATE&yearFrom=1960&yearTo=2000&country=india";
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
  }, []);

  const graphData = [];
  if (!loading) {
    graphData[0] = ["x", "GDP"];
    for (var i = 0; i < data.length; i++) {
      graphData[i + 1] = [data[i][0], data[i][1]];
    }
    console.log(graphData);
  }

  return (
    <div style={{ marginBottom: "15px", border: "1px solid black" }}>
      <div style={{ backgroundColor: "white" }}>
        <Button variant="primary" onClick={handleShow} style={{ marginTop:"10px", marginLeft:"10px" }}>
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

export default Graph;

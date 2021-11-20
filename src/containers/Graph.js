import React, { useState } from "react";
import Chart from "react-google-charts";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

function Graph() {
  const [show, setShow] = useState(false);
  const [columnName, setColumnName] = useState(null);
  const [value, setValue] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const saveAnnotations = () => {
    handleClose();
    //Make API Call here
  }

  return (
    <div>
      <Chart
        chartType="LineChart"
        data={[
          ["x", "GDP"],
          [0, 0],
          [1, 10],
          [3, 17],
          [4, 18],
          [5, 9],
        ]}
        options={{
          title: "GDP Growth Rate",
        }}
        chartEvents={[
          {
            eventName: "select",
            callback: ({ chartWrapper }) => {
              const chart = chartWrapper.getChart();
              const selection = chart.getSelection();
              if (selection.length === 1) 
              {
                const [selectedItem] = selection;
                const dataTable = chartWrapper.getDataTable();
                setColumnName(dataTable.getColumnLabel(1));
                const { row, column } = selectedItem;
                setValue(dataTable.getValue(row, column));
                handleShow();
              }
            },
          },
        ]}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add annotations for {columnName}: {value}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <input type="text" placeholder="Enter annotations for this data point" style={{width: '300px'}}/>
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

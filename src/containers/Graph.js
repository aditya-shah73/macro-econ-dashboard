import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Chart from "react-google-charts";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const mapping = {
  GDP_GROWTH_RATE: {
    title: "GDP Growth Rate",
    tableName: "GDP_GROWTH_RATE",
    yAxisTitle: "GDP",
  },
  GDP_CURRENT_USD: {
    title: "GDP Current USD",
    tableName: "GDP_CURRENT_USD",
    yAxisTitle: "GDP USD",
  },
  Current_ACCOUNT_BALANCE: {
    title: "Current Account Balance (% of GDP)",
    tableName: "CURRENT_ACCOUNT_BALANCE",
    yAxisTitle: "Account Balance %",
  },
  FOREIGN_DIRECT_INVESTMENT_INFLOWS_USD: {
    title: "FDI-net inflows(BoP, current US$)",
    tableName: "FOREIGN_DIRECT_INVESTMENT_NET",
    yAxisTitle: "FDI Inflows USD",
  },
  FOREIGN_DIRECT_INVESTMENT_OUTFLOWS_USD: {
    title: "FDI-net outflows(BoP, current US$)",
    tableName: "FOREIGN_DIRECT_INVESTMENT_NET_OUTFLOWS",
    yAxisTitle: "FDI Outflows USD",
  },
  FOREIGN_DIRECT_INVESTMENT_INFLOWS_GDP: {
    title: "FDI-net inflows(% of GDP)",
    tableName: "FOREIGN_DIRECT_INVESTMENT_NET_INFLOWS",
    yAxisTitle: "FDI Inflows %",
  },
  FOREIGN_DIRECT_INVESTMENT_OUTFLOWS_GDP: {
    title: "FDI-net outflows(% of GDP)",
    tableName: "FDI_NET_OUTFLOWS",
    yAxisTitle: "FDI Outflows %",
  },
  AGRICULTURAL_CONTRI_PER_GDP: {
    title: "Agricultural Contribution (% GDP)",
    tableName: "AGRICULTURAL_CONTRIBUTION",
    yAxisTitle: "Contribution %",
  },
  MANUFACTURING_PER_GDP: {
    title: "Manufacturing (% GDP)",
    tableName: "MANUFACTURING",
    yAxisTitle: "Manufacturing %",
  },
  AGRICULTUREM_FORESTRY_FISHING_GROWTH: {
    title: "Agriculture, Forestry, and Fishing, value added (annual % growth)",
    tableName: "AGRICULTURE_FORESTRY_AND_FISHING_VALUE_ADDED",
    yAxisTitle: "Annual % growth",
  },
  FERTILIZER_CONSUMPTION: {
    title: "Fertilizer Consumption (Kg per hectre of arable land)",
    tableName: "FERTILIZER_CONSUMPTION_KILOGRAMS",
    yAxisTitle: "Consumption kg/hectre",
  },
  FERTILIZER_CONSUMPTION_PER_PRODUCTION: {
    title: "Fertilizer Consumption (% of fertilizer production)",
    tableName: "FERTILIZER_CONSUMPTION_PERCENT",
    yAxisTitle: "% Production",
  },
  TOTAL_RESERVES_IN_MONTH_OF_IMPORTS: {
    title: "Total Reserves in months of imports",
    tableName: "TOTAL_RESERVES_IN_MONTHS_OF_IMPORTS",
    yAxisTitle: "Reserves",
  },
  TOTAL_RESERVES_INCLUDING_GOLD_USD: {
    title: "Total Reserves (includes gold, current US$)",
    tableName: "TOTAL_RESERVES_INCLUDES_GOLD",
    yAxisTitle: "Reserves USD",
  },
  TOTAL_RESERVES_PER_EXTERNAL_DEBT: {
    title: "Total Reserves (% of total external debt)",
    tableName: "TOTAL_RESERVES_PERCENT_OF_TOTAL_EXTERNAL_DEBT",
    yAxisTitle: "% external debt",
  },
  DEBT_SERVICE_PPG_IMF: {
    title:
      "Debt Service (PPG and IMF only, % of exports of goods, services and primary income)",
    tableName: "DEBT_SERVICE",
    yAxisTitle: "PPG AND IMF",
  },
  DEBT_SERVICE_GNI: {
    title: "Total Debt Service (% of GNI)",
    tableName: "TOTAL_DEBT_SERVICE",
    yAxisTitle: "Total Debt %",
  },
  GNI_USD: {
    title: "GNI (current US$)",
    tableName: "GNI",
    yAxisTitle: "GDP USD",
  },
};

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
  console.log(mapping[props.type].tableName);
  const baseURL = "https://macro-econ-backend.herokuapp.com/data?";
  const dataEndPoint =
    baseURL +
    "table=" +
    mapping[props.type].tableName +
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
    graphData[0] = ["x", mapping[props.type].yAxisTitle];
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
            title: mapping[props.type].title,
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

import { Button, Paper } from "@mui/material";
import React from "react";
import { connect } from "react-redux";

function Login({ login }) {
  const loginAsEconResearcher = () => {
    login("researcher");
  };
  const loginAsGovtRepresentative = () => {
    login("representative");
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <Paper
        className="d-flex"
        style={{
          width: "400px",
          margin: "20px",
          flexDirection: "column",
        }}
      >
        <Button
          variant="contained"
          style={{ margin: "10px", marginTop: "20px" }}
          onClick={loginAsEconResearcher}
        >
          Login as ECON Researcher
        </Button>
        <Button
          variant="contained"
          style={{ margin: "10px", marginBottom: "20px" }}
          onClick={loginAsGovtRepresentative}
        >
          Login as Govt. Representative
        </Button>
      </Paper>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => {
      dispatch({ type: "LOGIN", payload: user });
    },
  };
};
export default connect(null, mapDispatchToProps)(Login);

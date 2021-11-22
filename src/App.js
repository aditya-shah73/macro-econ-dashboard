import "./App.css";
import React, { useEffect, useState } from "react";
import Login from "./containers/Login";
import { connect } from "react-redux";
import Dashboard from "./containers/Dashboard";
import {loadData, syncData} from "./IndexedDB";

function App({ isLoggedIn }) {
  loadData();
  useEffect(() => {
    const onlineListener = window.addEventListener("online", () =>
      syncData()
    );
  })
  return <div className="App">{isLoggedIn ? <Dashboard /> : <Login />}</div>;
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.global.user ? true : false,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(App);

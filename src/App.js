import "./App.css";
import Login from "./containers/Login";
import { connect } from "react-redux";
import Dashboard from "./containers/Dashboard";
import {loadData} from "./IndexedDB";

function App({ isLoggedIn }) {
  loadData();
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

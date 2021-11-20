import "./App.css";
import Login from "./containers/Login";
import { connect } from "react-redux";
import Dashboard from "./containers/Dashboard";

function App({ isLoggedIn }) {
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

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Navigate, Route } from "react-router-dom";
import auth from "../../reducers/auth";

const PrivateRoute = ({ auth: { isAuthenticated, loading }, children }) => {
  if (loading) {
    return <h2>Loading...</h2>; // you can replace with spinner
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
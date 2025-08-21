import React, {useEffect} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../actions/auth";
import { Fragment } from "react";
import { getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";


const Dashboard = ({ getCurrentProfile, auth: {user}, profile: {profile: userProfile,loading} }) => {

    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);
  
  return loading && userProfile === null ? <Spinner /> : <Fragment>
    <h1 className="large text-primary">Dashboard</h1>
    <p className="lead">
      <i className="fas fa-user"></i> Welcome {user && user.name}
    </p>
    {userProfile ? (
      <Fragment>
    <h2 className="my-2">Profile Dashboard</h2>
    {/* Show profile info, experience, education, etc. */}
      </Fragment>
    ) : (
      <Fragment>
        <p>You have not set up a profile, please add some info</p>
        <Link to="/create-profile" className="btn btn-primary my-1">
          Create Profile
        </Link>
      </Fragment>
    )}
  </Fragment>;
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
    profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
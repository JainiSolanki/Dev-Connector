import React, {useEffect, Fragment} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteAccount, getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";


const Dashboard = ({ getCurrentProfile, auth: {user}, profile: {profile: userProfile,loading} , deleteAccount}) => {

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
        <DashboardActions/>
        <Experience experience={userProfile.experience}/>
        <Education education={userProfile.education}/>

      </Fragment>
    ) : (
      <Fragment>
        <p>You have not set up a profile, please add some info</p>
        <Link to="/create-profile" className="btn btn-primary my-1">
          Create Profile
        </Link>
      </Fragment>
    )}

    <div className="my-2">
          <button className="btn btn-danger" onClick={() => deleteAccount()}>
            <i className="fas fa-user-minus"></i> Delete My Account
          </button>
    </div>
    
  </Fragment>;
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
    profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
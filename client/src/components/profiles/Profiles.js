import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'
import { connect } from 'react-redux'
import {getProfiles} from '../../actions/profile'

const Profiles = ({getProfiles, profile:{profiles, loading}}) => {
    useEffect(() => {
        getProfiles();
    }, [getProfiles]);
  return (
    <Fragment>
      { loading ? <Spinner /> : <Fragment>
        <h1 className="large text-primary">Developers</h1>
        <p className="lead"><i className="fas fa-connectdevelop"></i> Browse and connect with developers</p>
        <div className="profiles">
            {profiles.length > 0 ? (
                profiles.map(profile => (
                    <div key={profile._id} className="profile bg-light">
                        <img
                            className="round-img"
                            src={profile.user.avatar}
                            alt=""
                        />
                        <div>
                            <h2>{profile.user.name}</h2>
                            <p>{profile.status} {profile.company && <span> at {profile.company}</span>}</p>
                            <p className="my-1">{profile.location && <span>{profile.location}</span>}</p>
                            <a href={`/profile/${profile.user._id}`} className="btn btn-primary">View Profile</a>
                        </div>
                        <ul>
                            {profile.skills.slice(0,4).map((skill, index) => (
                                <li key={index} className="text-primary">
                                    <i className="fas fa-check"></i> {skill}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            ) : <h4>No profiles found...</h4>}
        </div>
    </Fragment> }
    </Fragment>
  )
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, {getProfiles})(Profiles);

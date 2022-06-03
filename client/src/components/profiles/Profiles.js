/* eslint-disable import/no-anonymous-default-export */

import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfiles } from "../../actions/profile";

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
	useEffect(() => {
		getProfiles();
	}, []);

	return <Fragment>{loading ? <Spinner /> : <Fragment>
    <h1 className="large tex-primary">Developers</h1>
    <p className="lead">
      <i className="fa-connectdevelop"></i>Browse and connect with developers
    </p>
    <div className="profiles">
      {profiles.length > 0 ? (
        profiles.map(profile => (
          <ProfileItem key = {profile._id} profile={profile}/>
        ));
      ) : <h4>No Profiles Found...</h4> };
    </div>
    
    </Fragment> }
    </Fragment>;
};

Profiles.propTypes = {
	getProfiles: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);

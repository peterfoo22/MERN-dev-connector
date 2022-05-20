import React from 'react'
import { Fragment } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCurrentProfiles } from '../../actions/profile';
import { useEffect } from 'react';

const Dashboard = ({getCurrentProfile, auth, profile :{profile, loading}}) => {
  useEffect(()=>{
    getCurrentProfiles();
  },[]);

  return loading && profile === null ? <Spinner /> : <Fragment>
    test
  </Fragment>;
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, {getCurrentProfiles}) (Dashboard);
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getCurrentProfiles } from '../../actions/profile';
import { useEffect } from 'react';

const Dashboard = ({getCurrentProfile, auth, profile}) => {
  useEffect(()=>{
    getCurrentProfiles();
  },[]);

  return (
    <div>Dashboard</div>
  )
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
import React from 'react'
import {Route, Navigate } from "react-router-dom"
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const PrivateRoute = ({ component: Component, auth: {isAutheticated, loading}, ...rest }) => (
  <Route { ...rest} render = { props => !isAutheticated && !loading ? (<Navigate to='/login'/>) : ( <Component {...props} /> )} />  
)

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => (
 {
   auth: state.auth
 }
)

export default connect(mapStateToProps) (PrivateRoute)
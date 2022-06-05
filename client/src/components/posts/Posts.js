import React, {useEffect, Fragment} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getPosts } from '../../actions/post'
import Spinner from '../layout/Spinner'

const Posts = ({getPosts, post:{posts, loading}}) => {
  
  useEffect(()=>{
    getPosts();
  }, [getPosts]);
  
  return (
    <div>Posts</div>
  )
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  post: state.post
})

export default connect(mapStateToProps, {getPosts})(Posts);
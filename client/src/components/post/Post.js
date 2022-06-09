import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import {getPost} from '../../actions/post';
import { useParams } from "react-router-dom";
import PostItem from '../posts/PostItem';


const Post = ({getPost, post: {post, loading}, match}) => {

  const postID = useParams().id;

  useEffect(()=>{
    getPost(postID);
  },[getPost, postID]);

  return (loading || post == null ? <Spinner/> : <Fragment>
    <PostItem post={post} showActions = {false} />
  </Fragment>)
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  post: state.post
})

export default connect(mapStateToProps, {getPost}) (Post)
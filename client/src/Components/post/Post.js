import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../Layout/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from '../post/CommentForm';
import CommentItem from '../post/CommentItem';
import { getPost } from '../../Redux/actions/post';
import { Link } from 'react-router-dom';
// useEffect to get the post when this loads

const Post = ({ getPost, post: { post, loading }, match }) => {
  // we need this match to take our request params from our routes
  useEffect(() => {
    // checkdata(post); // post have data ok
    // {
    //   [0]   _id: '5eeb86c0ace14221083c5de0',
    //   [0]   text: 'Test post by Felipe',
    //   [0]   name: 'Felipe',
    //   [0]   avatar: '//www.gravatar.com/avatar/45f17208dd064e4f04151db4488a40ad?s=200&r=pg',
    //   [0]   user: '5ee57d97ef498825689f14b6',
    //   [0]   likes: [],
    //   [0]   comments: [],
    //   [0]   date: '2020-06-18T15:22:40.687Z',
    //   [0]   __v: 0
    //   [0] }
    getPost(match.params.id);
  }, [getPost]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to='/posts' className='btn'>
        Back to Posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
      <div className='comments'>
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);

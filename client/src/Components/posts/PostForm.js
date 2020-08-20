import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../Redux/actions/post';

const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');

  return (
    <div class='post-form'>
      <div class='bg-primary p'>
        <h3>Leave a post</h3>
      </div>
      <form
        class='form my-1'
        onSubmit={(e) => {
          e.preventDefault();
          addPost({ text });
          setText('');
        }}
        // We must have pass text as object because in our actions, look there, this data is our body
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='What are you thinking?'
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
        <input type='submit' class='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);

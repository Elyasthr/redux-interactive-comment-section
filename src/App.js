import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Comment from './components/Comment';
import { isEmpty } from './components/Utils';
import { postComment } from './store/actions/comment.action';

const App = () => {
  const comments = useSelector((state) => state.commentReducer);
  const user = useSelector((state) => state.userReducer);
  const [myComment, setMyComment] = useState('');
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataComment = {
      content: myComment,
      createdAt: Date.now(),
      score: 0,
      user: {
        image: {
          png: "./images/avatars/image-amyrobson.png",
          webp: "./images/avatars/image-amyrobson.webp"
        },
        username: user.pseudo
      },
      replies: []
    }
    dispatch(postComment(dataComment))
  }

  return (
    <div className='root'>
      <div className='container'>
        <ul>
          {
            !isEmpty(comments) && (
              comments.map((comment) => (
                <Comment comment={comment} key={comment.id} />
              ))
            )
          }
        </ul>
        <form onSubmit={handleSubmit}>
          <textarea onChange={(e) => setMyComment(e.target.value)}></textarea>
          <button type='submit'>SEND</button>
        </form>
      </div>
    </div>
  );
};

export default App;
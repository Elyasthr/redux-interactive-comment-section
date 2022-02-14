import React from 'react';
import { useSelector } from 'react-redux';
import Comment from './components/Comment';
import { isEmpty } from './components/Utils';

const App = () => {
  const comments = useSelector((state) => state.commentReducer);

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
        <form>
          <textarea></textarea>
          <button type='submit'>SEND</button>
        </form>
      </div>
    </div>
  );
};

export default App;
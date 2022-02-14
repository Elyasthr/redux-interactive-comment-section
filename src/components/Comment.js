import React from 'react';
import { useSelector } from 'react-redux';
import Reply from './Reply';

const Comment = ({ comment }) => {
  const user = useSelector((state) => state.userReducer)
  console.log(user)
  return (
    <li>
      <h2>{comment.user.username}</h2>
      <p>{comment.content}</p>
      <p>score {comment.score}</p>
      <ul>
        {
          comment.replies.length > 1 && (
            comment.replies.map((reply) => (
              <Reply reply={reply} key={reply.id} />
            )))
        }
      </ul>
      {
        user.pseudo === comment.user.username && (
          <>
            <input type="submit" value="edit" />
            <input type="submit" value="delete" />
          </>
        )
      }

    </li>
  );
};

export default Comment;
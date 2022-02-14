import React from 'react';
import Reply from './Reply';

const Comment = ({ comment }) => {
  console.log(comment)
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
    </li>
  );
};

export default Comment;
import React from 'react';

const Reply = ({ reply }) => {
  return (
    <li>
      <h2>{reply.user.username}</h2>
      <p>@{reply.replyingTo + reply.content}</p>
      <p>score {reply.score}</p>
    </li>
  );
};

export default Reply;
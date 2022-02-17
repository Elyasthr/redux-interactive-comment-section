import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postComment } from '../store/actions/comment.action';
import { getComment, putComment } from '../store/actions/comment.action';
import { isEmpty } from './Utils';

const FormComment = ({ reply, comment }) => {
  const user = useSelector((state) => state.userReducer);
  const [myReply, setMyReply] = useState('');
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEmpty(myReply)) {
      const dataComment = {
        content: myReply,
        createdAt: Date.now(),
        score: 0,
        user: {
          image: {
            png: "./images/avatars/image-juliusomo.png",
            webp: "./images/avatars/image-juliusomo.webp"
          },
          username: user.username
        },
        replies: []
      }
      await dispatch(postComment(dataComment)) //Waiting post to register
      dispatch(getComment())
      setMyReply('');
    }
  }
  //fix Id problem
  const handleReply = async (e) => {
    e.preventDefault();
    if (!isEmpty(myReply)) {
      const dataReply = {
        id: comment.replies.length + 1,
        content: myReply,
        createdAt: Date.now(),
        score: 0,
        replyingTo: reply ? reply.user.username : comment.user.username,
        user: {
          image: {
            png: "./images/avatars/image-amyrobson.png",
            webp: "./images/avatars/image-amyrobson.webp"
          },
          username: user.username
        }
      }

      const dataCommentEdit = {
        ...comment,
        replies: [...comment.replies, dataReply]
      }
      await dispatch(putComment(dataCommentEdit))
      dispatch(getComment())
      setMyReply('');
    }
  }

  return (
    <div className='form-container'>
      <form className={"form-comment"} onSubmit={comment ? handleReply : handleSubmit}>
        <textarea value={myReply} onChange={(e) => setMyReply(e.target.value)} placeholder="Add a comment…"></textarea>
        <div className='form-bottom'>
          <div className='card-profil-pic'>pic</div>
          <button type='submit'>{comment ? "REPLY" : "SEND"}</button>
        </div>
      </form>
    </div>
  );
};

export default FormComment;
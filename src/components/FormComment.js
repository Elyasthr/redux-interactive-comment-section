import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComment, editReplies, postComment } from '../store/actions/comment.action';
import { getRandomArbitrary, isEmpty } from './Utils';

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
        id: getRandomArbitrary(10,34534),
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
      await dispatch(editReplies(dataCommentEdit))
      dispatch(getComment())
      setMyReply('');
    }
  }

  return (
    <form className={"form-comment"} onSubmit={comment ? handleReply : handleSubmit}>
      <textarea value={myReply} onChange={(e) => setMyReply(e.target.value)} placeholder="Add a comment…"></textarea>
      <div className='form-bottom'>
        <div className='card-profil-pic'>pic</div>
        <button type='submit'>{comment ? "REPLY" : "SEND"}</button>
      </div>
    </form>
  );
};

export default FormComment;
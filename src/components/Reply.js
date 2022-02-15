import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComment, putComment } from '../store/actions/comment.action';
import FormReply from './FormReply';

const Reply = ({ reply, comment }) => {
  const [editToggle, setEditToggle] = useState(false);
  const [editComment, setEditComment] = useState(reply.content);
  const user = useSelector((state) => state.userReducer);
  const [commentReplyy, setCommentReplyy] = useState(false)
  const dispatch = useDispatch();

  const handleEdit = async () => {
    setEditToggle(false)
    const editReplyArray = comment.replies.map((com) => {
      if (com.id === reply.id) {
        return { ...com, content: editComment }
      }
      return com
    })
    //regarder si je peut pas retourner un ...arr plutot que tout retapper
    const editReply = {
      content: comment.content,
      createdAt: comment.createdAt,
      score: comment.score,
      user: {
        image: {
          png: comment.user.image.png,
          webp: comment.user.image.webp
        },
        username: comment.user.username
      },
      replies: editReplyArray,
      id: comment.id
    }
    await dispatch(putComment(editReply))
    dispatch(getComment())
  }

  const handleDelete = async () => {

    const deleteReplyArray = comment.replies.filter((com) => com.id !== reply.id)

    const deleteReply = {
      content: comment.content,
      createdAt: comment.createdAt,
      score: comment.score,
      user: {
        image: {
          png: comment.user.image.png,
          webp: comment.user.image.webp
        },
        username: comment.user.username
      },
      replies: deleteReplyArray,
      id: comment.id
    }
    await dispatch(putComment(deleteReply))
    dispatch(getComment())
  }

  return (
    <li>
      <h2>{reply.user.username}</h2>
      {
        user.pseudo === reply.user.username && (
          <>
            {
              editToggle
                ? <input type='submit' value='validate' onClick={handleEdit} />
                : <input type="submit" onClick={() => setEditToggle(!editToggle)} value="edit" />
            }
            <input type="submit" value="delete" onClick={handleDelete} />
          </>
        )
      }
      {
        editToggle
          ? <textarea value={editComment} onChange={(e) => setEditComment(e.target.value)}></textarea>
          : <p>@{reply.replyingTo + " " + reply.content}</p>
      }
      <p>score {reply.score}</p>
      {commentReplyy
        ? (
          <>
            <input type="submit" value="Cancel" onClick={() => setCommentReplyy(!commentReplyy)} />
            <FormReply reply={reply} comment={comment} onClick={() => (setCommentReplyy(false))} />
          </>
        )
        : <input type="submit" value="Reply" onClick={() => setCommentReplyy(!commentReplyy)} />
      }

    </li>
  );
};

export default Reply;
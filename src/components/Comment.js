import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComment } from '../store/actions/comment.action';
import { deleteComment, putComment } from '../store/actions/comment.action';
import FormComment from './FormComment';
import Likes from './Likes';

const Comment = ({ reply, comment }) => {

  const [editToggle, setEditToggle] = useState(false);
  const [editComment, setEditComment] = useState(reply ? reply.content : comment.content);
  const user = useSelector((state) => state.userReducer);
  const [commentReply, setCommentReply] = useState(false)
  const dispatch = useDispatch();

  const handleValidate = () => {
    setEditToggle(!editToggle);
    const editPost = {
      ...comment,
      content: editComment
    }
    dispatch(putComment(editPost))
  }

  const handleEdit = async () => {
    setEditToggle(!editToggle);
    const editReplyArray = comment.replies.map((com) => {
      if (com.id === reply.id) {
        return { ...com, content: editComment }
      }
      return com
    })

    const editReply = {
      ...comment,
      replies: editReplyArray
    }
    await dispatch(putComment(editReply))
    dispatch(getComment())
  }

  const handleDelete = async () => {

    const deleteReplyArray = comment.replies.filter((com) => com.id !== reply.id)

    const deleteReply = {
      ...comment,
      replies: deleteReplyArray
    }
    await dispatch(putComment(deleteReply))
    dispatch(getComment())
  }

  return (
    <li>
      <Likes reply={reply} comment={comment} />

      <h2>{reply ? reply.user.username : comment.user.username}</h2>

      {
        user.username === (reply ? reply.user.username : comment.user.username) && (
          <>
            {
              editToggle
                ? <input type='submit' onClick={reply ? handleEdit : handleValidate} value='validate' />
                : <input type="submit" onClick={() => setEditToggle(!editToggle)} value="edit" />
            }
            <input type="submit" value="delete" onClick={reply ? handleDelete : () => dispatch(deleteComment(comment.id))} />
          </>
        )
      }

      {
        editToggle
          ? <textarea value={editComment} onChange={(e) => setEditComment(e.target.value)}></textarea>
          : <p>{reply ? "@" + reply.replyingTo + " " + reply.content : comment.content}</p>
      }


      {
        !reply &&
        <ul>
          {
            comment.replies.length >= 1 && (
              comment.replies.map((reply) => (
                <Comment reply={reply} comment={comment} key={reply.id} />
              )))
          }
        </ul>
      }

      {
        commentReply
          ? (
            <>
              <input type="submit" value="Cancel" onClick={() => setCommentReply(!commentReply)} />
              <FormComment reply={reply} comment={comment} />
            </>
          )
          : <input type="submit" value="Reply" onClick={() => setCommentReply(!commentReply)} />
      }
    </li>
  );
};

export default Comment;
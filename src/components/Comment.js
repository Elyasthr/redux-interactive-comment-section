import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComment } from '../store/actions/comment.action';
import { deleteComment, putComment } from '../store/actions/comment.action';
import FormComment from './FormComment';

const Comment = ({ reply, comment }) => {

  const [editToggle, setEditToggle] = useState(false);
  const [editComment, setEditComment] = useState(reply ? reply.content : comment.content);
  const user = useSelector((state) => state.userReducer);
  const [commentReply, setCommentReply] = useState(false)
  const dispatch = useDispatch();

  const handleValidate = () => {
    setEditToggle(!editToggle);
    const editPost = {
      content: editComment,
      createdAt: comment.createdAt,
      score: comment.score,
      user: {
        image: {
          png: comment.user.image.png,
          webp: comment.user.image.webp
        },
        username: comment.user.username
      },
      replies: comment.replies,
      id: comment.id
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
      <h2>{reply ? reply.user.username : comment.user.username}</h2>
      {
        user.pseudo === (reply ? reply.user.username : comment.user.username) && (
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
      <p>score {reply ? reply.score : comment.score}</p>

      {!reply &&
        <ul>
          {
            comment.replies.length >= 1 && (
              comment.replies.map((reply) => (
                <Comment reply={reply} comment={comment} key={reply.id} />
              )))
          }
        </ul>
      }

      {commentReply
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
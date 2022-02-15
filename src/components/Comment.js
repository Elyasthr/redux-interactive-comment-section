import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment, putComment } from '../store/actions/comment.action';
import FormComment from './FormComment';
import Reply from './Reply';

const Comment = ({ comment }) => {
  const [editToggle, setEditToggle] = useState(false);
  const [editComment, setEditComment] = useState(comment.content);
  const user = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [commentReply, setCommentReply] = useState(false)

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
  return (
    <li>
      <h2>{comment.user.username}</h2>
      {
        user.pseudo === comment.user.username && (
          <>
            {
              editToggle
                ? <input type='submit' onClick={handleValidate} value='validate' />
                : <input type="submit" onClick={() => setEditToggle(!editToggle)} value="edit" />
            }
            <input type="submit" value="delete" onClick={() => dispatch(deleteComment(comment.id))} />
          </>
        )
      }
      {
        editToggle
          ? <textarea value={editComment} onChange={(e) => setEditComment(e.target.value)}></textarea>
          : <p>{comment.content}</p>
      }
      <p>score {comment.score}</p>
      <ul>
        {
          comment.replies.length >= 1 && (
            comment.replies.map((reply) => (
              <Reply reply={reply} comment={comment} key={reply.id} />
            )))
        }
      </ul>
      {commentReply
        ? (
          <>
            <input type="submit" value="Cancel" onClick={() => setCommentReply(!commentReply)} />
            <FormComment comment={comment} onClick={() => (setCommentReply(false))} />
          </>
        )
        : <input type="submit" value="Reply" onClick={() => setCommentReply(!commentReply)} />
      }
    </li>
  );
};

export default Comment;
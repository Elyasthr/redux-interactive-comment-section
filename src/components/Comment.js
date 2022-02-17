import { formatDistance, toDate } from 'date-fns';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComment } from '../store/actions/comment.action';
import { deleteComment, putComment } from '../store/actions/comment.action';
import FormComment from './FormComment';
import Likes from './Likes';


const Comment = ({ reply, comment }) => {
  const [isDisplay, setIsDisplay] = useState(false)
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
    <>
      {
        isDisplay &&
        <><div className='confirm-background'></div>
          <div className={'confirm'}>
            <h5>Delete comment</h5>
            <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
            <div className='btn-container'>
              <button className='btn btn-cancel' onClick={() => setIsDisplay(!isDisplay)}>NO, CANCEL</button>
              <button className='btn btn-delete' onClick={reply ? handleDelete : () => dispatch(deleteComment(comment.id))}>YES, DELETE</button>
            </div>
          </div></>
      }



      <li className={reply ? 'subcard-container' : 'card-container'}>

        <div className='card-profil'>
          {/* <img src={reply ? reply.user.png : comment.user.image.png} alt='profil-pic' /> */}
          <div className='card-profil-pic'>pic</div>
          <h2>{reply ? reply.user.username : comment.user.username}</h2>
          {user.username === (reply ? reply.user.username : comment.user.username) && <div className='you'>you</div>}
          <h3>{
            reply
              ? typeof (reply.createdAt) === 'string'
                ? reply.createdAt
                : formatDistance(toDate(reply.createdAt), new Date(), { addSuffixe: true })
              : typeof (comment.createdAt) === 'string'
                ? comment.createdAt
                : formatDistance(toDate(comment.createdAt), new Date(), { addSuffixe: true })
          }</h3>
        </div>

        {
          editToggle
            ? <textarea value={editComment} onChange={(e) => setEditComment(e.target.value)}></textarea>
            : <>{reply ? <p><span>@{reply.replyingTo}</span> {reply.content}</p> : <p>{comment.content}</p>}</>
        }



        <div className='card-bottom'>
          <Likes reply={reply} comment={comment} />
          {
            user.username === (reply ? reply.user.username : comment.user.username)
              ?
              <>
                <button type="submit" className="btn-reply delete" onClick={() => setIsDisplay(!isDisplay)}><svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" /></svg>Delete</button>
                {
                  editToggle
                    ? <button type='submit' className="btn-reply" onClick={reply ? handleEdit : handleValidate} ><svg width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" /></svg>Update</button>
                    : <button type="submit" className="btn-reply" onClick={() => setEditToggle(!editToggle)} ><svg width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" /></svg>Edit</button>
                }
              </>
              :
              <>
                {
                  !commentReply
                    ? <button type="submit" className="btn-reply" onClick={() => setCommentReply(!commentReply)}><svg width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" /></svg>Reply</button>
                    : <input type="submit" className="btn-reply delete" value="Cancel" onClick={() => setCommentReply(!commentReply)} />
                }
              </>
          }
        </div>
      </li>
      {
        commentReply &&
        (
          <FormComment reply={reply} comment={comment} />
        )
      }
      {
        !reply &&
        <ul className='subcomment-container'>
          {
            comment.replies.length >= 1 && (
              comment.replies.map((reply) => (
                <Comment reply={reply} comment={comment} key={reply.id} />
              )))
          }
        </ul>
      }
    </>
  );
};

export default Comment;
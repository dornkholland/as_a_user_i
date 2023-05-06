import { useParams } from "react-router-dom";
import * as commentActions from "../../store/comment";
import { useDispatch, useSelector } from "react-redux";
import "./Comment.css";
import { Trash, Trash2 } from "react-feather";
function Comment({ comment }) {
  const sessionUser = useSelector((state) => state.session.user);
  const isMine = comment.userId === sessionUser.id;
  const dispatch = useDispatch();
  const { projectId } = useParams();

  const handleDelete = () => {
    dispatch(
      commentActions.deleteComment({
        commentId: comment.id,
        storyId: comment.storyId,
        projectId,
      })
    );
  };
  return (
    <div className="comment">
      <div className="commentHeader">
        <p>posted by: {comment.User.name}</p>
        {isMine ? (
          <button onClick={handleDelete}>
            <Trash2 size={25} />
          </button>
        ) : null}
      </div>
      <p className="comment__description">{comment.description}</p>
    </div>
  );
}

export default Comment;

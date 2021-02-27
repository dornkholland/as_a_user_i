import { useParams } from "react-router-dom";
import * as commentActions from "../../store/comment";
import { useDispatch, useSelector } from "react-redux";
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
    <div>
      <p>posted by: {comment.User.name}</p>
      <p>{comment.description}</p>
      {isMine ? <button onClick={handleDelete}>delete</button> : null}
    </div>
  );
}

export default Comment;

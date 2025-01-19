import CommentForm from '../Comment/CommentForm';
import Comment from '../Comment';
import * as commentActions from '../../store/comment';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
function CommentContainer({ story }) {
  const dispatch = useDispatch();
  const { projectId } = useParams();

  useEffect(() => {
    dispatch(commentActions.getComments({ storyId: story.id, projectId }));
  }, []);

  const comments = useSelector((state) => state.comment.comments);
  const myComments = comments && comments[story.id] ? comments[story.id] : [];
  return (
    <div>
      <CommentForm storyId={story.id} projectId={projectId} />
      <ul>
        {myComments.map((comment) => (
          <li>
            <Comment comment={comment} />
          </li>
        ))}
      </ul>
    </div>
  );
}
export default CommentContainer;

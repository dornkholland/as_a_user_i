function Comment({ comment }) {
  return (
    <div>
      <p>posted by: {comment.User.name}</p>
      <p>{comment.description}</p>
    </div>
  );
}

export default Comment;

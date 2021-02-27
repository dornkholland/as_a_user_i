const router = require("express").Router({ mergeParams: true });
const asyncHandler = require("express-async-handler");
const { restoreUser } = require("../../utils/auth");
const { User, Comment } = require("../../db/models");

router.get(
  "/",
  restoreUser,
  asyncHandler(async (req, res) => {
    const { storyId } = req.params;
    const comments = await Comment.findAll({
      where: {
        storyId,
      },
      include: {
        model: User,
      },
    });
    return res.json(comments);
  })
);

router.post(
  "/",
  restoreUser,
  asyncHandler(async (req, res) => {
    const { user } = req;
    const { projectId, storyId } = req.params;
    const { description } = req.body;

    const createdComment = await Comment.addComment({
      userId: user.dataValues.id,
      storyId,
      description,
    });

    const comment = await Comment.findByPk(createdComment.dataValues.id, {
      include: { model: User },
    });
    return res.json({ comment });
  })
);
module.exports = router;

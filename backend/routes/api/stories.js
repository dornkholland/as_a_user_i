const router = require("express").Router({ mergeParams: true });
const asyncHandler = require("express-async-handler");
const { Op } = require("sequelize");
const { Story } = require("../../db/models");

const commentRouter = require("./comments.js");
router.use("/:storyId/comments", commentRouter);

router.get(
  "/:windowName",
  asyncHandler(async (req, res) => {
    const { windowName, projectId } = req.params;
    const stories = await Story.getStoriesByWindow({
      windowName,
      projectId,
    });

    return res.json({ stories });
  })
);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const { projectId } = req.params;
    const stories = await Story.getStories({
      projectId,
    });

    return res.json({ stories });
  })
);

router.patch(
  "/:windowName/:storyId",
  asyncHandler(async (req, res) => {
    const {
      storyName,
      storyType,
      storyStatus,
      storyDescription,
      storySize,
    } = req.body;
    const { windowName, projectId, storyId } = req.params;
    const dataObj = {
      id: storyId,
      name: storyName,
      window: windowName,
      storyType,
      description: storyDescription,
      size: storySize,
      status: storyStatus,
      projectId,
    };
    await Story.updateStory(dataObj);
    const story = await Story.getStoryById({ storyId });

    return res.json({ story });
  })
);

router.put(
  "/move/",
  asyncHandler(async (req, res) => {
    const { sourceId, destId, windowName } = req.body.coordsObj;
    const { projectId } = req.params;
    const dataObj = {};
    const storyToMove = req.body.coordsObj.story;

    //update index of moved story
    Story.update(
      { index: destId, window: windowName },
      { where: { id: storyToMove.id } }
    );

    //update indices of old window
    Story.decrement("index", {
      by: 1,
      where: {
        index: { [Op.gt]: sourceId },
        window: storyToMove.window,
        projectId: storyToMove.projectId,
        id: { [Op.ne]: storyToMove.id },
      },
    });

    //update indices of new window
    Story.increment("index", {
      by: 1,
      where: {
        index: { [Op.gte]: destId },
        window: storyToMove.window,
        projectId: storyToMove.projectId,
        id: { [Op.ne]: storyToMove.id },
      },
    });

    return res.json({ storyToMove });
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const {
      storyName,
      storyType,
      storyStatus,
      storyDescription,
      storySize,
      windowName,
      index,
    } = req.body;
    const { projectId } = req.params;
    const dataObj = {
      name: storyName,
      window: windowName,
      index,
      storyType,
      description: storyDescription,
      size: storySize,
      status: storyStatus,
      projectId,
    };
    const story = await Story.createStory(dataObj);
    return res.json({ story });
  })
);

router.delete(
  "/:storyId",
  asyncHandler(async (req, res) => {
    const { storyId } = req.params;
    const story = await Story.getStoryById({ storyId });
    await Story.deleteStory({ story });

    //update indices of other stories in windows

    return res.json({ story });
  })
);

module.exports = router;

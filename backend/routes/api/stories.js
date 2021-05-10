const router = require("express").Router({ mergeParams: true });
const asyncHandler = require("express-async-handler");
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
    console.log(stories);

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
    } = req.body;
    const { projectId } = req.params;
    const dataObj = {
      name: storyName,
      window: windowName,
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
    const deleted = await Story.getStoryById({ storyId });
    await Story.deleteStory({ storyId });
    return res.json({ deleted });
  })
);

module.exports = router;

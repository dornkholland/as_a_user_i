const router = require("express").Router({ mergeParams: true });
const asyncHandler = require("express-async-handler");
const { Story } = require("../../db/models");

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
    console.log(story);

    return res.json({ story });
  })
);

module.exports = router;

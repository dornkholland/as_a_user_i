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
    console.log(stories);

    return res.json({ stories });
  })
);

module.exports = router;

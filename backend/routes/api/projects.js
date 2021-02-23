const router = require("express").Router();
const { Project } = require("../../db/models");
const { restoreUser } = require("../../utils/auth");
const asyncHandler = require("express-async-handler");

router.get(
  "/",
  restoreUser,
  asyncHandler(async (req, res) => {
    const { user } = req;
    if (user) {
      const stuff = await Project.getOwnedProjects(user.id);
      return res.json({
        project: stuff,
      });
    } else return res.json({});
  })
);

module.exports = router;

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
      const owned = await Project.getOwnedProjects(user.id);
      const allProjects = {
        owned,
      };
      return res.json({
        projects: allProjects,
      });
    } else return res.json({});
  })
);

module.exports = router;

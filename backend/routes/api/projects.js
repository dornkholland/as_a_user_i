const router = require("express").Router();
const { Project, UserProject } = require("../../db/models");
const { restoreUser } = require("../../utils/auth");
const asyncHandler = require("express-async-handler");
const { Op } = require("sequelize");

router.get(
  "/",
  restoreUser,
  asyncHandler(async (req, res) => {
    const { user } = req;
    if (user) {
      const owned = await Project.getOwnedProjects(user.id);
      /*query for projects that are not owned but collaborated for a user */
      const collab = await Project.findAll({
        where: {
          [Op.not]: {
            ownerId: user.id,
          },
        },
        include: [
          {
            model: UserProject,
            where: {
              userId: user.id,
            },
          },
        ],
      });
      const allProjects = {
        owned,
        collab,
      };
      return res.json({
        projects: allProjects,
      });
    } else return res.json();
  })
);

module.exports = router;

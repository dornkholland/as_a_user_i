const router = require("express").Router();
const { Project, User, UserProject } = require("../../db/models");
const { restoreUser } = require("../../utils/auth");
const asyncHandler = require("express-async-handler");
const { Op } = require("sequelize");

// route for getting projects on project dash
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
      const tempCollab = await Promise.all(
        collab.map(async (ele) => {
          const data = ele;
          const owner = await User.findByPk(ele.dataValues.ownerId);
          const ownerName = owner.dataValues.name;
          data.dataValues.ownerName = ownerName;
          return data;
        })
      );

      const allProjects = {
        owned,
        collab: tempCollab,
      };
      return res.json({
        projects: allProjects,
      });
    } else return res.json();
  })
);

// Route for create project on project dash
router.post(
  "/",
  restoreUser,
  asyncHandler(async (req, res) => {
    const { user } = req;
    /* query to create project in projects table */
    const res1 = await Project.createProject(user.id, req.body.projectName);
    const projectId = res1.dataValues.id;
    const res2 = await UserProject.createProject(user.id, projectId);
    // query to create project in userprojects table
    const results = { res1, res2 };
    return res.json(results);
  })
);

module.exports = router;

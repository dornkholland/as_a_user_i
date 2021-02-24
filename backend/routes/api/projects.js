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
    const newProject = await Project.createProject(
      user.id,
      req.body.projectName
    );
    const projectId = newProject.dataValues.id;
    // query to create project in userprojects table
    const newUserProject = await UserProject.createProject(user.id, projectId);
    const results = { newProject, newUserProject };
    return res.json(results);
  })
);

// Route for editing project on project dash
router.patch(
  "/:id",
  restoreUser,
  asyncHandler(async (req, res) => {
    /* query to edit project in projects table */
    await Project.editProject(req.params.id, req.body.projectName);
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

router.delete(
  "/:projectId",
  asyncHandler(async (req, res) => {
    const { projectId } = req.params;
    //delete all instances of project from userproject table
    await UserProject.deleteProject(projectId);
    //delete all instances of project from project table
    await Project.deleteProject(projectId);
    //return specific deleted project from project table
    return res.json({
      project: projectId,
    });
  })
);

module.exports = router;

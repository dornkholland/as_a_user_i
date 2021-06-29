const router = require("express").Router();
const { Project, User, UserProject } = require("../../db/models");
const { restoreUser } = require("../../utils/auth");
const asyncHandler = require("express-async-handler");
const { Op } = require("sequelize");
const { handleValidationErrors } = require("../../utils/validation");

//route for stories
const storiesRouter = require("./stories.js");
router.use("/:projectId/stories", storiesRouter);
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

// route for getting project by id
router.get(
  "/:projectId",
  asyncHandler(async (req, res) => {
    const { projectId } = req.params;
    const project = await Project.findByPk(projectId);
    return res.json({ project });
  })
);

// Route for create project on project dash
router.post(
  "/",
  restoreUser,
  [handleValidationErrors],
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

router.post(
  "/:projectId/collaborator/:collaboratorId",
  asyncHandler(async (req, res) => {
    const { projectId, collaboratorId } = req.params;
    const previous = await UserProject.findAll({
      where: { projectId, userId: collaboratorId },
    });
    if (previous.length === 0) {
      await UserProject.createProject(collaboratorId, projectId);
      return res.json({
        status: 200,
      });
    } else {
      return res.json({
        status: 500,
      });
    }
  })
);

module.exports = router;

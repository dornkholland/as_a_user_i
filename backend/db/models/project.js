const { Validator } = require("sequelize");
("use strict");
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define(
    "Project",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 20],
        },
      },
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Users" },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {}
  );
  Project.associate = function (models) {
    // associations can be defined here
    Project.hasMany(models.Story, {
      foreignKey: "projectId",
    });
    Project.hasMany(models.UserProject, { foreignKey: "projectId" });
    Project.belongsTo(models.User, { foreignKey: "ownerId" });
  };
  Project.getOwnedProjects = async function (userId) {
    const projects = await Project.findAll({
      where: {
        ownerId: userId,
      },
      order: [["id", "DESC"]],
    });
    return projects;
  };
  Project.createProject = async function (userId, projectName) {
    const projects = await Project.create({
      name: projectName,
      ownerId: userId,
    });
    return projects;
  };
  Project.editProject = async function (projectId, projectName) {
    const project = await Project.findByPk(projectId);
    project.name = projectName;
    await project.save();
    return project;
  };
  Project.deleteProject = async function (projectId) {
    const project = await Project.destroy({
      where: {
        id: projectId,
      },
      cascade: true,
      truncate: true,
    });
    return project;
  };

  return Project;
};

const UserProject = require("../models/userproject");
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
    Project.hasMany(models.UserProject, { foreignKey: "projectId" });
    Project.belongsTo(models.User, { foreignKey: "ownerId" });
  };
  Project.getOwnedProjects = async function (userId) {
    const projects = await Project.findAll({
      where: {
        ownerId: userId,
      },
    });
    return projects;
  };
  return Project;
};

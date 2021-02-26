"use strict";
const { Validator } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define(
    "Story",
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
      },
      window: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      storyType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      assignedUserId: {
        type: DataTypes.INTEGER,
        references: { model: "Users" },
      },
      description: {
        type: DataTypes.STRING(5000),
      },
      size: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Projects" },
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
  Story.associate = function (models) {
    // associations can be defined here
    Story.belongsTo(models.Project, { foreignKey: "projectId" });
    Story.belongsTo(models.User, { foreignKey: "assignedUserId" });
  };

  Story.getStoriesByWindow = async function ({ windowName, projectId }) {
    const stories = await Story.findAll({
      where: {
        window: windowName,
        projectId,
      },
    });
    return stories;
  };

  return Story;
};

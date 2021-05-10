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
    Story.hasMany(models.Comment, {
      foreignKey: "storyId",
    });
    Story.belongsTo(models.Project, {
      foreignKey: "projectId",
    });
    Story.belongsTo(models.User, { foreignKey: "assignedUserId" });
  };

  Story.getStories = async function ({ projectId }) {
    const stories = await Story.findAll({
      where: {
        projectId,
      },
    });
    return stories;
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

  Story.getStoryById = async function ({ storyId }) {
    const story = await Story.findByPk(storyId);
    return story;
  };

  Story.updateStory = async function (storyData) {
    const story = await Story.update(
      {
        name: storyData.name,
        window: storyData.window,
        description: storyData.description,
        size: storyData.size,
        status: storyData.status,
        storyType: storyData.storyType,
      },
      { where: { id: storyData.id } }
    );

    return story;
  };
  Story.createStory = async function (storyData) {
    const story = await Story.create({
      name: storyData.name,
      window: storyData.window,
      description: storyData.description,
      size: storyData.size,
      status: storyData.status,
      storyType: storyData.storyType,
      projectId: storyData.projectId,
    });

    return story;
  };

  Story.deleteStory = async function ({ storyId }) {
    const deleted = await Story.destroy({
      where: {
        id: storyId,
      },
      cascade: true,
    });
    return deleted;
  };

  return Story;
};

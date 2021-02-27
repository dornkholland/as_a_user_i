("use strict");
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      storyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Stories" },
      },
      userId: {
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
  Comment.associate = function (models) {
    Comment.belongsTo(models.User, { foreignKey: "userId" });
    Comment.belongsTo(models.Story, { foreignKey: "storyId" });
    // associations can be defined here
  };

  Comment.addComment = async function ({ storyId, userId, description }) {
    const comment = await Comment.create({
      storyId,
      description,
      userId,
    });
    return comment;
  };

  Comment.deleteComment = async function ({ commentId }) {
    const deletedComment = await Comment.destroy({ where: { id: commentId } });
    return deletedComment;
  };

  return Comment;
};


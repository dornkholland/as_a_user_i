("use strict");
module.exports = (sequelize, DataTypes) => {
  const UserProject = sequelize.define(
    "UserProject",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Users" },
      },
      projectId: {
        type: DataTypes.INTEGER,
        references: { model: "Projects" },
        allowNull: false,
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
  UserProject.associate = function (models) {
    // associations can be defined here
    UserProject.belongsTo(models.User, { foreignKey: "userId" });
    UserProject.belongsTo(models.Project, { foreignKey: "projectId" });
  };
  UserProject.createProject = async function (userId, projectId) {
    const projects = await UserProject.create({
      userId,
      projectId,
    });
    return projects;
  };
  UserProject.deleteProject = async function (projectId) {
    const projects = await UserProject.destroy({
      where: {
        projectId,
      },
    });
    return projects;
  };
  return UserProject;
};

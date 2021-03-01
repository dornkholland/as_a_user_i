"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Projects",
      [
        {
          name: "as a user, i...",
          ownerId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Comic Collections",
          ownerId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Demo's Project",
          ownerId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "WUPHF.com",
          ownerId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Pied Piper",
          ownerId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  },
};

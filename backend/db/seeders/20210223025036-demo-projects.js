"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Projects",
      [
        {
          name: "Demo Project 1",
          ownerId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Demo Project 2",
          ownerId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Demo Project 3",
          ownerId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Demo Project 4",
          ownerId: 2,
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

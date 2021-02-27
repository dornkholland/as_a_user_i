"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Stories",
      [
        {
          name: "do some cool stuff like load a test story.",
          window: "Backlog",
          storyType: "Feature",
          assignedUserId: 1,
          description:
            "This is the first story to ever be created on this application.  It's pretty cool.",
          size: 1,
          status: "Unstarted",
          projectId: 1,
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

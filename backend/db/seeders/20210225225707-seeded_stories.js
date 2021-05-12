"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Stories",
      [
        {
          name: "drag and drop multiple windows for better organization",
          window: "Done",
          storyType: "Feature",
          assignedUserId: 1,
          description:
            "This app is based on drag and drop functionality.  This means that windows will need to be able to be dragged and dropped around, and toggled on and off.",
          size: 4,
          status: "Done",
          projectId: 1,
          index: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "create stories from the backlog, issues and icebox windows.",
          window: "Done",
          storyType: "Feature",
          assignedUserId: 1,
          description:
            "Stories will need to be able to be created from the backlog, issues or icebox windows.",
          size: 2,
          status: "Done",
          projectId: 1,
          index: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "push a story through the workflow of the different windows",
          window: "Done",
          storyType: "Feature",
          assignedUserId: 1,
          description:
            "The status of stories will need to be able to be changed by either buttons or drag and drop to the corresponding window.",
          size: 4,
          status: "Done",
          projectId: 1,
          index: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name:
            "Checkout my other project, made completely without react.  Live link and github repo are in the description!",
          window: "Backlog",
          storyType: "Other",
          assignedUserId: 1,
          description:
            "live link: https://comic-collections.herokuapp.com/ ||| github repository : https://github.com/sam-hearst/Comic-collection",
          size: 1,
          status: "Unstarted",
          projectId: 2,
          index: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "see a favicon on my browser",
          window: "Backlog",
          storyType: "Feature",
          assignedUserId: 1,
          description:
            "There is no favicon being rendered on the comic collections site.",
          size: 1,
          status: "Unstarted",
          projectId: 2,
          index: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "click on all links on website without finding a 404",
          window: "Backlog",
          storyType: "Bug",
          assignedUserId: 1,
          description:
            "There are dead links that lead to 404 on the login and signup pages.",
          size: 1,
          status: "Unstarted",
          projectId: 2,
          index: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name:
            "automatically send a message to everyone I know when I receive a text or call",
          window: "Backlog",
          storyType: "Bug",
          assignedUserId: 1,
          description:
            "As WUPFH is a multimedia communication tool, it requires the feature that all connected social media accounts will send messages automatically when anything is received.",
          size: 8,
          status: "Unstarted",
          projectId: 4,
          index: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name:
            "apply the compression algorithm for easy storage of music and other multimedia",
          window: "Backlog",
          storyType: "Bug",
          assignedUserId: 1,
          description:
            "The compression algorithm needs to be accessible via a UI that can take in multimedia files to compress",
          size: 4,
          status: "Unstarted",
          projectId: 5,
          index: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Click the maximize button to see further details ->",
          window: "Backlog",
          storyType: "Other",
          assignedUserId: 1,
          description:
            "This project was created to showcase CRUD functionality of projects.  If you'd like to see actual projects in action, check out the dev owned projects As a user i..., and Comic collections.",
          size: 4,
          status: "Unstarted",
          projectId: 3,
          index: 0,
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
    return queryInterface.bulkDelete("Stories", null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  },
};

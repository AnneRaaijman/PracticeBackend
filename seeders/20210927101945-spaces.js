"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "spaces",
      [
        {
          title: "testuserspace",
          description: "welcome to my test space",
          backgroundColor: "#2CD439",
          color: "#D44A2C",
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "dummyspace",
          description: "welcome to my dummy space",
          backgroundColor: "#D44A2C",
          color: "#2CD439",
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("spaces", null, {});
  },
};

"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "stories",
      [
        {
          name: "what a story",
          content: "some real exciting stuff",
          imageurl:
            "https://pbs.twimg.com/media/ETptP4cX0AEP8jl?format=jpg&name=4096x4096",
          spaceId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "what a story 2",
          content: "some real exciting stuff 2",
          imageurl:
            "https://eatliver.b-cdn.net/wp-content/uploads/2018/04/hilarious-cartoon1.png",
          spaceId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "what a story",
          content: "some real exciting stuff",
          imageurl:
            "https://pbs.twimg.com/media/ETptP4cX0AEP8jl?format=jpg&name=4096x4096",
          spaceId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "what a story 2",
          content: "some real exciting stuff 2",
          imageurl:
            "https://eatliver.b-cdn.net/wp-content/uploads/2018/04/hilarious-cartoon1.png",
          spaceId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("stories", null, {});
  },
};

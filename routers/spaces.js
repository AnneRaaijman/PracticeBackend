const { Router } = require("express");
const Space = require("../models").space;
const Story = require("../models").story;

const router = new Router();

router.get("/", async (req, res) => {
  try {
    const spaces = await Space.findAll();
    res.send(spaces);
  } catch (e) {
    console.log(e.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const spaceId = parseFloat(req.params.id);
    const spaceDetails = await Space.findByPk(spaceId, { include: [Story] });
    res.send(spaceDetails);
  } catch (e) {
    console.log(e.message);
  }
});

router.delete("/story/:id", async (req, res, next) => {
  try {
    const storyId = parseInt(req.params.id);
    console.log("storyID:", storyId);
    const storyToDelete = await Story.findByPk(storyId);
    console.log("story", storyToDelete);
    if (!storyToDelete) {
      res.status(404).send("story not found");
    } else {
      const deleted = await storyToDelete.destroy();
      res.json(deleted);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;

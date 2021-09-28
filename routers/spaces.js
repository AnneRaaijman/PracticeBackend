const { Router } = require("express");
const Space = require("../models").space;
const story = require("../models").story;

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
    const spaceDetails = await Space.findByPk(spaceId, { include: [story] });
    res.send(spaceDetails);
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;

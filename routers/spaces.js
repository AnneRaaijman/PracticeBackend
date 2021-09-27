const { Router } = require("express");
const Space = require("../models").space;

const router = new Router();

router.get("/", async (req, res) => {
  try {
    const spaces = await Space.findAll();
    res.send(spaces);
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;

const bcrypt = require("bcrypt");
const { Router } = require("express");
const { toJWT } = require("../auth/jwt");
const authMiddleware = require("../auth/middleware");
const User = require("../models/").user;
const Space = require("../models/").space;
const Story = require("../models").story;
const { SALT_ROUNDS } = require("../config/constants");

const router = new Router();

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Please provide both email and password" });
    }

    const user = await User.findOne({
      where: { email },
      include: { model: Space, include: [Story] },
    });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).send({
        message: "User with that email not found or password incorrect",
      });
    }

    delete user.dataValues["password"]; // don't send back the password hash
    const token = toJWT({ userId: user.id });
    return res.status(200).send({ token, ...user.dataValues });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

router.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(400).send("Please provide an email, password and a name");
  }

  try {
    const newUser = await User.create({
      email,
      password: bcrypt.hashSync(password, SALT_ROUNDS),
      name,
    });

    delete newUser.dataValues["password"]; // don't send back the password hash

    const space = await Space.create({
      title: `${newUser.name}'s space`,
      userId: newUser.id,
    });

    const token = toJWT({ userId: newUser.id });

    res.status(201).json({ token, ...newUser.dataValues, space });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .send({ message: "There is an existing account with this email" });
    }

    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

router.post("/myspace", async (req, res, next) => {
  try {
    const { name, content, imageurl, spaceId } = req.body.newPost;
    if (!name) {
      return res.status(400).send("Bro whats good, was yo story name");
    } else {
      const newStory = await Story.create({
        name,
        content,
        imageurl,
        spaceId,
      });
      console.log(newStory);
      res.send(newStory);
    }
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

// The /me endpoint can be used to:
// - get the users email & name using only their token
// - checking if a token is (still) valid
router.get("/me", authMiddleware, async (req, res) => {
  // don't send back the password has
  delete req.user.dataValues["password"];

  const space = await Space.findOne({
    where: req.user.id,
    include: Story,
  });
  res.status(200).send({ ...req.user.dataValues, space });
});

module.exports = router;

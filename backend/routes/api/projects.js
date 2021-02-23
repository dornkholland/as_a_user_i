const router = require("express").Router();
const {projects} = require("../../db/models")

router.get("/", (req, res) => {
  const { user } = req;
  if (user) {
    const projects = 
    return res.json({
      user: user.toSafeObject(),
    });
  } else return res.json({});
});

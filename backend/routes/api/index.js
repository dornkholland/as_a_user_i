const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const projectsRouter = require("./projects.js");

router.use("/session", sessionRouter);
router.use("/projects", projectsRouter);

router.use("/users", usersRouter);

module.exports = router;

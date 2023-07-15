const express = require("express");
const isAuthenticated = require("../middlewares/auth");
const Task = require("../models/taskScheema");
const { ErrorHandler } = require("../middlewares/errorm");
const router = express.Router();

router.post("/new", isAuthenticated, async (req, res, next) => {
  try {
    const { title, description } = req.body;
    await Task.create({
      title,
      description,
      user: req.user,
    });

    res.status(201).json({
      success: true,
      message: "Task added Successfully",
    });
  } catch (error) {
    next(error);
  }
});

router.get("/getAllTask", isAuthenticated, async (req, res, next) => {
  try {
    const userid = req.user._id;
    const tasks = await Task.find({ user: userid });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", isAuthenticated, async (req, res, next) => {
  try {
    const id = req.params.id;

    const task = await Task.findById(id);

    if (!task) {
      return next(new ErrorHandler("Task Not Found", 404));
    }
    task.isCompleted = !task.isCompleted;
    await task.save();

    res.status(200).json({
      success: true,
      mesage: "Task Updated",
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", isAuthenticated, async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return next(new ErrorHandler("Task Not Found", 404));
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      mesage: "Task Deleted",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

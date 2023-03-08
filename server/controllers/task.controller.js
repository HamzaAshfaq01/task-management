import Task from "../models/task.model.js"

export const createTaskController = async (req, res) => {
  const { title, description } = req.body;
  if (!title && !description)
    return res.status(400).json({
      error: "Please fill all fields",
    });

  try {
    const task = await Task.create({
      user: req.user._id,
      title,
      description,
      creator: req.user.name,
    });
    return res.json({ message: "Task Successfull created", task });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: "Task Creation Failed. Please try again",
    });
  }
};
// user tasks
export const getAllTaskController = async (req, res) => {
  try {
    const tasks = await Task.find({});
    return res.json({ tasks });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: error,
    });
  }
};
export const getTaskDetailController = async (req, res) => {
  try {
    const taskDetail = await Task.findById(req.params.id);
    return res.json({ taskDetail });
  } catch (error) {
    return res.status(400).json({
      error: error,
    });
  }
};
// user own tasks
export const getUserTasksController = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    return res.json({ tasks });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: error,
    });
  }
};

import Task from "../models/task.mode";
import StatusCodes from "http-status-codes";
import { HTTPError, HTTPResponse } from "../utils/response";

export const addTask = async (req, res) => {
  const { title } = req.body;
  const createdBy = req.user["_id"];
  let task = await Task.findOne({ title, createdBy });
  if (task) {
    let error = new HTTPError(
      "Task with that title already exists!",
      StatusCodes.CONFLICT
    );
    return res.status(StatusCodes.CONFLICT).json(error);
  }
  task = new Task({
    ...req.body,
    createdBy,
  });
  await task.save();
  let response = new HTTPResponse("Task created successfully!", task);
  return res.status(StatusCodes.CREATED).json(response);
};

export const getTaskById = async (req, res) => {
  let _id = req.params.id;
  const product = await Task.findById(_id).populate("createdBy", "-password");
  let response = new HTTPResponse("Success", product);
  res.status(StatusCodes.OK).json(response);
};

export const getAllTask = async (req, res) => {
  let skip = Number(req.params.skip) || 0;
  const product = await Task.find()
    .skip(skip)
    .limit(10)
    .lean()
    .populate("createdBy", "-password");
  let response = new HTTPResponse("Success", product);
  res.status(StatusCodes.OK).json(response);
};

export const updateTask = async (req, res, next) => {
  let response;
  const { id } = req.params;
  const createdBy = req.user["_id"];
  const data = req.body;

  const updatedTask = await Task.findOneAndUpdate(
    { _id: id, createdBy },
    data,
    {
      new: true,
    }
  ).populate("createdBy", "-password");
  console.log("deletedTask", updatedTask);
  if (updatedTask) {
    response = new HTTPResponse("Task updated successfully!", updatedTask);
    res.status(StatusCodes.OK).json(response);
  } else {
    response = new HTTPError(
      "Task with that ID not found!",
      StatusCodes.CONFLICT
    );
    res.status(StatusCodes.CONFLICT).json(response);
  }
};

export const deleteTask = async (req, res, next) => {
  let response;
  const { id } = req.params;
  const createdBy = req.user["_id"];
  const deletedTask = await Task.findOneAndDelete({ _id: id, createdBy });
  if (deletedTask) {
    response = new HTTPResponse("Task deleted successfully!", deletedTask);
    res.status(StatusCodes.OK).json(response);
  } else {
    response = new HTTPError(
      "Task with that ID not found!",
      StatusCodes.CONFLICT
    );
    res.status(StatusCodes.CONFLICT).json(response);
  }
};

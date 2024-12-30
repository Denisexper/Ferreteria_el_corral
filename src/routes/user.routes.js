import express from 'express';
import UserController from "../controllers/user.controller.js";

const usercontroll = new UserController();

const app = express.Router()

app.post("/create-user", usercontroll.createUser)
app.get("/get-users", usercontroll.getAllUsers)

export default app;
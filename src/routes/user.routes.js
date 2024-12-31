import express from 'express';
import UserController from "../controllers/user.controller.js";

const usercontroll = new UserController();

const app = express.Router()

app.post("/create-user", usercontroll.createUser)
app.get("/get-users", usercontroll.getAllUsers)
app.get("/get-user/:id", usercontroll.getUser)
app.put("/update-user/:id", usercontroll.updateUser)
app.delete("/delete-user/:id", usercontroll.deleteUser)
export default app;
import express from 'express';
import UserController from "../controllers/user.controller.js";
import { verifyToken } from '../middleware/aut.middleware.js';

const usercontroll = new UserController();

const app = express.Router()

//rutas privadas utilizan jwt
app.post("/create-user", verifyToken, usercontroll.createUser)
app.get("/get-users", verifyToken, usercontroll.getAllUsers)
app.get("/get-user/:id", verifyToken, usercontroll.getUser)
app.put("/update-user/:id", verifyToken, usercontroll.updateUser)
app.delete("/delete-user/:id", verifyToken, usercontroll.deleteUser)

//Login user ruta publica no usa jwt
app.post("/login", usercontroll.login)
export default app;

//aqui tambien podemos agregarle middlewares a las rutas 
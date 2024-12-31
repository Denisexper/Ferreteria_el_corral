import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { generateToken } from '../utils/jwt.js'; // Asegúrate de tener esta función

class UserController {

    async createUser(req, res) {
        try {
            const { name, email, password, role } = req.body;

            // Validar que la contraseña tenga al menos 8 caracteres
            if (password.length < 8) {
                return res.status(400).send({
                    status: false,
                    message: "Password must be at least 8 characters long"
                });
            }

            // Hashear la contraseña
            const hashedPassword = await bcrypt.hash(password, 10);

            // Crear nuevo usuario con la contraseña hasheada
            const newUser = await User.create({ name, email, password: hashedPassword, role });

            res.status(201).send({
                message: "User created successfully",
                newUser
            });

        } catch (error) {
            res.status(400).send({
                status: false,
                message: error.message
            });
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await User.find().select("-__v");
            res.status(200).send({
                message: "Users retrieved successfully",
                users
            });
        } catch (error) {
            res.status(400).send({
                message: "Error retrieving users",
                error
            });
        }
    }

    async getUser(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findById(id).select("-__v");
            if (!user) {
                return res.status(404).send({
                    message: "Please enter a correct ID"
                });
            }
            res.status(200).send({
                message: "User retrieved successfully",
                user
            });
        } catch (error) {
            res.status(400).send({
                message: "Error retrieving user",
                error
            });
        }
    }

    async updateUser(req, res) {
        try {
            const { id } = req.params;
            let { name, email, password, role } = req.body;

            // Si el campo password existe, lo hasheamos
            if (password) {
                if (password.length < 8) {
                    return res.status(400).send({
                        message: "Password must be at least 8 characters long",
                    });
                }
                password = await bcrypt.hash(password, 10); // Hasheamos la nueva contraseña
            }

            const updatedUser = await User.findByIdAndUpdate(id, { name, email, password, role }, { new: true });

            res.status(200).send({
                message: "User updated successfully",
                updatedUser
            });
        } catch (error) {
            res.status(400).send({
                message: "Error updating user",
                error
            });
        }
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findByIdAndDelete(id);
            res.status(200).send({
                message: "User deleted successfully",
                user
            });
        } catch (error) {
            res.status(400).send({
                message: "Error deleting user",
                error
            });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).send({
                    message: "Please enter correct credentials"
                });
            }

            // Verificar la contraseña (comparar la ingresada con la hasheada)
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).send({
                    message: "Incorrect password"
                });
            }

            // Generar el token JWT si la contraseña es correcta
            const token = generateToken({ id: user._id, email: user.email, role: user.role });

            res.status(200).send({
                message: "User logged in successfully",
                token,
                user
            });
        } catch (error) {
            res.status(400).send({
                message: "Error logging in user",
                error
            });
        }
    }

}


export default UserController;
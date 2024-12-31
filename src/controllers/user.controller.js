import User from "../models/user.model.js"

class UserController {

    async createUser  (req, res) {
        try {
            const {name, email, password, role} = req.body
            const newuser = await User.create({ name, email, password, role })

            if(password.lenght < 8){
                return res.send({
                    status: false,
                    message: "Password must be at least 8 characters long"
                })
            }
            res.status(201).send({
                message: "User created successfully",
                newuser
            })

        } catch (error) {
            res.send({
                status: false,
                message: error.message
            })
        }
    }

    async getAllUsers (req, res) {
        try {
            const users = await User.find().select("-__v")
            res.status(200).send({
                message: "Users retrieved successfully",
                users
            })
        } catch (error) {
            res.status(400).send({
                message: "Error retrieving users",
                error
            })
        }
    }

    async getUser (req, res) {
        try {
            const { id } = req.params
            const user = await User.findById(id).select("-__v")
            if (!user) {
                res.status(404).send({
                    message: "please enter a correct id"
                })
            }
            res.status(200).send({
                message: "User retrieved successfully",
                user
            })
        } catch (error) {
            res.status(400).send({
                message: "Error retrieving user",
                error
            })
        }
    }

    async updateUser (req, res) {
        try {
            const { id } = req.params;
            const { name, email, password, role } = req.body;
            const user = await User.findByIdAndUpdate(id, {name, email, password, role}, {new: true})
            
            if(password.lenght < 8){
                res.status(400).send({
                    message: "Password must be at least 8 characters long",
                })
            }
            res.status(200).send({
                message: "User updated successfully",
                user
            })
        } catch (error) {
            res.status(400).send({
                message: "Error updating user",
                error
            })
        }
    }

    async deleteUser (req, res) {
        try {
            const { id } = req.params;
            const user = await User.findByIdAndDelete(id)
            res.status(200).send({
                message: "User deleted successfully",
                user
            })
        } catch (error) {
            res.status(400).send({
                message: "Error deleting user",
                error
            })
        }
    }

}

export default UserController;
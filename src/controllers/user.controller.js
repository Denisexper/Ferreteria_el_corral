import User from "../models/user.model.js"

class UserController {

    async createUser  (req, res) {
        try {
            const {name, email, password, role} = req.body
            const newuser = await User.create({ name, email, password, role })
            res.status(201).send({
                message: "User created successfully",
                newuser
            })
        } catch (error) {
            console.log(error)
        }
    }

    async getAllUsers (req, res) {
        try {
            const users = await User.find()
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

}

export default UserController;
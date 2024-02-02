import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';

class AuthController {
    static async register(req, res) {
        const { name, email, password } = req.body;

        try {

            const findUser = await User.findOne({ email })

            if (findUser) {
                res.status(401).json({
                    message: "User already exists"
                })
            }


            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            console.log(hash);

            const user = new User({
                username: name,
                email: email,
                password: hash,

            });

            await user.save();

            res.status(200).json({
                message: 'success',
                data: user
            });

        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: 'error',
                error: err.message
            });
        }
    }


    static async login(req, res) {
        const { email, password } = req.body

        try {
            const findUser = await User.findOne({ email })

            if (!findUser) {
                res.status(401).json({
                    message: "User not found"
                })
            }

            if (!bcrypt.compareSync(password, findUser.password)) {
                return res.status(400).json({
                    message: 'Invalid credentials'
                })
            }

            const payloadData = {
                username: findUser.username,
                email: findUser.email,
                userType: findUser.userType
            }

            const token = jwt.sign(payloadData, process.env.JWT_SECRET, {
                expiresIn: "365d"
            })

            return res.status(200).json({
                message: "Logged In",
                access_token: `Bearer ${token}`,
                name: findUser.username,
                email: findUser.email,
                id:findUser._id
            })
        } catch (err) {
            console.log(err)



        }
    }
}

export default AuthController;

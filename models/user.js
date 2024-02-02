import mongoose, { mongo } from "mongoose";

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    userType: {
        type: String,
        enum: ['admin', 'regular'],
        default: 'regular'
      },
})

const User = mongoose.model('User', UserSchema, 'users');

export default User;
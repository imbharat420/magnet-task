import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    }
})


userSchema.methods.matchPassword = async function (enteredPassword) {
    const isValid = await bcrypt.compare(enteredPassword, this.password)
    return isValid
}
  
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('user', userSchema);

export default User;
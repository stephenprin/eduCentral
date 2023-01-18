import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";



export interface UserInterface{
    [x: string]: any;
    name: string;
    email: string;
    password: string;
    confirmPassword:string | undefined;
    phone: string;


}

const userSchema = new mongoose.Schema<UserInterface>({
    name: {
        type: String,
        required: [true, 'A name must be enter'],
        trim: true,
        maxlength: [30, 'A  name must have more then 30 characters'],
        minlength: [5, 'A name must have less then 5 characters'],
    },
   
    phone: {
        type: String,
        required: [true, 'Please provide a phone number'], 
        unique: true,
        
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        lowercase: true,
        validate:[validator.isEmail]
    },
  
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please confirm password'],
        validate: {
            validator: function (this:UserInterface  ,el: string) { 
                return el === this.password
            },
            message:'Password are not the same'
        }
    },


})

userSchema.pre<UserInterface>("save", async function (next) { 
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword= undefined;
    next();
})
    
userSchema.methods.correctPassword = async function (candidatePassword: string, userPassword: string) {
    try {
        return await bcrypt.compare(candidatePassword, userPassword)
    } catch (error) {
        return error
    }
 }




const User = mongoose.model<UserInterface>("User", userSchema)

export default User;
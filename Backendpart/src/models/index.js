import dotenv from "dotenv";
dotenv.config()
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { type } from "os";
(async () => {
    try {
        await mongoose.connect(process.env.DB_URL,{useNewUrlParser: true,useUnifiedTopology: true,dbName: 'Busdatabase',
  }).then(() => {
            console.log("database successfully conected");
        })
    } catch (error) {
        console.log("error in connecting databse", error);
    }
})();
const signschema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    phonenumber: {
        type: String,
        required: true,
        validate: (val) => {
            return val.length==10
        }
    },
    email: {
        type: String,
        required: true,
        validate: (val) => {
            return val.match("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")
        }
    },
    password: {
        type: String,
        required: true,
        validate: (val) => {
            return val.length>=8
        }
        
    },
    refreshtoken: {
        type:String
    }
}, { timestamps: true }
)
const likeschema = new mongoose.Schema({
    busno: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true
    }
}, {
    timestamps:true
})
signschema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
 this.password=  await bcrypt.hash(this.password,10)
    next();
})
signschema.methods.ispasswordcorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}
signschema.methods.genrateaccestoken = function () {
  const accestoken =jwt.sign({
        _id: this._id,
        email: this.email,
        name:this.name
    },
    process.env.ACCESS_SECRET_KEY,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    })
    return accestoken;
}
signschema.methods.genraterefreshtoken = function () {
  const refershtoken=  jwt.sign({
        _id: this._id,
        name:this.name
    },
    process.env.REFRESH_SECRET_KEY,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
      })
    return refershtoken
}
export const signmodel = new mongoose.model("signupdetails", signschema);
export const likemodel = new mongoose.model("likemodel", likeschema);
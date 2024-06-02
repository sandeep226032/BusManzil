import express from "express"; 
import { run,magic,save ,see,signupverify,genrateaccessandrefreshtoken} from "../services/index.js";
import { error } from "console";
import cookie from "cookie-parser";
import { signmodel ,likemodel} from "../models/index.js";

export const search = (req, res) => {
     let data = req.body;
   let  a = data.from +"to"+ data.to;
     a = a.toLowerCase();
     console.log(a);
     run(a).then((data) => {
          res.json(data);
          
     })
     }
export const play = (req,res) => {
     let data = req.body;
     
     console.log(String(data.busno));
     magic(String(data.busno)).then((data) => {
          res.json(data);
          console.log(data);
     })
     
}

export const register = (req, res) => {
     let data = req.body;
     console.log(data)
     const { name, email, phonenumber, password } = data;
     if (name == "" || email == "" || phonenumber == "" || password == "") {
          res.status(404).json({
                    message:"please fill up details correctly"
               })
          return
     }
     signupverify(data).then((d) => {
          if (d == true) {
               save(data).then(() => {
                    res.status(200).json({
                    message:"succesfully sign up"
               });
               })
          } else {
               res.status(200).json({
                    message:"user is alredy resgistered"
               })
                    ;
          }

     })
     


     

}
export const check = async(req, res) => {
     let data = req.body;

     const { name, password,email } = data;

     if (name == "" || password == ""||email=="") {
          res.status(400).json({
                    message:"please fill up log in details"
               })
          return
     }
     see(data).then((re) => {
          if (re == null) {
               res.status(404).json({
                    message:"not found details"
               })
               return
          } else {
               re.ispasswordcorrect(data.password).then((d) => {
                    
                    if (d) {
                         const i = re._id;
                         genrateaccessandrefreshtoken(i).then(({ a, r }) => {
                              const options = {
                                   httponly: true,
                                   // secure: true,
                                   domain: 'localhost'
                              
                              }
                              console.log("login successfully")
                              res.status(200)
                                   .cookie("Accesstoken", a, options)
                                   .cookie("Refreshtoken", r, options)
                                   .json({
                    message:"log in succesfull"
               })
                    })
               
               // res.send("login succesfull");
                    } else {
                         res.json({
                              message:"password is incorrect"
                         });
                    }
     
     })
          
          }
     
     })
     
}
export const logout = async(req, res) => {
     const userdata = req.user;
     await signmodel.findByIdAndUpdate(userdata._id, {
          $set: {
               refreshtoken:undefined
          }
     })
      const options = {
                                   httponly: true,
                                   // secure: true,
                                   domain: 'localhost'
                              
     }
     return res.status(200)
          .clearCookie("Accesstoken", options).clearCookie("Refreshtoken", options).json({
               message:"user logout succesfully"
          })


}
export const like = async (req, res) => {
     let info = req.body
     let userinfo= req.user

     const { busno } = info;
     const { email } = userinfo;
     try {
          await likemodel.create({
               busno: busno,
               email:email
          })
          res.status(200).json({
               message:"successfully saved"
          })
     } catch (error) {
          console.log("error in like conroller", error);
     }
}



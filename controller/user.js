import bcrypt from 'bcrypt';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';

export const userRegister = async(req,res)=>{
    const{name, email, password} = req.body;
    let user = await User.findOne({email});
    if(user){
        return res.json({
            success: false,
            message: "User is already registered"
        })
    }
    const enpassword = await bcrypt.hash(password, 10);
    user = await User.create({
        name,
        email,
        password : enpassword
    })

    const token = jwt.sign({_id: user._id}, process.env.SECRATE_TOKEN);

    res.status(200).cookie("token", token, {
        httpOnly: true
    }).json({
        success: true,
        message: "User created successfully"
    });     
}

export const userLogin =  async (req,res)=>{
   const {email, password} = req.body;
   const user = await User.findOne({email});

   if(!user){
    return res.status(404).json({
        success: false,
        message: "Invalid user, Register first"
    });
   };

   const isMatch = await bcrypt.compare(password, user.password);
   if(!isMatch){
    return res.json({
        success: false,
        message: "Invalid Password"
    });
   };

   const token = jwt.sign({_id: user._id}, process.env.SECRATE_TOKEN);
   res.cookie("token", token,{
    httpOnly: true,
   }).json({
    success: true,
    message: "Login successfully"
   });
}



export const userLogout = async(req,res) =>{
   res.status(200).cookie("token", "",{
    expires: new Date(Date.now())
   }).json({
    success: true,
    message: "Logout successfully"      
   })
}


export const getUser = async(req,res) =>{
    const {token} = req.cookies;
   
    if(!token){
        return res.status(404).json({
            success: false,
            message: "Login first"
        });
    };

    const decoded = jwt.verify(token, process.env.SECRATE_TOKEN);
    const user = await User.findById(decoded._id);
    res.status(200).json({
        success: true,
        user
    })

}
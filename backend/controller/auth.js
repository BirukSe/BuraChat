
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import User from '../models/userModel.js';
export const logger=async(req, res)=>{
    try{
        const {username, password}=req.body;
        const user=await User.findOne({username});
        if(user){
            const isPasswordCorrect=await bcrypt.compare(password, user.password);
            if(isPasswordCorrect){
                res.status(200).json(user);
            }else{
                res.status(400).json({message:"Invalid Credentials"});
            }
        }

    }catch(error){
        res.status(500).json({message:error.message})
        console.log(error);
    }

}
export const signupper=async(req, res)=>{
    const {name, username, password}=req.body;
    try{
        const userExist=await User.findOne({username});
        if(userExist){
            return res.status(400).json({message:"User already exists"});
        }
        const hashedPassword=await bcrypt.hash(password, 10);

        const user=await User.create({
            name,
            username,
            password: hashedPassword
        });
        res.status(200).json(user);


    }catch(error){
        res.status(500).json({message:error.message})
        console.log(error);
    }
}
export const getUsers=async(req, res)=>{
    try{
        console.log("I am awesome")
        const response=await User.find();
        console.log(response)
        console.log("I am here");
       

        res.status(200).json(response);

    }catch(error){
        res.status(500).json({message:error.message})
        console.log("error", error);
    }
}
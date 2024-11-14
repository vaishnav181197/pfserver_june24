
const users=require('../Models/userModel')
const jwt=require('jsonwebtoken')

exports.userRegister=async(req,res)=>{
    try{
        const {email,username,password}=req.body
        if(!email || !username || !password){
            res.status(406).json("Invalid Data!!")
        }
        else{
            const newUser=new users({email,username,password,profile:"",linkdin:"",github:""})
            await newUser.save()
            res.status(200).json(newUser)
         
        }
    }
    catch(err){
        console.log(err)
        res.status(400).json(err)
    }
    
}

exports.userLogin=async(req,res)=>{
    // console.log(req.body)
    try{
        const {email,password}=req.body
        const existing=await users.findOne({email,password})
        if(existing){
            console.log(existing)
            const token=jwt.sign({userId:existing._id},process.env.SECRET_KEY)
            res.status(200).json({token,username:existing.username,github:existing.github,linkdin:existing.linkdin,profile:existing.profile})
        }
        else{
            res.status(406).json("Invalid Email/Password")
        }
    }
    catch(err){
        console.log(err)
        res.status(400).json(err)
    }
    
}

exports.userUpdation=async(req,res)=>{
    try{
        const userId=req.payload
        if(req.file){
            var profile=req.file.filename
            var {username,github,linkdin}=req.body
        }
        else{   
            var {profile,username,github,linkdin}=req.body
        }

        const result=await users.findByIdAndUpdate(userId,{username,github,linkdin,profile})
        res.status(200).json("Updated!!")
    }
    catch(err){
        console.log(err)
        res.status(400).json(err)
    }
}

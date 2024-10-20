require('dotenv').config();
const db = require('../models')
const Account = db.account
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

exports.singup = async (req,res)=>{
     try{
        const {username,email,password} = req.body;

        const userExist = await Account.findOne({
            where:{email}
        })
        if(userExist){
            return res.status(400).send('Email is already associated');
        }
        await Account.create({
            username,
            email,
            password: await bcrypt.hash(password,15)
        })
        res.status(200).send('register success!');
     }catch(err){
        return res.status(500).send('Error in registering user');
     }
}

exports.singin = async (req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await Account.findOne({
            where:{email}
        })
        if(!user){
            return res.status(404).json('email not found!');
        }
        const verifyPassword = await bcrypt.compare(password,user.password)
        if(!verifyPassword){
            return res.status(404).json('incorrect email or password!')
        }
        jwt.sign({email,id:user.id},process.env.JWT_SECRET,{
            expiresIn: '1h'
        },(err,token)=>{
            if(err) throw err
            res.cookie('token',token).json({
                id:user.id,
                email
            })
        })
        
       
    }catch(err){
        return res.status(500).send('Sign in error');
    }
}

exports.getProfile = (req,res)=>{
     
    const {token} = req.cookies;    
    
    jwt.verify(token,process.env.JWT_SECRET,{},async (err,info)=>{
       res.json({info});
    })
   
   
}
exports.logout = (req,res)=>{
    res.cookie('token','').json('logout!')
}
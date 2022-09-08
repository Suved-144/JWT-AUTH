const router = require('express').Router();
const User = require('../model/User')
const bcrypt = require('bcryptjs')
//validation
const jwt = require('jsonwebtoken')
const Joi = require('@hapi/joi');
const { invalid } = require('@hapi/joi');
const schema = Joi.object({
    name:Joi.string().min(3).required(),

    email:Joi.string().min(5).required().email(),

    password:Joi.string().min(3).required()
});
const loschema = Joi.object({
    

    email:Joi.string().min(5).required().email(),

    password:Joi.string().min(3).required()
});


router.post('/register', async(req,res)=>{
    const {error}=schema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    //cheking if the user is already in the database
    const emailexist =await User.findOne({email:req.body.email});
    if(emailexist) return res.status(400).send({message: "Email is already register"})
    //Hash password
    const salt  = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password,salt)

    const nuser = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashPassword
    });
    try{
    
        const savedUser = await nuser.save()
        res.send({user  : nuser._id}).status(201);
    }
    catch(err){
        console.log(err)
        res.status(400).send(err);
    }
})
router.post('/login',async(req,res)=>{
    //login validation form the user
    const {error}=loschema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    //cheking here the user is registed or not 
    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send({message:"email is not found"})
    //password is correct
    const validpass = await bcrypt.compare(req.body.password,user.password)
    if(!validpass) return res.status(200).send({message : "invalid pass"})
    // create and assigned a token
    const token = jwt.sign({_id:user._id},process.env.token);
    res.header('auth-token',token).send(token) 

    res.send("Success..")
})
module.exports = router
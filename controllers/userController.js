const asyncHandler= require("express-async-handler");
const User= require("../models/userModel");
const bcrypt= require("bcrypt");
const jwt=require("jsonwebtoken");
//Register a user
//@route POST /api/user/register

const registerUser = asyncHandler(async (req,res)=>{
    const { username,email,password } = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandetory !");
    }
    const userAvialable=await User.findOne({email})
    if(userAvialable){
        res.status(400);
        throw new Error("User Email id is already registered !");
    }

    const hashedPassword= await bcrypt.hash(password, 10);
    console.log("Hashed Password:", hashedPassword);
    
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    console.log(`User registered Successfully ${user}`);
    if(user){
        res.status(201).json({__id:user.id, email: user.email});
    } else{
        res.status(400);
        throw new Error("User data is not valid !");
    }
    // res.json({message: "Register the user"})
});

//Login a user
//@route POST /api/user/login

const loginUser = asyncHandler(async (req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandetory !");
    }

    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m"}
    )
        res.status(200).json({accessToken});
    }else{
        res.status(401);
        throw new Error("email or password not valid !");
    }
    // res.json({message: "Login user"})
});

//Info of a user
//@route POST /api/user/current
//Private

const currentUser = asyncHandler(async (req,res)=>{
    res.json(req.user);
});

module.exports={registerUser,loginUser,currentUser};
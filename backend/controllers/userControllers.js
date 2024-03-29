const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require ('../models/userModel')
 /// @description   Register a new user
 /// @route       /api/users
 ///@access       public


//Controllers

 const registerUser =  asyncHandler (async(req, res) => {

   console.log("[USER][REGISTER] Invoke controller")
  const {name, email , password} = req.body

  //Validation
  if(!name || !email || !password){
   res.status(400)
   throw new Error('please include all fields')
  }
  // find if usert already exists

  const userExists = await User.findOne({email})
  
  if (userExists){
   res.status(400)
   throw new Error('user already exists')
  }

  // hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password,salt)


  // create user
const user = await User.create({
   name, 
   email,
   password: hashedPassword
})

   if (user){
      res.status(201).json({
         _id: user._id,
         name: user.name,
         email: user.email,
         token: generateToken(user._id)
      })
   } else{
      res.status(400)
      throw new Error ('invalid user data')

   }

   
 })

  /// @description   login a  user
 /// @route       /api/users/login
 ///@access       public

 //User Login Controller
 const loginUser = asyncHandler (async (req, res) => {

    const {email, password}= req.body
    const user = await User.findOne({email})

    // check user and if password match
    if (user&&(await bcrypt.compare(password, user.password))){
      res.status(200).json ({
         _id: user._id,
         name: user.name,
         email: user.email,
         token: generateToken(user._id),
      })
    } else {
      res.status (401)
      throw new Error ('Invalid credentials');
    }
 })

 //  des- get currente user  
 //route- /me 
 //access- private

const getMe = asyncHandler(async (req, res) =>{
   const user = {
      id: req.user._id,
      email: req.user.email,
      name: req.user.name,
   }
   res.status(200).json(user)


})
 // generate toke
 const generateToken = (id) => {
   return jwt.sign({id}, process.env.JWT_SECRET, {
      expiresIn:'30d'
   })

 }

 module.exports = {
    registerUser,
    loginUser,
    getMe,
 }
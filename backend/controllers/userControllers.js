const asyncHandle = require('express-async-handler')
 /// @description   Register a new user
 /// @route       /api/users
 ///@access       public

 const registerUser =  asyncHandle (async(req, res) => {
  const {name, email , password} = req.body

  //Validation

  if(!name || !email || !password){
   res.status(400)
   throw new Error('please include all fields')
  }
    res.send('Register Route')
 })

  /// @description   login a  user
 /// @route       /api/users/login
 ///@access       public

 const loginUser = asyncHandle (async (req, res) => {
    res.send('login Route')
 })

 module.exports = {
    registerUser,
    loginUser
 }
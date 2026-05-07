const User = require('../models/User')
const jwt = require('jsonwebtoken')
// @desc Register a new user
// @route POST /api/users/register
// @access Public
const registerUser = async (req,res) =>{
    try{
        const {name, email,password} = req.body
    //validation:
    if (!name || !email || !password) {
      return res.status(400).json({ 
        message: 'All fields are required' 
    })
    }
    //check if user exists:
    const userExists = await User.findOne({email})
    if(userExists){
        return res.status(400).json({
            message: 'User already exists'
        })
    }
    //create user:
    const user = await User.create({
        name,
        email,
        password
    })
    //send response
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email
    })
}
catch(error){
    res.status(500).json({
        message: error.message
    })
}
}

//jwt generate:
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

// @desc Login user
// @route POST /api/users/login
// @access Public
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body

        //valid:
        if (!email || !password) {
            return res.status(400).json({
                message: 'All fields are required'
            })
        }
        //check if user exists:
        const user = await User.findOne({email})

        //check password:
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            })
        }
        else {
            res.status(401).json({
                message: 'Invalid credentials'
            })
        }
        }
        catch(error) {
            res.status(500).json({
                message: error.message
            })
        }
    }

module.exports = {registerUser, loginUser}



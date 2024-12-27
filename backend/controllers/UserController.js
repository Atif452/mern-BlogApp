import  jwt  from 'jsonwebtoken';
import User from '../models/UserModel.js';
import bcrypt from 'bcrypt'



export const registerUser = async (req, res) => {

    
const {name, email, password} = req.body;
    try {

        const existUser = await User.findOne({email});

        if(existUser){
            return res.json({success:false,
                message: 'User already exists'
            });
        }

        const newUser = await User.create({
            name,
            email,
            password
        });

        res.json({
            success: true,
            message: 'User created',
            user: newUser
        })
        
    } catch (error) {
        res.status(500).json({message: 'Server Error'});
    }


}


export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        
        const user = await User.findOne({email})
        if(!user) {
            return res.json({success: false, message: 'User not found'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch) {
            return res.json({success: false, message: 'Incorrect password'});
        }

        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET,{expiresIn:"3d"})
        res.json({token: token,
            success: true,
        })
        

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


export const getUser = async (req, res) =>{
    const id = req.params.id
    try {
        const user = await User.findById(id)
        console.log(user)
        res.json({
            success: true,
           
            user
        })
    } catch (error) {
        res.json({error:error});
    }
}



import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generattoken } from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password} = req.body;
        if(!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ message: "User registered successfully" });  
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const loginUser = async (req, res) => { 
    
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // Generate JWT
      generattoken(res, user, `welcome back to your app ${user.name}!!!`);
      const LoginUser = await user.save();

    } catch (error) {
        res.status(500).json({ message: error.message });
    }}


    // Get User Profile
    export const getUserProfile = async (req, res) => {
        try {
          const userId = req.params.id; // Get user ID from URL params
          const user = await User.findById(userId).select("-password"); // Exclude password
      
          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
      
          res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role, // Include role if needed
            createdAt: user.createdAt,
          });
        } catch (error) {
          console.error("Error fetching user profile:", error);
          res.status(500).json({ message: "Error fetching user data" });
        }
      };
      
   
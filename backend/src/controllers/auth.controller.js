import { generateToken } from '../lib/utils.js';
import User from '../models/user.model.js';
import bcrypt from "bcryptjs"
import cloudinary from '../lib/cloudinary.js';

// Handles user registration (signup)
export const signup = async (req, res) => {
    const { fullName, email, password } = req.body
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const user = await User.findOne({ email });

        if (user) return res.status(400).json({ message: "Email already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Generate username from fullName by converting to lowercase, replacing spaces with dots, and removing special characters
        let username = fullName.toLowerCase().replace(/\s+/g, '.').replace(/[^a-z0-9.]/g, '');

        // Check if username already exists, if so append a number
        let isUsernameTaken = await User.findOne({ username });
        let counter = 1;
        let originalUsername = username;
        while (isUsernameTaken) {
            username = `${originalUsername}${counter}`;
            isUsernameTaken = await User.findOne({ username });
            counter++;
        }

        const newUser = new User({
            fullName,
            email,
            username,
            password: hashedPassword
        });

        // generate jwt token here
        generateToken(newUser._id, res);
        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic,
        });


    } catch (error) {
        console.error("Error in signup controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Handles user login
export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        })
    } catch (error) {
        console.error("Error in login controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// Handles user logout
export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error in logout controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Handles updating user profile picture
export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;

        if (!profilePic) {
            return res.status(400).json({ message: "Profile pic is required" });
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: uploadResponse.secure_url },
            { new: true }
        )
        res.status(200).json(updatedUser)

    } catch (error) {
        console.error("error in update profile", error)
        res.status(500).json({ message: "Internal server error" });
    }
}

// Handles checking user authentication status
export const checkAuth = (req, res) => {
    try {
        res.status(200).json(
            req.user
        );
    } catch (error) {
        console.error("Error in checkAuth controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}
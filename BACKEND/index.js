
const User = require('../db/db.js');
const cors = require('cors');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './../.env' });  

console.log('Loaded Environment Variables:', process.env);
app.use(express.json());

//Connect db
mongoose.connect(process.env.DATABASE_URL);

app.use(cors());

app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            res.send('User already exists');
            return;
        }   

        const user = new User({
            email,
            password
        });

        await user.save();
        res.status(200).json({id: user._id, 
            message: 'User created successfully'
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const existingUser = await User.findOne({ email , password});
        if(existingUser) {
            res.status(200).json({id: existingUser._id, 
                message: 'successfully'
            });
            return;
        }   
        res.status(404).json({ 
            message: 'Unsuccessfully'
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

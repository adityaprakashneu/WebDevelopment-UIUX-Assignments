const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/webd', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.json());


app.post('/user/create', async (req, res) => {
    try {
        if (!req.body.fullName || !req.body.email || !req.body.password) {
            throw new Error('Full name, email, and password are required');
        }

        if (!/^[a-zA-Z\s]+$/.test(req.body.fullName)) {
            throw new Error('Invalid full name format');
        }

        if (!/\S+@\S+\.\S+/.test(req.body.email)) {
            throw new Error('Invalid email format');
        }

        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(req.body.password)) {
            throw new Error('Password must be at least 8 characters long and contain at least one upper case letter and one number');
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = new User({
            fullName: req.body.fullName,
            email: req.body.email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


app.put('/user/edit', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            throw new Error('User not found');
        }

        if (req.body.fullName) {
            user.fullName = req.body.fullName;
        }

        if (req.body.password) {
            if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(req.body.password)) {
                user.password = await bcrypt.hash(req.body.password, 10);
            } else {
                throw new Error('Invalid password format (Must be more 6 characters)');
            }
        }

        await user.save();
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/user/delete', async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ email: req.body.email });
        if (!user) {
            throw new Error('User not found');
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.get('/user/getAll', async (req, res) => {
    try {
        const users = await User.find({}, 'fullName email password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

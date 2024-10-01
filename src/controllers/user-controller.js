import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user-model.js';

export const signup = async (req, res) => {
    const { email, password, nickname } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, nickname: nickname || email });
    await user.save();
    res.status(201).json({ message: 'User created' });
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};
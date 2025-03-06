import jwt from 'jsonwebtoken'; 

export const generattoken = (user, res , message) => { 
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token });
        res.status(200)
        .cookie('token',token, { httpOnly: true, sameSite:'strict', maxAge:24*60*60*1000 })
        .json({
            success: true,
            message,
            user: user
        })
    }
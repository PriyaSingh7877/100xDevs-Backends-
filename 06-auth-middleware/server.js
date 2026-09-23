// .env file ki values load karo
// process.env.PORT etc. use kar sako
require('dotenv').config();
const protect = require('./auth')
const express = require('express');
const mongoose = require('mongoose');
// password hash krne ke liye
const bcrypt = require('bcrypt');
// token banana aur verify karne ke liye
const jwt = require('jsonwebtoken');
const User = require('./models/User');

const app = express();
app.use(express.json());

// DB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Database connected!'))
  .catch((err) => console.log('Error:', err));

  // REGISTER API 
  app.post('/register', async(req, res) =>{
   try{
    const{ name, email, password } = req.body;
    
    // 1. Check karo - email phle se hai?
    const existingUser = await User.findOne({ email });
    if (existingUser){
      return res.status(400).json({message: 'Email already registered'});
    }

    // 2.Password hash karo
    // 10 = kitna strong hash — zyada = slow but secure
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. User save karo
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({message: 'User resister ho gya!'});
   
  }catch(err) {
    res.status(500).json({error: err.message});
  }

  });

app.post('/login', async (req,res) =>{
  try{
    const{ email, password } = req.body;

    //1. User dhundho
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User nahi mila'});
    }
    //2.Password check karo
    const isMatch = await bcrypt.compare(password , user.password);
    if(!isMatch) {
   return res.status(401).json({message: 'Wrong password!'});
    }

   

    // 3. JWT Token banao
    const token = jwt.sign(
      {
        userId: user._id }, // token mein kya save karo
        process.env.JWT_SECRET, // secret key se sign karo  
      {expiresIn: '7d'} // 7 din baad expire
    );

    res.json({  // frontend ko bhejo
      message:'Login successful!',
      token: token
    });
  } catch (err) {
    res.status(500).json({ error: err.message})
  }
});

// PROTECTED ROUTE — Profile
app.get('/profile', protect, async (req, res) => {
  try {
    // req.user mein userId hai — middleware ne daala tha
    const user = await User.findById(req.user.userId);
    
    res.json({
      name: user.name,
      email: user.email
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DASHBOARD 
app.get('/dashboard', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    res.json({ message: `Welcome ${user.name}!` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Server start
app.listen(process.env.PORT, () => {
  console.log(`Server port ${process.env.PORT} pe chal raha hai!`);
});
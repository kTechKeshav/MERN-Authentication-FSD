import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/usermodel.js';
import transporter from '../config/nodemailer.js';

export const register = async (req, res)=>{
      const {name, email, password} = req.body;
      if(!name || !email || !password)
            return res.json({success: false, msg: 'Missing Details'});

      try{
            const existingUser = await userModel.findOne({email});
            
            if(existingUser){
                  return res.json({success: false, msg: 'User already exists'});
            }
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = new userModel({
                  name, 
                  email,
                  password: hashedPassword
            });

            await user.save();

            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

            res.cookie('token', token, {
                  httpOnly: true,
                  secure: process.env.NODE_ENV === 'production',
                  sameSite: process.env.NODE_ENV === 'production'? 'none' : 'strict',
                  maxAge: 7 * 24 * 60 * 60 * 1000
            })

            // ! Sending Welcome Email.
            const mailOptions = {
                  from: process.env.SENDER_EMAIL,
                  to: email,
                  subject: 'Welcome to App',
                  text: `Your account has been created with email id: ${email}`
            }

            await transporter.sendMail(mailOptions);

            return res.json({success: true});
      }catch (error){
            res.json({success: false, msg: error.message+"dkkdkd"});
      }
}



export const login = async (req, res)=>{
      const {email, password} = req.body;

      if(!email || !password)
            return res.json({success: false, msg: 'Email and Password are required'});

      try{
            const user = await userModel.findOne({email});
            if(!user){
                  return res.json({success: false, msg: 'Invalid Email'});
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch){
                  return res.json({success: false, msg: 'Invalid Password'});
            }

            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

            res.cookie('token', token, {
                  httpOnly: true,
                  secure: process.env.NODE_ENV === 'production',
                  sameSite: process.env.NODE_ENV === 'production'? 'none' : 'strict',
                  maxAge: 7 * 24 * 60 * 60 * 1000
            });

            return res.json({success: true});

      }catch (error){
            return res.json({success: false, msg: error.message});
      }
}

export const logout = async (req, res)=>{
      try{
            res.clearCookie('token', {
                  httpOnly: true,
                  secure: process.env.NODE_ENV === 'production',
                  sameSite: process.env.NODE_ENV === 'production'? 'none' : 'strict'
            })

            return res.json({success: true, msg: "Logged out"})
      }catch (error){
            return res.json({ success: false, msg: error.message });
      }
}

// ! Send verification OTP to the User's Email.
export const sendVerifyOtp = async (req, res)=>{
      try{
            const {userId} = req.body;
            const user = await userModel.findById(userId);

            if(user.isAccountVerified){
                  return res.json({success: false, message: "Account already verified"})
            }

            const otp = String(Math.floor(100000+Math.random()*900000));
            user.verifyOtp = otp;
            user.verifyOtpExpireAt = Date.now() + 24*60*60*1000

            await user.save();

            // ! Sending OTP in Email.
            const mailOptions = {
                  from: process.env.SENDER_EMAIL,
                  to: user.email,
                  subject: 'Account verification OTP',
                  text: `Your OTP is ${otp}. Verify your account using this OTP.`
            }

            await transporter.sendMail(mailOptions);

            res.json({success: true, message: 'Verification OTP send on email'})

      }catch(error){
            return res.json({ success: false, msg: error.message });
      }
}

// ! Verify the email using OTP.
export const verifyEmail = async (req, res)=>{
      const {userId, otp} = req.body;

      if(!userId || !otp){
            return res.json({success: false, msg: 'Missing details'});
      }

      try{
            const user = await userModel.findById(userId);
            if(!userId){
                  return res.json({success: false, msg: 'User not found'});
            }

            if(user.verifyOtp === '' || user.verifyOtp !== otp){
                  return res.json({success: false, msg: 'Invalid Otp'});
            }

            if(user.verifyOtpExpireAt < Date.now()){
                  return res.json({success: false, msg: 'OTP expired'});
            }

            user.isAccountVerified = true
            user.verifyOtp=''
            user.verifyOtpExpireAt=0

            await user.save();

            return res.json({success: true, msg: 'Email verified successfully'});
      }catch(error){
            return res.json({success: false, msg: error.message});
      }
}

// ! Checking the user authentication using middleware userAuth.
export const isAuthenticated = async (req, res)=>{
      try{
            return res.json({success: true})
      }catch(error){
            return res.json({success: false, msg: error.message});
      }
}

// ! Send password reset OTP.
export const sendResetOtp = async (req, res)=>{
      const {email} = req.body;

      if(!email){
            return res.json({success: false, msg: "Email is required"});
      }

      try{
            const user = await userModel.findOne({email}); 
            if(!user){
                  return res.json({success: false, msg: "User not found"});
            }

            const otp = String(Math.floor(100000+Math.random()*900000));
            user.resetOtp = otp;
            user.resetOtpExpireAt = Date.now() + 15*60*1000

            await user.save();

            // ! Sending OTP in Email.
            const mailOptions = {
                  from: process.env.SENDER_EMAIL,
                  to: user.email,
                  subject: 'Password reset OTP',
                  text: `Your OTP is ${otp}. Enter the otp to reset your password.`
            }

            await transporter.sendMail(mailOptions);

            res.json({success: true, message: 'Password reset OTP send on email'})
            
      }catch(error){
            return res.json({success: false, msg: error.message});
      }
}

// ! Reset User Password.
export const resetPassword = async (req, res)=>{
      const {email, otp, newPassword} = req.body;

      if(!email || !otp || !newPassword){
            return res.json({success: false, msg: "Email otp and new password are required"});
      }

      try{
            const user = await userModel.findOne({email});
            if(!user){
                  return res.json({success: false, msg: "User not found"});
            }

            if(user.resetOtp === '' || user.resetOtp !== otp){
                  return res.json({success: false, msg: "Invalid Otp"});
            }

            if(user.resetOtpExpireAt < Date.now()){
                  return res.json({success: false, msg: "OTP expired"});
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);

            user.password = hashedPassword;
            user.resetOtp = '';
            user.resetOtpExpireAt = 0;

            await user.save();

            // ! Sending OTP in Email.
            const mailOptions = {
                  from: process.env.SENDER_EMAIL,
                  to: user.email,
                  subject: 'Reset succesfully',
                  text: `Congratulation your password reset successfully`
            }

            await transporter.sendMail(mailOptions);

            return res.json({success: true, msg: "Password has been reset successfully"});
      }catch(error){
            return res.json({success: false, msg: error.message});
      }
}
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets.js";

const PasswordReset = () => {
  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
    otp: '',
  });

  const { backendURL } = useContext(AppContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSendOtp = async () => {
    try {
      if (!formData.email) {
        toast.error('Please enter your email address.');
        return;
      }
      const response = await axios.post(
        backendURL + `/api/auth/send-reset-otp`,
        { email: formData.email }
      );
      toast.success(response.data.message || 'OTP sent successfully!');
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      toast.error('Failed to send OTP. Please try again.');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        backendURL + `/api/auth/reset-password`,
        {
          email: formData.email,
          otp: formData.otp,
          newPassword: formData.newPassword,
        }
      );
      if (response.data.success) {
        toast.success('Password reset successfully!');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        toast.error('Password reset failed. Invalid OTP.');
        navigate('/passwordReset');
      }
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      toast.error('Failed to reset password. Please try again.');
      navigate('/passwordReset');
    } finally {
      setFormData({ email: '', newPassword: '', otp: '' });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt=""
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          Reset Password
        </h2>
        <p className="text-center text-sm mb-6">
          Enter your email to receive OTP and reset your password
        </p>
        <form onSubmit={handleResetPassword}>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} alt="" />
            <input
              onChange={handleChange}
              value={formData.email}
              name="email"
              className="bg-transparent outline-none"
              type="email"
              placeholder="Email id"
              required
            />
          </div>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.lock_icon} alt="" />
            <input
              onChange={handleChange}
              value={formData.newPassword}
              name="newPassword"
              className="bg-transparent outline-none"
              type="password"
              placeholder="New Password"
              required
            />
          </div>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.lock_icon} alt="" />
            <input
              onChange={handleChange}
              value={formData.otp}
              name="otp"
              className="bg-transparent outline-none"
              type="text"
              placeholder="OTP"
              required
            />
          </div>
          <div className="flex justify-between mb-4">
            <button
              type="button"
              onClick={handleSendOtp}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium"
            >
              Send OTP
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-green-900 text-white font-medium"
            >
              Reset Password
            </button>
          </div>
        </form>
        <p className="text-gray-400 text-center text-xs mt-4">
          Remembered your password?{' '}
          <span
            onClick={() => navigate('/login')}
            className="text-blue-400 cursor-pointer underline"
          >
            Login
          </span>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PasswordReset;

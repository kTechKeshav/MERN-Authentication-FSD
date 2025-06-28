# MERN Authentication Full Stack Demo

A full-stack authentication system built with the MERN stack (MongoDB, Express.js, React, Node.js). This project demonstrates secure user registration, login, and protected routes using JWT-based authentication.

### 🚀 Live Project

🌐 Frontend: [mern-authentication-fsd.vercel.app](https://mern-authentication-fsd.vercel.app)  
🔗 Backend API: [mern-authentication-fsd.onrender.com](https://mern-authentication-fsd.onrender.com)  
📂 GitHub Repository: [github.com/kTechKeshav/MERN-Authentication-FSD](https://github.com/kTechKeshav/MERN-Authentication-FSD)

## ✨ Features

- 🔒 JWT-based User Authentication
- ✅ Email Verification with OTP
- 🔁 Password Reset via Email
- 🍪 Secure HTTP-only Cookie Handling
- 📩 Email Sending with Nodemailer
- 📦 Modular Code Structure (MVC)
- 🧾 Protected Routes
- 🔥 Toast Notifications with `react-toastify`
- 🎨 Fully responsive and clean UI

## 🧰 Technologies Used

- **Frontend:**
  `React.js`
  `Tailwind CSS`
  `Vite`
  `Axios`
  `React Router DOM`

- **Backend:**
  `Node.js`
  `Express.js`
  `MongoDB + Mongoose`
  `Nodemailer`
  `JSON Web Tokens (JWT)`
  `bcrypt`
  `CORS`
  `cookie-parser`
## 🔧 Installation and Setup

1. **Clone the repository:**

```bash
git clone https://github.com/kTechKeshav/MERN-Authentication-FSD.git
```

2. **Install Backend Dependencies:**
```bash
cd server
npm install
```
3. **Install Frontend Dependencies:**
```bash
cd ../client
npm install
```
4. **Setup Environment Variables (.env)**
- Backend (/server/.env)
```bash
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
SENDER_EMAIL=your_email@gmail.com
SENDER_PASSWORD=your_app_password
NODE_ENV=production
```
- Frontend (/client/.env)
```bash
VITE_BACKEND_URL=https://mern-authentication-fsd.onrender.com
```

## 🔧 Running the app locally 
- Start Backend
```bash
cd server
npm run server
```

- Start Frontend
```bash
cd client
npm run dev
```


## 📸 Screenshots

### Landing Page
![Landing](images\landing.png) 

### Login Page
![Login](images\login.png)

### Registration Page
![Register](images\registration.png) 

## 🌍 Deployment

### 🔵 Frontend: Vercel
- Build Command: vite build
- Output Directory: dist

### 🔴 Backend: Render
- Add environment variables
- Start command: node server.js



# Made with ❣️
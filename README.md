# User Story Manager 📖  
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)  
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://react.dev)  
[![Node.js](https://img.shields.io/badge/Node.js-18.16.0-green)](https://nodejs.org)  
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0.0-brightgreen)](https://mongodb.com)  

---

## 🚀 Project Overview  
A **Full-Stack MERN Application** for agile teams to create, manage, and track user stories. Built to showcase expertise in both frontend and backend development, with a focus on clean architecture, security, and modern tooling.  

**Why this project?**  
- Demonstrates **full-stack proficiency** (React frontend + Node.js/Express backend).  
- Implements **JWT authentication** and **Redux state management**.  
- Highlights **responsive UI design** and **RESTful API integration**.  

---

## ✨ Key Features  
| Feature                | Tech Used              | Impact                          |  
|------------------------|------------------------|---------------------------------|  
| **JWT Authentication** | Node.js, Express, JWT  | Secure user sessions            |  
| **CRUD Operations**    | React, Redux, MongoDB  | Full user story lifecycle       |  
| **Responsive UI**      | Material-UI, CSS Grid  | Mobile/desktop compatibility    |  
| **Real-Time Sync**     | Axios, REST API        | Seamless frontend-backend integration |  

---

## 🛠️ Tech Stack  
**Frontend**  
- **Framework**: React 18  
- **State Management**: Redux Toolkit  
- **Styling**: Material-UI, CSS Modules  
- **API Client**: Axios  

**Backend**  
- **Runtime**: Node.js  
- **Framework**: Express.js  
- **Authentication**: JWT, Bcrypt  
- **Database**: MongoDB, Mongoose  

**Tools**  
- **Version Control**: Git  
- **Testing**: Postman (API), React DevTools  
- **Code Quality**: ESLint, Prettier  

---

## 📂 Project Structure  
```plaintext
/userStory  
├── client/              # React Frontend  
│   ├── src/  
│   │   ├── components/  # Reusable UI  
│   │   ├── features/    # Redux slices  
│   │   ├── api/         # Axios config  
│   │   └── App.js       # Main component  
├── server/              # Node.js Backend  
│   ├── controllers/     # API logic  
│   ├── models/          # MongoDB schemas  
│   └── routes/          # REST endpoints  
```
---

## 📥 Installation  
1. **Clone the repository**:  
   ```bash  
   git clone https://github.com/ali-roshanbin/userStory.git  
   cd userStory  
   ```  

2. **Install dependencies**:  
   ```bash  
   # Frontend  
   cd client && npm install  
   # Backend  
   cd ../server && npm install  
   ```  

3. **Set up environment variables**:  
   - Create `.env` in `/server`:  
     ```env  
     MONGO_URI=your_mongodb_uri  
     JWT_SECRET=your_jwt_secret  
     PORT=5000  
     ```  

4. **Run the application**:  
   ```bash  
   # Start backend  
   cd server && npm start  
   # Start frontend  
   cd ../client && npm start  
   ```  

---

## 🚀 API Endpoints  
| Method | Endpoint          | Description                  |  
|--------|-------------------|------------------------------|  
| POST   | `/api/auth/register` | Register a new user        |  
| POST   | `/api/auth/login`    | User login                 |  
| GET    | `/api/stories`       | Fetch all user stories     |  
| POST   | `/api/stories`       | Create a new story         |  

---

## 💻 Code Highlights  
### **Backend: Secure Authentication**  
```javascript  
// server/controllers/authController.js  
exports.login = async (req, res) => {  
  const { email, password } = req.body;  
  const user = await User.findOne({ email });  
  if (!user) throw new Error("User not found");  

  const isValidPassword = await bcrypt.compare(password, user.password);  
  if (!isValidPassword) throw new Error("Invalid credentials");  

  const token = generateToken(user._id);  
  res.status(200).json({ token });  
};  
```  

### **Backend: Database Schema**  
```javascript  
// server/models/Story.js  
const storySchema = new mongoose.Schema({  
  title: { type: String, required: true },  
  description: { type: String, required: true },  
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  
}, { timestamps: true });  
```  

### **Frontend: Redux State Management**  
```javascript  
// client/src/features/stories/storySlice.js  
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";  
import axios from "../api/axios";  

export const fetchStories = createAsyncThunk("stories/fetch", async () => {  
  const response = await axios.get("/stories");  
  return response.data;  
});  

const storySlice = createSlice({  
  name: "stories",  
  initialState: [],  
  reducers: {  
    addStory: (state, action) => {  
      state.push(action.payload);  
    },  
  },  
  extraReducers: (builder) => {  
    builder.addCase(fetchStories.fulfilled, (state, action) => {  
      return action.payload;  
    });  
  },  
});  

export default storySlice.reducer;  
```  

### **Frontend: Protected Routes**  
```javascript  
// client/src/components/PrivateRoute.js  
import { useSelector } from "react-redux";  
import { Navigate } from "react-router-dom";  

const PrivateRoute = ({ children }) => {  
  const { user } = useSelector((state) => state.auth);  
  return user ? children : <Navigate to="/login" />;  
};  
```  

### **UI: Responsive Story List**  
```javascript  
// client/src/components/StoryList.js  
import { Card, CardContent, Typography } from "@mui/material";  

const StoryList = ({ stories }) => {  
  return (  
    <div className="story-grid">  
      {stories.map((story) => (  
        <Card key={story._id}>  
          <CardContent>  
            <Typography variant="h6">{story.title}</Typography>  
            <Typography>{story.description}</Typography>  
          </CardContent>  
        </Card>  
      ))}  
    </div>  
  );  
};  
```  

---

## 🔒 Security Practices  
- **Frontend**:  
  - Protected routes with Redux state checks.  
  - Token stored in HTTP-only cookies.  
  - Sanitized user inputs to prevent injections.  
- **Backend**:  
  - Bcrypt password hashing.  
  - JWT signature validation.  

---

## 🚀 Deployment Ready  
- **Docker Support**: Add Dockerfiles for containerization.  
- **CI/CD**: Integrate GitHub Actions for automated testing.  

---

## 📬 Contact  
Actively seeking **Remote Opportunities** or roles with **Visa Sponsorship**:  
- 📧 Email: [ali.roshanbin@gmail.com](mailto:ali.roshanbin@gmail.com)  
- 💼 LinkedIn: [linkedin.com/in/roshanbin](https://linkedin.com/in/roshanbin)  
- 🌐 GitLab Portfolio: [gitlab.com/ali.roshanbin](https://gitlab.com/ali.roshanbin)  
- 🌐 GitHub Portfolio: [github.com/ali-roshanbin](https://github.com/ali-roshanbin)  

---

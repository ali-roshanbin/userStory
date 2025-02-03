

```markdown
# User Story Manager 📖  
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)  
[![Node.js](https://img.shields.io/badge/Node.js-18.16.0-green)](https://nodejs.org)  
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0.0-brightgreen)](https://mongodb.com)  

---

## 🚀 Project Overview  
A **full-stack application** for creating, managing, and tracking user stories. Built to demonstrate proficiency in backend development, API design, and database integration.  

**Key Strengths**:  
- Modern RESTful API architecture.  
- Secure authentication and authorization flow.  
- Clean, modular code adhering to best practices.  

---

## ✨ Key Features  
| Feature                | Tech Used              | Impact                          |  
|------------------------|------------------------|---------------------------------|  
| **JWT Authentication** | Node.js, Express, JWT  | Secure user sessions            |  
| **CRUD Operations**    | MongoDB, Mongoose      | Full user story lifecycle       |  
| **API Design**         | Express.js, REST       | Scalable backend structure      |  
| **Error Handling**     | Custom middleware      | Robust error logging & responses|  

---

## 🛠️ Tech Stack  
**Backend**  
- **Runtime**: Node.js  
- **Framework**: Express.js  
- **Authentication**: JWT, Bcrypt  
- **Database**: MongoDB, Mongoose  

**Tools**  
- **Version Control**: Git  
- **API Testing**: Postman/Insomnia  
- **Code Quality**: ESLint, Prettier  

---

## 📂 Project Structure  
```plaintext
/userStory  
├── server/  
│   ├── config/        # Database & environment setup  
│   ├── controllers/   # API logic (auth, stories)  
│   ├── models/        # MongoDB schemas  
│   ├── routes/        # API endpoints  
│   ├── middleware/    # Authentication & error handlers  
│   └── server.js      # Entry point  
```

---

## 📥 Installation  
1. **Clone the repository**:  
   ```bash  
   git clone https://github.com/ali-roshanbin/userStory.git  
   cd userStory/server  
   ```  

2. **Install dependencies**:  
   ```bash  
   npm install  
   ```  

3. **Set up environment variables**:  
   Create `.env` in `/server`:  
   ```env  
   MONGO_URI=your_mongodb_uri  
   JWT_SECRET=your_jwt_secret  
   PORT=5000  
   ```  

4. **Run the server**:  
   ```bash  
   npm start  
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
### **Secure Authentication**  
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

### **Database Schema**  
```javascript  
// server/models/Story.js  
const storySchema = new mongoose.Schema({  
  title: { type: String, required: true },  
  description: { type: String, required: true },  
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  
}, { timestamps: true });  
```  

---

## 🔒 Security Practices  
- **Password Hashing**: Bcrypt for secure password storage.  
- **JWT Tokens**: Stateless authentication with HTTP-only cookies.  
- **Input Validation**: Sanitized user inputs to prevent injections.  

---

## 📬 Contact  
Actively seeking **remote opportunities** or roles with **visa sponsorship**:  
- 📧 Email: [ali.roshanbin@gmail.com](mailto:ali.roshanbin@gmail.com)  
- 💼 LinkedIn: [linkedin.com/in/roshanbin](https://linkedin.com/in/roshanbin)  
- 🌐 Portfolio: *[Add your portfolio link here]*  

--- 
```  

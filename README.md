📄 README_BloodCampApp.md content:

markdown
Copy
Edit
# 🩸 Blood Donation Camp Finder

A full-stack web application built using the **MERN stack** to help users find and register for nearby blood donation camps.  
Admins can manage camp listings, and users can search, filter, and view upcoming events based on their location.

## 🌐 Live Links

- **Frontend (User App)**: [https://blood-donation-camp-kves.vercel.app](https://blood-donation-camp-kves.vercel.app)
- **Admin Panel**: [https://blood-admin.vercel.app](https://blood-admin.vercel.app)
- **Backend API**: [https://blood-donation-camp.onrender.com](https://blood-donation-camp.onrender.com)

---

## 🛠️ Tech Stack

### Frontend (User & Admin)
- **React.js**
- **Zustand** (State Management)
- **Axios** (API Calls)
- **Tailwind CSS** (Styling)
- **Vercel** (Hosting)

### Backend
- **Node.js & Express.js**
- **MongoDB & Mongoose**
- **dotenv** for environment variables
- **CORS**, **body-parser**
- **Render** (Backend hosting)

---

## 📂 Project Structure

blood-camps/
├── frontend/ # React App for Users
├── admin/ # React App for Admins
├── server/ # Node.js Backend
│ ├── routes/
│ ├── models/
│ ├── lib/
│ └── server.js

yaml
Copy
Edit

---

## ⚙️ Features

### 🔍 User App
- View all upcoming blood donation camps
- Search by keyword, address, or date
- View details for each camp
- Mobile-friendly UI

### 🛡️ Admin Panel
- Login authentication (if added)
- Create, update, delete camps
- Manage listings easily

### 📡 Backend
- RESTful API
- MongoDB data storage
- Search and filtering endpoints
- CORS configured for deployment

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js & npm
- MongoDB

### 1. Clone the Repository
```bash
git clone https://github.com/ANJALI-G1/blood-camps.git
cd blood-camps
2. Setup Backend
bash
Copy
Edit
cd server
npm install
# Create a .env file with Mongo URI and PORT
npm run dev
3. Setup Frontend & Admin
bash
Copy
Edit
cd ../frontend
npm install
npm start

cd ../admin
npm install
npm start
🌍 Deployment
Frontend & Admin
Hosted on Vercel

Easy Git integration

No .env file needed if API base URL is hardcoded

Backend
Hosted on Render

MongoDB Atlas used for persistent storage

CORS enabled for Vercel URLs




# 🎯 SST Lost & Found App

A modern web application for reporting and finding lost items with real-time chat functionality.

## 🚀 How to Use the App

### 👤 **For New Users**
1. **Register** - Create an account with your email and password
2. **Login** - Access your dashboard
3. **Add Phone** - Complete your profile with a phone number

### 📱 **Main Features**

#### 🔍 **Search for Items**
- Use the **Search Engine** on the landing page
- Search by item name, location, or description
- View all available lost and found items

#### 📝 **Report Lost/Found Items**
1. Click **"Report Lost Item"** or **"Report Found Item"**
2. Fill in the required details:
   - **Item Name** (required)
   - **Location** (required)
   - **Description** (optional)
   - **Date** (optional)
   - **Upload Image** (optional)
3. Submit to save your report

#### 💬 **Chat About Items**
1. Click the **Chat icon** in the navigation
2. Select any item from the list
3. Join the discussion about that item
4. Send messages in real-time
5. Messages are saved and visible to all users

#### 🎯 **Smart Matching**
- After reporting an item, the system shows potential matches
- View items with high similarity scores
- Contact item owners or start a chat

#### 👤 **Manage Your Items**
- View your **Lost Items**
- View your **Found Items** 
- Check your **Archive** (resolved items)
- Edit or update item status

### 🎨 **Navigation**
- **Home** - Main dashboard
- **Chat** - Item discussions
- **Profile** - Account settings
- **Logout** - Sign out

### 📊 **Dashboard Tabs**
- **Lost Items** - Items you've reported as lost
- **Found Items** - Items you've reported as found
- **Archive** - Items that have been resolved

## 🛠️ **For Developers**

### 📁 **Project Structure**
```
├── client/                 # Frontend React app
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── chat/       # Chat functionality
│   │   │   ├── dashboard/  # Dashboard components
│   │   │   ├── modals/     # Modal dialogs
│   │   │   ├── objects/    # Item display components
│   │   │   └── ui/         # UI components & animations
│   │   ├── pages/          # Main pages
│   │   ├── api/            # API calls
│   │   └── contexts/       # React contexts
│   └── package.json
├── server/                 # Backend Node.js app
│   ├── controllers/        # API controllers
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── config/            # Configuration files
│   └── package.json
└── README.md
```

### 🚀 **Quick Start**

1. **Clone the repository**
2. **Install dependencies**:
   ```bash
   # Backend
   cd server
   npm install
   
   # Frontend  
   cd ../client
   npm install
   ```

3. **Set up environment variables**:
   - Copy `.env.example` to `.env` in the server folder
   - Add your MongoDB connection string
   - Add JWT secret and other required variables

4. **Start the applications**:
   ```bash
   # Start backend (port 3000)
   cd server
   npm run dev
   
   # Start frontend (port 5173)
   cd client
   npm run dev
   ```

5. **Open your browser** and go to `http://localhost:5173`

### 🗄️ **Database Models**
- **User** - User accounts and profiles
- **Object** - Lost and found items
- **ItemMessage** - Chat messages for items
- **Chat** - User-to-user conversations

### 🔌 **API Endpoints**
- **Authentication**: `/api/auth/*`
- **Objects**: `/api/objects/*`
- **Images**: `/api/images/*`
- **Chat**: `/api/chat/*`
- **Item Chat**: `/api/item-chat/*`

### 🎨 **Technologies Used**
- **Frontend**: React, Tailwind CSS, Socket.IO
- **Backend**: Node.js, Express, Socket.IO
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT with Google OAuth
- **Image Storage**: Cloudinary
- **Real-time**: WebSocket connections

## 📞 **Support**
For issues or questions, please check the console logs or contact the development team.

---
*Built with ❤️ for the SST community*
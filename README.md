# 🎯 Lost & Found App

A simple web app to help you find lost items and return found items to their owners.

## 📱 How to Use the App

### **Step 1: Get Started**
1. **Visit the website** - You'll see the landing page
2. **Click "Get Started"** - Create your account
3. **Sign up with email** or **Google account**
4. **Add your phone number** when asked (required for contact)

### **Step 2: Search for Items**
- **Type what you're looking for** in the search box
- **Enter the location** where you lost/found it
- **Click "Search"** to see all matching items
- **Click ❌ to close** search results

### **Step 3: Report Lost/Found Items**
1. **Click "Report Lost Item"** or **"Report Found Item"**
2. **Fill the form:**
   - **Item Name** (required) - e.g., "iPhone", "Black Wallet"
   - **Location** (required) - where you lost/found it
   - **Description** (optional) - extra details
   - **Image** (optional) - drag & drop a photo
3. **Click "Submit"**

### **Step 4: View Matches**
- After submitting, you'll see **potential matches** (80%+ similarity)
- **Click "Contact Owner"** to get their contact info
- **Contact info is copied** to your clipboard automatically

### **Step 5: Manage Your Items**
- **Lost Items Tab** - See items you reported as lost
- **Found Items Tab** - See items you reported as found
- **Archive Tab** - See completed items
- **Search All Items** - Search everyone's items globally

## 🔐 Authentication Explained

### **Registration Options:**
1. **Manual Registration:**
   - Enter email and password
   - Confirm password
   - Click "Register"

2. **Google OAuth:**
   - Click "Sign in with Google"
   - Choose your Google account
   - **Phone number required** - Enter your mobile number
   - Phone number is used for contact when others find your items

### **Login:**
- Use your email/password or Google account
- You'll go to your personal dashboard

### **Why Phone Number?**
- When someone finds your lost item, they need to contact you
- Phone number ensures you can be reached
- Required for all accounts (Google or manual)

## 🎯 Key Features

### **Smart Matching:**
- Automatically finds similar items (80%+ match)
- Compares names, descriptions, and locations
- Shows match percentage for each result

### **Image Upload:**
- Drag & drop photos of your items
- JPEG images only (under 5MB)
- Automatic image optimization

### **Global Search:**
- Search ALL users' items, not just yours
- Find items from other people
- Contact owners directly

### **Contact System:**
- Click "Contact Owner" to get their info
- Contact details copied to clipboard
- No need to write down information

## 🚀 Quick Start Guide

1. **Create Account** → Sign up or use Google
2. **Add Phone Number** → Required for contact
3. **Search Items** → Look for your lost items
4. **Report Items** → Report lost/found items
5. **Check Matches** → See potential matches
6. **Contact Owners** → Get in touch with people

---

## 🛠️ For Developers

### **Tech Stack:**
- **Frontend:** React 19, Tailwind CSS, Vite
- **Backend:** Node.js, Express, MongoDB
- **Authentication:** JWT, Passport.js, Google OAuth
- **Images:** Cloudinary
- **Database:** MongoDB Atlas

### **Installation:**

1. **Clone repository**
2. **Install dependencies:**
   ```bash
   cd server && npm install
   cd ../client && npm install
   ```
3. **Set up environment variables** in `server/.env`
4. **Run the app:**
   ```bash
   # Terminal 1 - Backend
   cd server && npm run dev
   
   # Terminal 2 - Frontend  
   cd client && npm run dev
   ```
5. **Access:** Frontend (http://localhost:5173), Backend (http://localhost:3000)

### **Environment Variables:**
```env
PORT=3000
JWT_SECRET=your_jwt_secret
MONGO_URL=your_mongodb_connection
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

## 📄 License

ISC License

## 👨‍💻 Author

**Linga Seetha Rama Raghavendra**
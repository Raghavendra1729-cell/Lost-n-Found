# 🔍 Lost n Found

> **A modern web application for reporting, finding, and reuniting lost items with their owners through intelligent matching and real-time communication.**

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://lost-n-found-sandy.vercel.app/)
[![Backend API](https://img.shields.io/badge/API-online-blue)](https://lost-n-found-gfjm.onrender.com)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

## 📋 Table of Contents
- [About the Project](#about-the-project)
- [Problem We Solve](#problem-we-solve)
- [Tutorial - How to Use](#tutorial---how-to-use)
- [Features](#features)
- [Technical Stack](#technical-stack)
- [Project Structure](#project-structure)
- [Environment Setup](#environment-setup)
- [Installation & Running](#installation--running)
- [Deployment](#deployment)
- [Security Features](#security-features)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

---

## 🎯 About the Project

**Lost n Found** is a comprehensive web platform designed to bridge the gap between people who have lost items and those who have found them. The application provides a secure, user-friendly environment where users can:

- Report lost or found items with detailed descriptions and images
- Search through a database of lost/found items using intelligent filters
- Communicate directly with other users through real-time chat
- Track their reported items and manage their account
- Receive smart match suggestions based on item descriptions

### 🌐 Live Application
- **Frontend (Client):** [https://lost-n-found-sandy.vercel.app/](https://lost-n-found-sandy.vercel.app/)
- **Backend (API Server):** [https://lost-n-found-gfjm.onrender.com](https://lost-n-found-gfjm.onrender.com)

---

## 💡 Problem We Solve

Every day, countless items are lost and found in public spaces—schools, offices, parks, transport hubs. The traditional approach involves:
- Physical lost-and-found boxes that are hard to search
- No direct communication between finders and losers
- Limited visibility of found items
- Lack of verification and security

**Our Solution:**
- **Centralized Digital Platform:** All lost and found items in one searchable database
- **Real-time Communication:** Direct messaging between users to verify ownership
- **Image Verification:** Upload photos for better identification
- **Secure Authentication:** Google OAuth ensures accountability
- **Smart Matching:** Intelligent algorithms suggest potential matches
- **Archive & History:** Track resolved cases and maintain records

---

## 📖 Tutorial - How to Use



### Step 1: Landing Page - First Impressions

When you visit the application, you'll see a clean, modern interface with a powerful search engine at the center.


<img width="1710" height="963" alt="Screenshot 2025-10-20 at 3 26 19 PM" src="https://github.com/user-attachments/assets/b33451a7-9f4d-4dfe-a112-086dbea0af46" />

**What You Can Do:**
- Search for lost or found items without logging in
- View public listings of items
- Sign up or log in to access full features

---

### Step 2: Registration & Authentication

Click the **Login** or **Register** button in the top-right corner.

<img width="446" height="938" alt="Screenshot 2025-10-20 at 3 27 17 PM" src="https://github.com/user-attachments/assets/291be8f7-9e85-41f3-b083-4949d8581e96" />

**Authentication Options:**
- **Google OAuth:** Quick sign-in with your Google account (recommended)
- **Email Registration:** Create an account with email and password
<img width="443" height="648" alt="Screenshot 2025-10-20 at 3 28 06 PM" src="https://github.com/user-attachments/assets/f10713af-e62b-40b2-9342-23e015c6dfe4" />

![Google OAuth Flow](docs/images/03-google-oauth.png)
*Secure Google authentication flow*

**Security:** All sessions are protected with JWT tokens and secure cookies.

---

### Step 3: User Dashboard - Your Control Center

After logging in, you're taken to your personalized dashboard.


<img width="1710" height="948" alt="Screenshot 2025-10-20 at 3 28 53 PM" src="https://github.com/user-attachments/assets/c82f3a00-b241-4f6a-a1bc-bfcead1030fa" />

**Dashboard Features:**
- **Welcome Banner:** Personalized greeting with your name
- **Quick Stats:** See counts of your lost items, found items, and archived items
- **Search Bar:** Quick search across all items
- **Action Buttons:** 
  - 🔴 Report Lost Item
  - 🟢 Report Found Item
  - 🔵 Browse All Items
  - 💬 Messages & Chat

---

### Step 4: Reporting a Lost Item

Click the **"Report Lost Item"** button to open the reporting form.

<img width="892" height="846" alt="Screenshot 2025-10-20 at 3 29 36 PM" src="https://github.com/user-attachments/assets/940cd57a-09a8-4f9d-8715-4fd8464601bc" />

**Required Fields:**
- **Item Name:** (e.g., "iPhone 13", "Black Wallet", "Blue Backpack")
- **Location:** Where you lost it (e.g., "Library 2nd Floor", "Cafeteria", "Bus Stop A")

**Optional Fields:**
- **Description:** Detailed information about color, brand, unique features
- **Date Lost:** When you lost the item (date picker)
- **Item Image:** Upload a photo (JPEG/JPG only, max 5MB)
- **Contact Info:** Phone number or email for direct contact

**Tips for Better Matches:**
- Be specific with descriptions (e.g., "Black leather wallet with Nike logo")
- Include unique identifiers (scratches, stickers, serial numbers)
- Upload clear, well-lit photos

---

### Step 5: Reporting a Found Item

Click the **"Report Found Item"** button—the form is similar to the lost item form.


<img width="892" height="857" alt="Screenshot 2025-10-20 at 3 30 28 PM" src="https://github.com/user-attachments/assets/6cfc84f9-6998-4141-a3de-7f5af8032694" />

**Best Practices:**
- Describe the item accurately without revealing all details (for verification)
- Specify the exact location where you found it
- Upload photos to help legitimate owners identify their items

---

### Step 6: Browsing and Searching Items

Use the search interface to find items matching your criteria.

<img width="1111" height="154" alt="Screenshot 2025-10-20 at 3 30 58 PM" src="https://github.com/user-attachments/assets/8dcb66aa-05e9-40a5-8901-d5a82461441d" />


**Search Options:**
- **Item Name:** Free-text search (e.g., "phone", "keys", "wallet")
- **Location:** Filter by location
- **Category:** Select item type from dropdown
  - All Items
  - Electronics
  - Personal Items
  - Documents
  - Accessories
  - Others

**Search Results:**

<img width="1764" height="1358" alt="image" src="https://github.com/user-attachments/assets/18ae1c67-59da-4d11-a25e-a352b590cb0c" />

*Grid layout showing matching items with images and details*

Each result card shows:
- Item name and image
- Location and date
- Brief description
- Action buttons (View Details, Message Owner)

---

### Step 7: Viewing Item Details

Click on any item to see full details.
<img width="1095" height="344" alt="Screenshot 2025-10-20 at 3 39 50 PM" src="https://github.com/user-attachments/assets/79ec7332-ab79-4942-b664-b4c4fb63ffaa" />

**Available Information:**
- High-resolution images
- Complete description
- Location and date
- Reporter's name (with privacy controls)
- Contact options

**Actions You Can Take:**
- **Message the Reporter:** Start a chat conversation
- **Mark as Match:** If this is your item
- **Share:** Share via social media or copy link

---

### Step 8: Real-Time Chat & Messaging

Click **"Messages & Chat"** to access your conversations.

 <img width="309" height="99" alt="Screenshot 2025-10-20 at 3 42 18 PM" src="https://github.com/user-attachments/assets/57bfac5f-97a1-4e79-ac2e-98c38f25d3ff" />

<img width="1275" height="799" alt="Screenshot 2025-10-20 at 3 42 35 PM" src="https://github.com/user-attachments/assets/3c78e89f-1c08-4837-bf58-eac6618b8993" />

**Chat Features:**
- **Conversation List:** All your chats with timestamps
- **Search:** Find users or search within messages
- **Unread Indicators:** See which chats have new messages
- **User Avatars:** Visual identification of conversation partners

**Active Conversation:**

![Chat Interface - Active Chat](docs/images/11-chat-conversation.png)
*Real-time messaging interface with message history*

**Messaging Features:**
- **Real-time Updates:** Messages appear instantly via Socket.IO
- **Message History:** Scroll through previous conversations
- **Typing Indicators:** See when the other person is typing
- **Timestamps:** Know when messages were sent
- **Secure:** All chats are private and encrypted in transit

**Safety Tips:**
- Don't share sensitive personal information
- Meet in public places for item exchanges
- Verify ownership before handing over items

---

### Step 9: Managing Your Profile

Click your name or avatar to access profile settings.

*Profile management interface*
<img width="681" height="778" alt="Screenshot 2025-10-20 at 3 40 33 PM" src="https://github.com/user-attachments/assets/ba686727-05b8-4d1d-9843-e08c162be48d" />

**What You Can Manage:**
- **Personal Information:** Name, email, phone number
- **Avatar:** Upload or change your profile picture
- **Notification Preferences:** Email/push notification settings
- **Privacy Settings:** Control what others can see
- **Account Security:** Change password, view login history

---

### Step 10: Item Management & Archives

View your active and archived items through the dashboard tabs.

<img width="1105" height="563" alt="Screenshot 2025-10-20 at 3 41 13 PM" src="https://github.com/user-attachments/assets/aad19d1c-18f4-4b01-918b-142a5c882fc2" />

**Item Management:**
- **Edit:** Update item details or images
- **Archive:** Mark items as resolved/returned
- **Delete:** Remove items from the system
- **Status:** See match suggestions and activity
*Historical view of resolved cases*

**Archive Features:**
- View resolved matches
- Export your history
- Reactivate archived items if needed

---



### Step 11: Logging Out

Click **"Logout"** in the top-right menu when you're done.

<img width="1710" height="55" alt="Screenshot 2025-10-20 at 3 41 46 PM" src="https://github.com/user-attachments/assets/e1299206-e6c6-49bb-be7f-223c918e8594" />

*Secure logout process*

Your session is cleared, cookies are removed, and you're redirected to the landing page.

---

## ✨ Features

### Core Features
- ✅ **User Authentication**
  - Google OAuth 2.0 integration
  - JWT-based session management
  - Secure cookie handling
  - Session persistence

- ✅ **Item Management**
  - Report lost items with detailed descriptions
  - Report found items with location data
  - Upload multiple images per item (Cloudinary integration)
  - Edit and update item information
  - Archive resolved cases

- ✅ **Advanced Search & Filtering**
  - Free-text search across item names and descriptions
  - Location-based filtering
  - Category/type filtering
  - Sort by date, relevance, location

- ✅ **Real-Time Communication**
  - Socket.IO powered instant messaging
  - One-on-one chat between users
  - Message history and persistence
  - Online/offline status indicators
  - Typing indicators

- ✅ **User Dashboard**
  - Personalized welcome screen
  - Overview of your lost/found items
  - Quick action buttons
  - Statistics and activity summary

### Security Features
- 🔒 HTTPS enforcement in production
- 🔒 CSRF protection via OAuth state parameter
- 🔒 Secure HTTP-only cookies
- 🔒 Environment-aware security headers
- 🔒 Rate limiting on API endpoints
- 🔒 Input validation and sanitization
- 🔒 XSS protection
- 🔒 SQL injection prevention (MongoDB)

### Additional Features
- 📱 Responsive design (mobile, tablet, desktop)
- 🎨 Modern, intuitive UI/UX
- 🌙 Dark/light theme support (optional)
- 📧 Email notifications (configurable)
- 📊 User activity tracking
- 🗂️ Archive and history management
- 🔍 Smart match suggestions
- 🌍 Location-based services

---

## 🛠️ Technical Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React.js** | UI library for building interactive interfaces |
| **Vite** | Fast build tool and dev server |
| **Axios** | HTTP client for API requests |
| **Socket.IO Client** | Real-time bidirectional communication |
| **React Router** | Client-side routing |
| **Context API** | State management (auth, notifications) |
| **CSS3** | Styling and animations |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime environment |
| **Express.js** | Web application framework |
| **MongoDB** | NoSQL database for flexible data storage |
| **Mongoose** | ODM for MongoDB |
| **Passport.js** | Authentication middleware |
| **Socket.IO** | Real-time communication server |
| **JWT** | Token-based authentication |
| **Cloudinary** | Cloud-based image storage and optimization |
| **Winston** | Logging framework |

### DevOps & Deployment
| Service | Purpose |
|---------|---------|
| **Vercel** | Frontend hosting and deployment |
| **Render.com** | Backend API hosting |
| **MongoDB Atlas** | Cloud database hosting |
| **Cloudinary** | Image CDN and storage |
| **GitHub** | Version control and CI/CD |

### Security & Middleware
- **Helmet.js** - Security headers
- **CORS** - Cross-origin resource sharing
- **express-rate-limit** - Rate limiting
- **express-session** - Session management
- **bcrypt** - Password hashing
- **validator** - Input validation

---

## 📂 Project Structure

```
Lost n Found/
├── client/                          # Frontend React application
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── api/                     # API service functions
│   │   │   ├── auth_api.js          # Authentication API calls
│   │   │   ├── object_api.js        # Lost/Found items API
│   │   │   ├── chat_api.js          # Chat/messaging API
│   │   │   ├── user_api.js          # User profile API
│   │   │   └── image_api.js         # Image upload API
│   │   ├── components/              # Reusable React components
│   │   │   ├── chat/                # Chat components
│   │   │   │   ├── ChatInterface.jsx
│   │   │   │   ├── ChatSidebar.jsx
│   │   │   │   ├── ChatMainArea.jsx
│   │   │   │   └── UnifiedChat.jsx
│   │   │   ├── common/              # Shared components
│   │   │   │   ├── ErrorBoundary.jsx
│   │   │   │   ├── ImageUpload.jsx
│   │   │   │   └── LandingPage.jsx
│   │   │   ├── dashboard/           # Dashboard components
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   └── UserProfile.jsx
│   │   │   ├── layout/              # Layout components
│   │   │   │   └── Navigation.jsx
│   │   │   ├── modals/              # Modal dialogs
│   │   │   │   ├── ChatModal.jsx
│   │   │   │   ├── ReportModal.jsx
│   │   │   │   └── PhoneModal.jsx
│   │   │   ├── objects/             # Item listing components
│   │   │   │   ├── LostList.jsx
│   │   │   │   ├── FoundList.jsx
│   │   │   │   ├── SearchBar.jsx
│   │   │   │   └── SearchResults.jsx
│   │   │   └── ui/                  # UI elements
│   │   │       ├── LoadingSpinner.jsx
│   │   │       ├── Toast.jsx
│   │   │       └── NotificationBar.jsx
│   │   ├── contexts/                # React Context providers
│   │   │   ├── NotificationContext.jsx
│   │   │   └── SocketContext.jsx
│   │   ├── hooks/                   # Custom React hooks
│   │   ├── pages/                   # Page components
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── utils/                   # Utility functions
│   │   │   └── imageUtils.js
│   │   ├── App.jsx                  # Main App component
│   │   ├── main.jsx                 # Entry point
│   │   └── index.css                # Global styles
│   ├── .env                         # Environment variables
│   ├── package.json                 # Dependencies
│   └── vite.config.js               # Vite configuration
│
├── server/                          # Backend Node.js application
│   ├── config/                      # Configuration files
│   │   ├── config.js                # Environment config
│   │   ├── database.js              # MongoDB connection
│   │   ├── passport.js              # Passport strategies
│   │   └── cloudinary.js            # Cloudinary setup
│   ├── controllers/                 # Request handlers (MVC)
│   │   ├── auth_controllers.js      # Authentication logic
│   │   ├── object_controllers.js    # Item CRUD operations
│   │   ├── chat_controllers.js      # Chat/messaging logic
│   │   ├── user_controllers.js      # User management
│   │   └── image_controllers.js     # Image upload handling
│   ├── services/                    # Business logic layer
│   │   ├── auth_service.js          # Auth business logic
│   │   ├── object_service.js        # Item business logic
│   │   └── socket_service.js        # Socket.IO handling
│   ├── models/                      # Database schemas (Mongoose)
│   │   ├── user_model.js            # User schema
│   │   ├── object_model.js          # Lost/Found item schema
│   │   └── chat_model.js            # Chat/message schema
│   ├── routes/                      # API route definitions
│   │   ├── auth_routes.js           # /api/auth/*
│   │   ├── object_routes.js         # /api/objects/*
│   │   ├── chat_routes.js           # /api/chats/*
│   │   ├── user_routes.js           # /api/users/*
│   │   └── image_routes.js          # /api/images/*
│   ├── middlewares/                 # Custom middleware
│   │   ├── auth_middleware.js       # JWT verification
│   │   ├── validation.js            # Input validation
│   │   ├── rateLimiter.js           # Rate limiting
│   │   ├── app_middleware.js        # App-level middleware
│   │   └── error_middleware.js      # Error handling
│   ├── utils/                       # Helper utilities
│   │   ├── logger.js                # Winston logger
│   │   └── auth_token.js            # JWT token utils
│   ├── logs/                        # Application logs
│   │   ├── combined.log
│   │   └── error.log
│   ├── .env                         # Environment variables
│   ├── package.json                 # Dependencies
│   └── index.js                     # Server entry point
│
├── docs/                            # Documentation and images
│   └── images/                      # Screenshots for README
├── .gitignore                       # Git ignore rules
├── LICENSE                          # MIT License
└── README.md                        # This file
```

---

## ⚙️ Environment Setup

### Prerequisites
Before you begin, ensure you have the following installed:
- **Node.js** (v14.x or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **MongoDB Atlas Account** - [Sign Up](https://www.mongodb.com/cloud/atlas)
- **Google Cloud Project** - [Console](https://console.cloud.google.com/)
- **Cloudinary Account** - [Sign Up](https://cloudinary.com/)

### Backend Environment Variables

Create a `.env` file in the `server/` directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# URLs (update for production)
BACKEND_URL=http://localhost:3000
CLIENT_URL=http://localhost:5173
CORS_ORIGIN=http://localhost:5173

# Security Secrets (generate strong random strings)
JWT_SECRET=your_super_secret_jwt_key_min_32_characters_long
SESSION_SECRET=your_super_secret_session_key_min_32_characters_long

# Google OAuth 2.0
GOOGLE_CLIENT_ID=your_google_client_id_from_console
GOOGLE_CLIENT_SECRET=your_google_client_secret_from_console

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lostfound?retryWrites=true&w=majority

# Cloudinary Image Storage
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Frontend Environment Variables

Create a `.env` file in the `client/` directory:

```env
VITE_BACKEND_URL=http://localhost:3000
VITE_GOOGLE_CLIENT_ID=your_google_client_id_from_console
```

### Setting Up Third-Party Services

#### 1. MongoDB Atlas Setup
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier available)
3. Create a database user with username and password
4. Whitelist your IP address (or `0.0.0.0/0` for development)
5. Get your connection string and add it to `MONGODB_URI`

#### 2. Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable "Google+ API"
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Configure OAuth consent screen
6. Add Authorized redirect URIs:
   - `http://localhost:3000/api/auth/google/callback` (development)
   - `https://your-backend.onrender.com/api/auth/google/callback` (production)
7. Copy Client ID and Client Secret to your `.env` files

#### 3. Cloudinary Setup
1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Go to Dashboard
3. Copy Cloud Name, API Key, and API Secret
4. Add them to your `server/.env` file

---

## 🚀 Installation & Running

### Clone the Repository
```bash
git clone https://github.com/your-username/lost-n-found.git
cd lost-n-found
```

### Backend Setup
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file with your environment variables
# (See Environment Setup section above)

# Run development server
npm run dev

# Server will start on http://localhost:3000
```

### Frontend Setup
```bash
# Navigate to client directory (from project root)
cd client

# Install dependencies
npm install

# Create .env file with your environment variables
# (See Environment Setup section above)

# Run development server
npm run dev

# Frontend will start on http://localhost:5173
```

### Running Both Simultaneously
You can use two terminal windows/tabs:
- Terminal 1: `cd server && npm run dev`
- Terminal 2: `cd client && npm run dev`

Or use a tool like `concurrently` to run both from the root:
```bash
npm install -g concurrently
concurrently "cd server && npm run dev" "cd client && npm run dev"
```

---

## 🌍 Deployment

### Frontend Deployment (Vercel)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com/) and sign in
3. Click "New Project" and import your repository
4. Configure build settings:
   - **Framework Preset:** Vite
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Add environment variables in Vercel dashboard:
   - `VITE_BACKEND_URL=https://your-backend.onrender.com`
   - `VITE_GOOGLE_CLIENT_ID=your_google_client_id`
6. Deploy!

### Backend Deployment (Render.com)

1. Push your code to GitHub
2. Go to [Render](https://render.com/) and sign in
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure service:
   - **Name:** lost-n-found-backend
   - **Root Directory:** `server`
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `node index.js`
6. Add environment variables in Render dashboard (all from `server/.env`)
7. Set `NODE_ENV=production`
8. Deploy!

### Post-Deployment Steps

1. **Update OAuth Redirect URIs** in Google Cloud Console with your production URLs
2. **Update CORS Origins** - Set `CLIENT_URL` and `CORS_ORIGIN` to your Vercel URL
3. **Test OAuth Flow** - Ensure Google login works in production
4. **Monitor Logs** - Check Render and Vercel logs for any issues
5. **Set Up Custom Domains** (optional) - Add custom domains in Vercel/Render

---

## 🔒 Security Features

### Authentication & Authorization
- **OAuth 2.0 with Google** - Industry-standard authentication
- **JWT Tokens** - Stateless authentication for API requests
- **HTTP-Only Cookies** - Prevent XSS attacks
- **Secure Cookies** - HTTPS-only in production
- **CSRF Protection** - OAuth state parameter validation

### Data Protection
- **Input Validation** - All user inputs sanitized
- **MongoDB Injection Prevention** - Mongoose schema validation
- **XSS Protection** - Content sanitization
- **Rate Limiting** - Prevent abuse and DDoS
- **Password Hashing** - Bcrypt with salt rounds

### Network Security
- **HTTPS Enforcement** - Automatic redirect in production
- **CORS Configuration** - Restricted to allowed origins
- **Security Headers** - Helmet.js implementation
  - X-Frame-Options
  - X-Content-Type-Options
  - X-XSS-Protection
  - Strict-Transport-Security
  - Content-Security-Policy

### Infrastructure
- **Trust Proxy** - Configured for Render/proxy deployments
- **Environment Variables** - Sensitive data not in code
- **Error Handling** - No sensitive info in error messages
- **Logging** - Structured logs without PII

---

## 📡 API Documentation

### Base URL
- Development: `http://localhost:3000/api`
- Production: `https://lost-n-found-gfjm.onrender.com/api`

### Authentication Endpoints

#### `GET /auth/google`
Start Google OAuth flow
- **Response:** Redirects to Google login

#### `GET /auth/google/callback`
Google OAuth callback
- **Response:** Redirects to client with auth status

#### `GET /auth/profile`
Get current user profile
- **Auth:** Required
- **Response:** User object

#### `POST /auth/logout`
Logout current user
- **Auth:** Required
- **Response:** Success message

### Object (Items) Endpoints

#### `GET /objects`
List all items with filters
- **Query Params:** `type`, `location`, `search`, `limit`, `skip`
- **Response:** Array of items

#### `POST /objects`
Create a new lost/found item
- **Auth:** Required
- **Body:** `{ type, title, description, location, date, imageUrl }`
- **Response:** Created item

#### `GET /objects/:id`
Get single item by ID
- **Response:** Item object

#### `PATCH /objects/:id`
Update an item
- **Auth:** Required (must be owner)
- **Body:** Fields to update
- **Response:** Updated item

#### `DELETE /objects/:id`
Delete an item
- **Auth:** Required (must be owner)
- **Response:** Success message

### Chat Endpoints

#### `GET /chats`
List user's chats
- **Auth:** Required
- **Response:** Array of chat objects

#### `GET /chats/:id/messages`
Get messages in a chat
- **Auth:** Required
- **Response:** Array of messages

#### `POST /chats/:id/messages`
Send a message
- **Auth:** Required
- **Body:** `{ body }`
- **Response:** Created message

### Image Endpoints

#### `POST /images/upload`
Upload an image to Cloudinary
- **Auth:** Required
- **Body:** `multipart/form-data` with image file
- **Response:** `{ imageUrl }`

### User Endpoints

#### `GET /users/:id`
Get user profile
- **Response:** User object (public fields only)

#### `PATCH /users/profile`
Update own profile
- **Auth:** Required
- **Body:** Fields to update
- **Response:** Updated user

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### How to Contribute

1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/lost-n-found.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Write clean, documented code
   - Follow existing code style
   - Add tests if applicable

4. **Commit your changes**
   ```bash
   git commit -m "feat: add amazing feature"
   ```
   Use conventional commits: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`

5. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Describe your changes
   - Link any related issues
   - Wait for review

### Development Guidelines
- Follow the existing folder structure
- Use meaningful variable and function names
- Comment complex logic
- Keep functions small and focused
- Write reusable components
- Test your changes locally

### Code of Conduct
- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Raghavendra Linga

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👨‍💻 Author

**Raghavendra Linga**


- 📧 **Email:** [your.email@example.com](mailto:lingaraghawendra@gmail.com)

**About Me:**
Full-stack developer passionate about building solutions that make a real-world impact. Experienced in React, Node.js, and modern web technologies. Always learning and exploring new tech.

---

## 🙏 Acknowledgments

Special thanks to:

- **Google Cloud Platform** - For providing OAuth 2.0 authentication services
- **Cloudinary** - For reliable image hosting and optimization
- **MongoDB Atlas** - For scalable cloud database hosting
- **Vercel** - For seamless frontend deployment
- **Render.com** - For reliable backend hosting
- **Socket.IO** - For real-time communication capabilities
- **React.js Community** - For excellent documentation and support
- **Express.js Team** - For the robust web framework
- **Open Source Community** - For the amazing tools and libraries

---



---

## ❓ FAQ

**Q: I'm getting a 401 error after Google login.**  
A: Ensure your `CLIENT_URL` matches your frontend origin exactly, cookies are enabled, and the OAuth `state` parameter is being validated correctly.

**Q: Images aren't uploading.**  
A: Check your Cloudinary credentials in `.env`, ensure the file is ≤5MB and in JPG/JPEG format, and verify your API key has upload permissions.

**Q: WebSocket connection fails.**  
A: Confirm your backend is running, firewall isn't blocking WebSocket connections, and your `VITE_BACKEND_URL` is correct.

**Q: Port 3000 is already in use.**  
A: Stop any existing Node processes or change the `PORT` variable in your server `.env` file.

**Q: Google OAuth shows "dangerous site" warning.**  
A: This is often a false positive. Ensure you have HTTPS, security headers, and submit a review to Google Safe Browsing.

**Q: Can I use a different database?**  
A: The app is built for MongoDB, but you could adapt the models for PostgreSQL or MySQL with an ORM like Sequelize.

**Q: How do I add admin features?**  
A: Add a `role` field to the User model, create admin middleware, and build admin-only routes and components.

---

## 🗺️ Roadmap

Future enhancements planned:

- [ ] **Smart Matching Algorithm** - AI-powered suggestions for lost/found matches
- [ ] **Push Notifications** - Real-time alerts for new matches and messages
- [ ] **Multi-language Support** - i18n for global accessibility
- [ ] **Mobile Apps** - React Native iOS/Android applications
- [ ] **Email Notifications** - Configurable email alerts
- [ ] **Map Integration** - Visual location picker and display
- [ ] **Admin Dashboard** - Moderation and analytics tools
- [ ] **Payment Integration** - Optional reward system
- [ ] **Social Sharing** - Share lost items on social media
- [ ] **QR Codes** - Generate QR codes for lost item posters

---



## 🔗 Useful Links

- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Manual](https://www.mongodb.com/docs/)
- [Socket.IO Documentation](https://socket.io/docs/)
- [Passport.js Guide](http://www.passportjs.org/docs/)
- [Cloudinary API](https://cloudinary.com/documentation)

---

<div align="center">

**Built with ❤️ by [Raghavendra Linga](https://github.com/Raghavendra1729-cell)**

⭐ Star this repo if you find it helpful! ⭐

</div>

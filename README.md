# 🔍 Lost & Found App

A comprehensive web application for reporting and managing lost and found items with real-time chat functionality, smart matching algorithms, and user-friendly interface.

## 📋 Table of Contents

- [Features](#-features)
- [How to Use All Features](#-how-to-use-all-features)
- [How We Created This](#-how-we-created-this)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Technologies Used](#-technologies-used)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [Author](#-author)
- [License](#-license)

## ✨ Features

### Core Functionality
- **User Authentication**: Google OAuth 2.0 integration with JWT tokens
- **Item Management**: Report lost/found items with images and descriptions
- **Smart Matching**: AI-powered matching algorithm to connect lost and found items
- **Real-time Chat**: Direct communication between users about specific items
- **Image Upload**: Cloudinary integration for secure image storage
- **Search & Filter**: Advanced search capabilities with location and type filters

### Advanced Chat Features
- **Unified Chat System**: Single interface for all messaging needs
- **User Search**: Find and chat with any user by username or email
- **Chat History**: View all previous conversations in one place
- **Real-time Messaging**: Instant message delivery with Socket.IO
- **Message Status**: See when messages are sent, delivered, and read
- **Auto-greetings**: Automatic greeting messages when connecting through matches
- **Contact Integration**: Direct chat access from item contact buttons
- **Professional UI**: Clean, modern chat interface with message bubbles

### Advanced Features
- **Notification System**: Real-time notifications for messages and matches
- **Contact Management**: Secure contact information sharing
- **Status Tracking**: Track item status (active, resolved, archived)
- **Responsive Design**: Mobile-first design with modern UI/UX
- **Error Handling**: Comprehensive error boundaries and validation
- **Rate Limiting**: API protection against abuse
- **Logging**: Structured logging with Winston

### User Experience
- **Modern UI**: Clean, intuitive interface with Tailwind CSS
- **Real-time Updates**: Socket.IO for instant messaging
- **Image Sharing**: Share images in chat conversations
- **Mobile Responsive**: Works seamlessly on all devices
- **Dark Theme**: Professional dark theme design
- **Loading States**: Smooth loading animations and feedback
- **Component-based Architecture**: Modular, maintainable code structure

## 🎯 How to Use All Features

### 1. Getting Started
1. **Register/Login**: Use Google OAuth or email registration
2. **Complete Profile**: Add your phone number for verification
3. **Explore Dashboard**: Access all features from the main dashboard

### 2. Item Management
#### Report Lost Items
1. Click "Report Item" button on dashboard
2. Select "Lost" as item type
3. Fill in details: name, description, location, date
4. Upload clear photos of the item
5. Submit to add to your lost items list

#### Report Found Items
1. Click "Report Item" button on dashboard
2. Select "Found" as item type
3. Fill in details: name, description, location where found
4. Upload photos showing the found item
5. Submit to help owners find their items

#### Manage Your Items
- **View Items**: Switch between "Lost", "Found", and "Archive" tabs
- **Edit Items**: Click on any item to modify details
- **Archive Items**: Move resolved items to archive
- **Delete Items**: Remove items you no longer need

### 3. Search & Discovery
#### Search for Items
1. Use the search bar on dashboard or landing page
2. Enter keywords related to the item
3. Filter by location and type (lost/found)
4. Browse through matching results

#### Smart Matching
1. View "Smart Matches" for your items
2. See potential matches between lost and found items
3. Contact item owners directly through the chat system

### 4. Chat System (Complete Guide)
#### Access Chat System
1. Click the **"Messages & Chat"** button on dashboard
2. Opens the unified chat interface with all features

#### Search and Start New Chats
1. **Search Users**: Type in the search bar to find users by name or email
2. **Start Chat**: Click on any user from search results
3. **Send Greeting**: Automatic greeting message is sent
4. **Begin Conversation**: Start chatting immediately

#### Manage Chat History
1. **View All Chats**: See all your conversations in the sidebar
2. **Select Chat**: Click on any conversation to open it
3. **Message Preview**: See last message and timestamp for each chat
4. **Unread Indicators**: Visual indicators for unread messages

#### Real-time Messaging
1. **Send Messages**: Type and send messages instantly
2. **Message Status**: See when messages are sent, delivered, and read
3. **Real-time Updates**: Messages appear instantly for both users
4. **Online Status**: See when other users are online

#### Contact Integration
1. **From Items**: Click "Contact" button on any item
2. **Direct Chat**: Opens chat with item owner/finder
3. **Auto-greeting**: Automatic message about the specific item
4. **Context**: Chat is linked to the specific item

### 5. Notifications
1. **Real-time Alerts**: Get notified when you receive messages
2. **Browser Notifications**: Desktop notifications when app is not focused
3. **Unread Count**: Visual indicators for unread messages
4. **Match Notifications**: Get notified about new smart matches

### 6. Profile Management
1. **View Profile**: Access your profile information
2. **Update Details**: Modify your name, email, phone
3. **Security**: Manage authentication and privacy settings

## 🛠 How We Created This

### Development Process
1. **Planning Phase**
   - Defined core features and user requirements
   - Designed database schema and API structure
   - Planned component architecture and user flow

2. **Backend Development**
   - Set up Node.js/Express server with MongoDB
   - Implemented authentication with Google OAuth
   - Created RESTful API endpoints
   - Added Socket.IO for real-time features
   - Implemented image upload with Cloudinary

3. **Frontend Development**
   - Built React application with Vite
   - Implemented responsive UI with Tailwind CSS
   - Created modular component architecture
   - Added real-time chat functionality
   - Integrated with backend APIs

4. **Integration & Testing**
   - Connected frontend and backend
   - Tested all features thoroughly
   - Implemented error handling and validation
   - Added logging and monitoring

5. **Optimization & Cleanup**
   - Refactored components for better maintainability
   - Optimized performance and user experience
   - Added comprehensive documentation
   - Implemented professional-grade architecture

### Key Design Decisions
- **Component-based Architecture**: Modular, reusable components
- **Real-time Communication**: Socket.IO for instant messaging
- **Professional UI/UX**: Clean, modern interface design
- **Scalable Backend**: RESTful APIs with proper error handling
- **Security First**: JWT authentication and input validation

## 📁 Project Structure

```
Lost n Found/
├── client/                          # Frontend React application
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── api/                     # API service functions
│   │   │   ├── auth_api.js          # Authentication API calls
│   │   │   ├── chat_api.js          # Chat API calls
│   │   │   ├── image_api.js         # Image upload API calls
│   │   │   ├── object_api.js        # Object management API calls
│   │   │   └── user_api.js          # User search API calls
│   │   ├── components/              # React components
│   │   │   ├── common/              # Shared components
│   │   │   │   ├── ImageUpload.jsx
│   │   │   │   └── LandingPage.jsx
│   │   │   ├── dashboard/           # Dashboard components
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   └── UserProfile.jsx
│   │   │   ├── layout/              # Layout components
│   │   │   │   └── Navigation.jsx
│   │   │   ├── modals/              # Modal components
│   │   │   │   ├── ChatModal.jsx
│   │   │   │   ├── ContactModal.jsx
│   │   │   │   ├── PhoneModal.jsx
│   │   │   │   ├── ReportModal.jsx
│   │   │   │   ├── SmartMatchesModal.jsx
│   │   │   │   └── UserSearchModal.jsx
│   │   │   ├── chat/                # Chat system components
│   │   │   │   ├── ChatInterface.jsx
│   │   │   │   ├── ChatHistory.jsx
│   │   │   │   ├── ChatSidebar.jsx
│   │   │   │   ├── ChatMainArea.jsx
│   │   │   │   ├── UnifiedChat.jsx
│   │   │   │   └── EnhancedChat.jsx
│   │   │   ├── objects/             # Object-related components
│   │   │   │   ├── ArchiveList.jsx
│   │   │   │   ├── FoundList.jsx
│   │   │   │   ├── LostList.jsx
│   │   │   │   ├── SearchBar.jsx
│   │   │   │   └── SearchResults.jsx
│   │   │   └── ui/                  # UI components
│   │   │       ├── AnimatedBackground.jsx
│   │   │       ├── NotificationBar.jsx
│   │   │       └── Animations.css
│   │   ├── contexts/                # React contexts
│   │   │   ├── NotificationContext.jsx
│   │   │   └── SocketContext.jsx
│   │   ├── pages/                   # Page components
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── utils/                   # Utility functions
│   │   │   └── imageUtils.js
│   │   ├── App.jsx                 # Main App component
│   │   ├── main.jsx                # Application entry point
│   │   └── index.css               # Global styles
│   ├── package.json                # Frontend dependencies
│   ├── vite.config.js             # Vite configuration
│   └── eslint.config.js           # ESLint configuration
├── server/                         # Backend Node.js application
│   ├── config/                     # Configuration files
│   │   ├── cloudinary.js           # Cloudinary configuration
│   │   ├── config.js               # Main configuration
│   │   ├── database.js             # Database connection
│   │   └── passport.js             # Passport configuration
│   ├── controllers/                # Route controllers
│   │   ├── auth_controllers.js     # Authentication logic
│   │   ├── chat_controllers.js     # Chat functionality
│   │   ├── image_controllers.js    # Image handling
│   │   ├── object_controllers.js   # Object management
│   │   └── user_controllers.js     # User search functionality
│   ├── middlewares/                # Express middlewares
│   │   ├── auth_middleware.js      # Authentication middleware
│   │   ├── rateLimiter.js          # Rate limiting
│   │   └── validation.js           # Input validation
│   ├── models/                     # Mongoose models
│   │   ├── chat_model.js           # Chat schema
│   │   ├── object_model.js         # Object schema
│   │   └── user_model.js           # User schema
│   ├── routes/                     # Express routes
│   │   ├── auth_routes.js          # Authentication routes
│   │   ├── chat_routes.js          # Chat routes
│   │   ├── image_routes.js         # Image routes
│   │   ├── object_routes.js        # Object routes
│   │   └── user_routes.js          # User search routes
│   ├── utils/                      # Utility functions
│   │   ├── auth_token.js           # JWT utilities
│   │   └── logger.js               # Logging utilities
│   ├── logs/                       # Log files
│   ├── package.json                # Backend dependencies
│   └── index.js                    # Server entry point
└── README.md                       # This file
```

## 🚀 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- Cloudinary account (for image storage)
- Google OAuth credentials

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd "Lost n Found"
```

### Step 2: Install Dependencies

#### Backend Dependencies
```bash
cd server
npm install
```

#### Frontend Dependencies
```bash
cd ../client
npm install
```

### Step 3: Start the Application

#### Start Backend Server
```bash
cd server
npm run dev
```
Server will start on `http://localhost:3000`

#### Start Frontend Development Server
```bash
cd client
npm run dev
```
Frontend will start on `http://localhost:5173`

## ⚙️ Environment Variables

Create a `.env` file in the server directory with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/lost-found-app

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=30d

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# CORS
CORS_ORIGIN=http://localhost:5173

# Security
SESSION_SECRET=your-session-secret
BCRYPT_ROUNDS=12

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# File Upload
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif,image/webp

# Logging
LOG_LEVEL=info
```

### Environment Setup Guide

#### MongoDB Setup
1. Install MongoDB locally or use MongoDB Atlas
2. Update `MONGODB_URI` in your `.env` file
3. Ensure MongoDB is running on the specified port

#### Cloudinary Setup
1. Create a Cloudinary account at [cloudinary.com](https://cloudinary.com)
2. Get your cloud name, API key, and API secret from dashboard
3. Update the Cloudinary configuration in `.env`

#### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/google/callback`
6. Update `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `.env`

## 📚 API Endpoints

### Authentication Endpoints

#### POST `/api/auth/register`
Register a new user
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### POST `/api/auth/login`
Login user
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### GET `/api/auth/google`
Initiate Google OAuth flow

#### GET `/api/auth/profile`
Get current user profile (requires authentication)

#### POST `/api/auth/logout`
Logout user (requires authentication)

### Object Endpoints

#### GET `/api/objects/all`
Get all objects (requires authentication)

#### POST `/api/objects`
Create new object (requires authentication)
```json
{
  "name": "iPhone 12",
  "description": "Lost my phone",
  "type": "lost",
  "location": "Central Park",
  "date": "2024-01-15T10:00:00Z"
}
```

#### GET `/api/objects/search`
Search objects with query parameters
- `q`: Search query
- `type`: Object type (lost/found)
- `location`: Location filter

#### GET `/api/objects/:id/matches`
Get matches for specific object

#### PUT `/api/objects/:id/status`
Update object status
```json
{
  "status": "resolved"
}
```

#### DELETE `/api/objects/:id`
Delete object

### Chat Endpoints

#### POST `/api/chat/chat`
Create or get existing chat
```json
{
  "itemId": "item_id",
  "receiverId": "user_id"
}
```

#### POST `/api/chat/global-chat`
Create or get global chat
```json
{
  "receiverId": "user_id"
}
```

#### GET `/api/chat/chats`
Get all chats for current user

#### GET `/api/chat/:chatId/messages`
Get messages for specific chat

#### POST `/api/chat/message`
Send new message
```json
{
  "receiverId": "user_id",
  "content": "Hello!",
  "itemId": "item_id"
}
```

#### POST `/api/chat/mark-read`
Mark messages as read
```json
{
  "senderId": "user_id",
  "itemId": "item_id"
}
```

### User Endpoints

#### GET `/api/users/search`
Search users by name or email
- `q`: Search query

### Image Endpoints

#### POST `/api/images/upload`
Upload image (multipart/form-data)
- `image`: Image file

#### DELETE `/api/images/:publicId`
Delete image by public ID

### Health Check

#### GET `/health`
Server health status
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:00:00Z",
  "uptime": 3600,
  "environment": "development"
}
```

## 🛠 Technologies Used

### Frontend
- **React 18**: Modern React with hooks and functional components
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Socket.IO Client**: Real-time communication
- **React Router**: Client-side routing
- **Context API**: State management
- **Axios**: HTTP client for API calls

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database with Mongoose ODM
- **Socket.IO**: Real-time bidirectional communication
- **JWT**: JSON Web Tokens for authentication
- **Passport.js**: Authentication middleware
- **Cloudinary**: Cloud-based image management
- **Winston**: Logging library
- **Express Rate Limit**: API rate limiting
- **Express Validator**: Input validation

### Development Tools
- **Nodemon**: Development server with auto-restart
- **ESLint**: Code linting and formatting
- **Git**: Version control

## 🧪 Testing

### Manual Testing Guide

#### Test User Registration
1. Navigate to `/register`
2. Fill in registration form
3. Verify account creation

#### Test Item Reporting
1. Login to the application
2. Click "Report Item"
3. Fill in item details and upload image
4. Verify item appears in dashboard

#### Test Chat Functionality
1. **Access Chat System**: Click "Messages & Chat" button on dashboard
2. **Search Users**: Use the search bar to find users by name or email
3. **Start New Chat**: Click on a user from search results to start chatting
4. **Chat History**: View all your conversations in the sidebar
5. **Real-time Messaging**: Send messages and see instant delivery
6. **Contact Integration**: Click "Contact" on any item to directly open chat
7. **Auto-greetings**: Automatic greeting messages when connecting through matches
8. **Message Status**: See when messages are sent, delivered, and read

#### Test Search Functionality
1. Use search bar to find items
2. Apply filters by type and location
3. Verify search results accuracy

### API Testing with cURL

#### Test Authentication
```bash
# Register user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login user
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

#### Test Object Creation
```bash
curl -X POST http://localhost:3000/api/objects \
  -H "Content-Type: application/json" \
  -H "Cookie: token=your-jwt-token" \
  -d '{"name":"Test Item","type":"lost","location":"Test Location","date":"2024-01-15T10:00:00Z"}'
```

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lost-found-app
CORS_ORIGIN=https://yourdomain.com
JWT_SECRET=your-production-secret-key
```

### Production Build
```bash
# Build frontend
cd client
npm run build

# Start production server
cd ../server
npm start
```

### Cloud Deployment Options
- **Heroku**: Easy deployment with built-in MongoDB
- **Vercel**: Frontend deployment with serverless functions
- **AWS**: EC2 for backend, S3 for static files
- **DigitalOcean**: Droplets for full-stack deployment

## 💬 Chat System Architecture

### Component Structure
The chat system is built with a modular, component-based architecture:

- **EnhancedChat**: Main chat container that orchestrates all chat functionality
- **ChatSidebar**: Handles user search, chat history, and conversation selection
- **ChatMainArea**: Manages message display, input, and real-time updates
- **ChatInterface**: Individual chat interface for specific conversations
- **ChatHistory**: Displays list of all user conversations

### Key Features
- **Unified Interface**: Single "Messages & Chat" button provides access to all chat features
- **User Search**: Real-time search by username or email with instant results
- **Chat History**: Persistent conversation history with message previews
- **Real-time Updates**: Socket.IO integration for instant message delivery
- **Auto-greetings**: Automatic greeting messages when connecting through item matches
- **Contact Integration**: Direct chat access from item contact buttons
- **Message Status**: Visual indicators for sent, delivered, and read messages

### Data Flow
1. User clicks "Messages & Chat" → Opens EnhancedChat component
2. ChatSidebar loads existing conversations and provides user search
3. User selects conversation → ChatMainArea displays messages
4. New messages sent → Real-time delivery via Socket.IO
5. Contact buttons on items → Direct chat with greeting message

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes
4. Test thoroughly
5. Commit your changes: `git commit -m "Add new feature"`
6. Push to the branch: `git push origin feature/new-feature`
7. Create a Pull Request

### Code Standards
- Use ESLint for code formatting
- Write meaningful commit messages
- Add comments for complex logic
- Test all new features
- Update documentation as needed

### Bug Reports
When reporting bugs, please include:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Browser/device information
- Console errors (if any)

## 👤 Author

**Linga Seetha Rama Raghavendra**
- **Email**: lingaraghawendra@gmail.com
- **GitHub**: [@lingaraghavendra](https://github.com/lingaraghavendra)

### About the Developer
Full-stack developer with expertise in:
- React.js and Node.js development
- MongoDB and database design
- Real-time applications with Socket.IO
- Cloud deployment and DevOps
- UI/UX design and implementation


## 🙏 Acknowledgments

- React community for excellent documentation
- MongoDB for robust database solution
- Cloudinary for image management
- Socket.IO for real-time communication
- Tailwind CSS for beautiful styling
- Google OAuth for secure authentication



---

**Made with ❤️ for helping people find their lost items**

*This application demonstrates modern full-stack development practices with real-time features, professional UI/UX, and scalable architecture.*
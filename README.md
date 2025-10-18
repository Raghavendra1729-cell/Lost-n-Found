# 🔍 Lost & Found App

A comprehensive web application for reporting and managing lost and found items with real-time chat functionality, smart matching algorithms, and user-friendly interface.

## 📋 Table of Contents

- [Features](#-features)
- [Technologies Used](#-technologies-used)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### Core Functionality
- **User Authentication**: Google OAuth 2.0 integration with JWT tokens
- **Item Management**: Report lost/found items with images and descriptions
- **Smart Matching**: AI-powered matching algorithm to connect lost and found items
- **Real-time Chat**: Direct communication between users about specific items
- **Image Upload**: Cloudinary integration for secure image storage
- **Search & Filter**: Advanced search capabilities with location and type filters

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
- **Postman**: API testing

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
│   │   │   └── object_api.js        # Object management API calls
│   │   ├── components/              # React components
│   │   │   ├── common/              # Shared components
│   │   │   │   ├── ErrorBoundary.jsx
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
│   │   │   │   ├── ConfirmationModal.jsx
│   │   │   │   ├── PhoneModal.jsx
│   │   │   │   ├── ReportModal.jsx
│   │   │   │   └── SmartMatchesModal.jsx
│   │   │   ├── objects/             # Object-related components
│   │   │   │   ├── ArchiveList.jsx
│   │   │   │   ├── FoundList.jsx
│   │   │   │   ├── LostList.jsx
│   │   │   │   ├── SearchBar.jsx
│   │   │   │   └── SearchResults.jsx
│   │   │   └── ui/                  # UI components
│   │   │       ├── AnimatedBackground.jsx
│   │   │       ├── LoadingSpinner.jsx
│   │   │       ├── NotificationBar.jsx
│   │   │       └── Toast.jsx
│   │   ├── contexts/                # React contexts
│   │   │   ├── NotificationContext.jsx
│   │   │   └── SocketContext.jsx
│   │   ├── hooks/                   # Custom React hooks
│   │   ├── pages/                   # Page components
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── utils/                  # Utility functions
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
│   │   └── object_controllers.js    # Object management
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
│   │   └── object_routes.js        # Object routes
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

### Step 3: Environment Configuration

Create a `.env` file in the server directory:

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

## ⚙️ Configuration

### MongoDB Setup
1. Install MongoDB locally or use MongoDB Atlas
2. Update `MONGODB_URI` in your `.env` file
3. Ensure MongoDB is running on the specified port

### Cloudinary Setup
1. Create a Cloudinary account
2. Get your cloud name, API key, and API secret
3. Update the Cloudinary configuration in `.env`

### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/google/callback`
6. Update `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `.env`

## 🎯 Usage

### Development Mode

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

### Production Mode

#### Build Frontend
```bash
cd client
npm run build
```

#### Start Production Server
```bash
cd server
npm start
```

### Available Scripts

#### Backend Scripts
- `npm start`: Start production server
- `npm run dev`: Start development server with nodemon
- `npm run logs`: View combined logs
- `npm run logs:error`: View error logs only

#### Frontend Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

## 📚 API Documentation

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

### Chat Endpoints

#### POST `/api/chat/create`
Create or get existing chat
```json
{
  "otherUserId": "user_id",
  "itemId": "item_id"
}
```

#### GET `/api/chat/list`
Get all chats for current user

#### GET `/api/chat/:chatId/messages`
Get messages for specific chat

#### POST `/api/chat/:chatId/resolve`
Mark chat and item as resolved

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

## 🧪 Testing

### Manual Testing

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
1. Find a matching item
2. Click "Contact Owner/Finder"
3. Send messages and verify real-time updates
4. Test image sharing in chat

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

### Docker Deployment (Optional)

#### Dockerfile for Backend
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

#### Dockerfile for Frontend
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Cloud Deployment Options
- **Heroku**: Easy deployment with built-in MongoDB
- **Vercel**: Frontend deployment with serverless functions
- **AWS**: EC2 for backend, S3 for static files
- **DigitalOcean**: Droplets for full-stack deployment

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

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Linga Seetha Rama Raghavendra** - *Initial work* - [GitHub Profile](https://github.com/yourusername)

## 🙏 Acknowledgments

- React community for excellent documentation
- MongoDB for robust database solution
- Cloudinary for image management
- Socket.IO for real-time communication
- Tailwind CSS for beautiful styling

## 📞 Support

For support, email support@lostfoundapp.com or create an issue in the repository.

---

**Made with ❤️ for helping people find their lost items**
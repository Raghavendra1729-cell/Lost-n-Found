# Lost & Found App

A modern web application for reporting and finding lost items, built with React frontend and Node.js backend.

## 🚀 Features

- **User Authentication**: Secure login/register with JWT tokens
- **Google OAuth**: Social login integration
- **Dashboard**: User-friendly interface with statistics
- **Search Functionality**: Find lost items by category, date, and location
- **Report System**: Report lost or found items with detailed information
- **Responsive Design**: Modern UI with Tailwind CSS
- **Real-time Updates**: Dynamic user interface

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with latest features
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **Vite** - Fast build tool and dev server

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Passport.js** - Authentication middleware
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
lost-and-found-app/
├── client/                          # React Frontend
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   │   ├── ui/                  # Visual elements & animations
│   │   │   │   ├── AnimatedBackground.jsx
│   │   │   │   ├── Animations.css
│   │   │   │   └── index.js
│   │   │   ├── layout/              # Navigation & structure
│   │   │   │   ├── Navigation.jsx
│   │   │   │   └── index.js
│   │   │   ├── modals/              # Popups & overlays
│   │   │   │   ├── ReportModal.jsx
│   │   │   │   ├── SearchModal.jsx
│   │   │   │   └── index.js
│   │   │   ├── dashboard/           # Dashboard components
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── FeaturedItems.jsx
│   │   │   │   ├── QuickActions.jsx
│   │   │   │   ├── QuickStats.jsx
│   │   │   │   ├── RecentActivity.jsx
│   │   │   │   ├── UserProfile.jsx
│   │   │   │   └── index.js
│   │   │   ├── common/              # Shared components
│   │   │   │   ├── LandingPage.jsx
│   │   │   │   └── index.js
│   │   │   └── index.js             # Main components export
│   │   ├── pages/                   # Page components
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   └── index.js
│   │   ├── api/                     # API service functions
│   │   │   └── auth_api.js
│   │   ├── constants/               # App constants
│   │   │   └── index.js
│   │   ├── utils/                   # Utility functions
│   │   │   └── index.js
│   │   ├── hooks/                   # Custom React hooks
│   │   │   └── index.js
│   │   ├── assets/                  # Static assets
│   │   ├── App.jsx                  # Main App component
│   │   ├── App.css                  # Global styles
│   │   ├── main.jsx                 # App entry point
│   │   └── index.css                # Base styles
│   ├── package.json
│   ├── vite.config.js
│   └── eslint.config.js
├── server/                          # Node.js Backend
│   ├── config/                      # Configuration files
│   │   ├── config.js                # Database connection
│   │   └── passport.js              # Passport configuration
│   ├── controllers/                 # Route handlers
│   │   └── auth_controllers.js
│   ├── middlewares/                 # Custom middleware
│   │   └── auth_middleware.js
│   ├── models/                      # Database models
│   │   └── user_model.js
│   ├── routes/                      # API routes
│   │   └── auth_routes.js
│   ├── utils/                       # Utility functions
│   │   └── auth_token.js
│   ├── env.example                  # Environment variables template
│   ├── index.js                     # Server entry point
│   └── package.json
├── .gitignore                       # Git ignore rules
└── README.md                        # This file
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (local or cloud instance)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd lost-and-found-app
   ```

2. **Install dependencies**
   ```bash
   # Install all dependencies (client + server)
   npm install
   cd client && npm install
   cd ../server && npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy environment template
   cp server/env.example server/.env
   
   # Edit server/.env with your configurations:
   MONGO_URL=mongodb://localhost:27017/lost-and-found
   JWT_SECRET=your-super-secret-jwt-key-here
   SESSION_SECRET=your-session-secret-here
   PORT=5000
   CLIENT_URL=http://localhost:3000
   ```

4. **Start the application**
   ```bash
   # Start both client and server concurrently
   npm run dev
   
   # Or start individually:
   # Client only (port 3000)
   npm run client:dev
   
   # Server only (port 5000)
   npm run server:dev
   ```

5. **Access the application**
   - **Frontend**: http://localhost:3000
   - **Backend API**: http://localhost:5000

## 📋 Available Scripts

### Root Level
```bash
npm run dev              # Start both client and server
npm run client:dev       # Start client only
npm run server:dev       # Start server only
npm run build            # Build client for production
npm run install:all      # Install all dependencies
```

### Client Scripts
```bash
cd client
npm run dev              # Start Vite dev server
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run ESLint
```

### Server Scripts
```bash
cd server
npm start                # Start production server
npm run dev              # Start with nodemon (development)
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile
- `GET /api/auth/google` - Google OAuth login

### Items (Coming Soon)
- `GET /api/items` - Get all items
- `POST /api/items` - Create new item
- `PUT /api/items/:id` - Update item
- `DELETE /api/items/:id` - Delete item

## 🎨 Component Architecture

### Component Categories

1. **UI Components** (`/components/ui/`)
   - Visual elements and animations
   - Reusable across the application

2. **Layout Components** (`/components/layout/`)
   - Navigation and structural elements
   - App-wide layout components

3. **Modal Components** (`/components/modals/`)
   - Popups and overlay components
   - User interaction dialogs

4. **Dashboard Components** (`/components/dashboard/`)
   - Dashboard-specific functionality
   - User dashboard features

5. **Common Components** (`/components/common/`)
   - Shared and reusable components
   - Cross-feature components

### Import Pattern
```javascript
// Clean imports using centralized exports
import { AnimatedBackground, Navigation, Dashboard } from '../components'
import { HomePage, LoginPage } from '../pages'
```

## 🔐 Authentication Flow

1. **Registration/Login**: User creates account or logs in
2. **JWT Token**: Server issues JWT token upon successful auth
3. **Token Storage**: Token stored in localStorage
4. **Protected Routes**: JWT middleware protects API endpoints
5. **Google OAuth**: Alternative authentication via Google

## 🗄️ Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  isGoogleAuth: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Deployment

### Client (Frontend)
```bash
cd client
npm run build
# Deploy the 'dist' folder to your hosting service
```

### Server (Backend)
```bash
cd server
npm start
# Deploy to your server with PM2 or similar
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Development Notes

- **Hot Reload**: Both client and server support hot reloading
- **ESLint**: Code linting configured for React
- **Environment Variables**: Use `.env` files for configuration
- **CORS**: Configured for development and production
- **Error Handling**: Comprehensive error handling throughout

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Kill process on port 3000 or 5000
   lsof -ti:3000 | xargs kill -9
   lsof -ti:5000 | xargs kill -9
   ```

2. **MongoDB Connection Issues**
   - Ensure MongoDB is running
   - Check connection string in `.env`
   - Verify network access

3. **Import Errors**
   - Check file paths in import statements
   - Ensure index.js files exist in component folders
   - Verify component exports

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Linga Seetha Rama Raghavendra**

---

*Last updated: December 2024*

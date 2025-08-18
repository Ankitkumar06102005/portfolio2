# Ankit Kumar Portfolio Backend

A robust, secure, and feature-rich backend API for Ankit Kumar's portfolio website. Built with Node.js, Express, and MongoDB.

## 🚀 Features

### Core Features
- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **Contact Management**: Handle contact form submissions with email notifications
- **Project Management**: Dynamic project portfolio with categories, images, and analytics
- **File Upload**: Image upload with Cloudinary integration and local storage fallback
- **Admin Dashboard**: Comprehensive admin panel with statistics and user management
- **Email System**: Automated email notifications and templates
- **Security**: Rate limiting, input validation, XSS protection, and more

### Technical Features
- **RESTful API**: Well-structured REST endpoints
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Request validation with express-validator
- **Error Handling**: Centralized error handling with custom error responses
- **Logging**: Request logging with Morgan
- **Compression**: Response compression for better performance
- **CORS**: Cross-origin resource sharing configuration
- **Security Headers**: Helmet.js for security headers

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ankit-portfolio-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/ankit-portfolio
   MONGODB_URI_PROD=mongodb+srv://username:password@cluster.mongodb.net/ankit-portfolio

   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRE=30d
   JWT_COOKIE_EXPIRE=30

   # Email Configuration (Gmail)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=ankitsushant9415@gmail.com
   EMAIL_PASS=your-app-specific-password
   EMAIL_FROM=ankitsushant9415@gmail.com

   # Cloudinary Configuration (optional)
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret

   # Frontend URL (for CORS)
   FRONTEND_URL=http://localhost:3000
   FRONTEND_URL_PROD=https://your-domain.com
   ```

4. **Start the server**
   ```bash
   # Development
   npm run dev

   # Production
   npm start
   ```

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Contact Endpoints

#### Submit Contact Form
```http
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'm interested in working with you on a project.",
  "phone": "+1234567890"
}
```

#### Get All Contacts (Admin)
```http
GET /api/contact?page=1&limit=10&status=new
Authorization: Bearer <admin-token>
```

### Project Endpoints

#### Get All Projects (Public)
```http
GET /api/projects?page=1&limit=6&category=web&featured=true
```

#### Get Single Project
```http
GET /api/projects/:id
```

#### Create Project (Admin)
```http
POST /api/projects
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "title": "E-commerce Website",
  "description": "A full-stack e-commerce platform...",
  "technologies": ["React", "Node.js", "MongoDB"],
  "category": "web",
  "liveUrl": "https://example.com",
  "githubUrl": "https://github.com/username/project"
}
```

### Upload Endpoints

#### Upload Single Image (Admin)
```http
POST /api/upload/image
Authorization: Bearer <admin-token>
Content-Type: multipart/form-data

Form Data:
- image: [file]
```

#### Upload Multiple Images (Admin)
```http
POST /api/upload/images
Authorization: Bearer <admin-token>
Content-Type: multipart/form-data

Form Data:
- images: [files]
```

### Admin Endpoints

#### Get Dashboard Overview
```http
GET /api/admin/dashboard
Authorization: Bearer <admin-token>
```

#### Get All Users
```http
GET /api/admin/users?page=1&limit=10&role=admin
Authorization: Bearer <admin-token>
```

#### Get System Statistics
```http
GET /api/admin/stats
Authorization: Bearer <admin-token>
```

## 🔧 Configuration

### Email Setup (Gmail)

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
3. Use the generated password in your `.env` file

### Cloudinary Setup (Optional)

1. Create a Cloudinary account
2. Get your cloud name, API key, and API secret
3. Add them to your `.env` file

### MongoDB Setup

#### Local MongoDB
```bash
# Install MongoDB
# Start MongoDB service
mongod

# Or use Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

#### MongoDB Atlas (Cloud)
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Add it to `MONGODB_URI_PROD` in your `.env` file

## 🚀 Deployment

### Environment Variables for Production

```env
NODE_ENV=production
PORT=5000
MONGODB_URI_PROD=mongodb+srv://username:password@cluster.mongodb.net/ankit-portfolio
JWT_SECRET=your-production-jwt-secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=ankitsushant9415@gmail.com
EMAIL_PASS=your-app-specific-password
FRONTEND_URL_PROD=https://your-domain.com
```

### Deployment Platforms

#### Heroku
```bash
# Install Heroku CLI
heroku create ankit-portfolio-backend
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI_PROD=your-mongodb-uri
heroku config:set JWT_SECRET=your-jwt-secret
git push heroku main
```

#### Vercel
```bash
# Install Vercel CLI
npm i -g vercel
vercel
```

#### DigitalOcean App Platform
1. Connect your GitHub repository
2. Set environment variables
3. Deploy

## 🔒 Security Features

- **Rate Limiting**: Prevents abuse with configurable limits
- **Input Validation**: All inputs are validated and sanitized
- **XSS Protection**: Cross-site scripting protection
- **CORS**: Configurable cross-origin resource sharing
- **Helmet**: Security headers
- **JWT**: Secure token-based authentication
- **Password Hashing**: Bcrypt for password security
- **MongoDB Sanitization**: Prevents NoSQL injection

## 📊 Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (enum: ['admin', 'user']),
  avatar: String,
  isActive: Boolean,
  lastLogin: Date,
  emailVerified: Boolean
}
```

### Contact Model
```javascript
{
  name: String,
  email: String,
  subject: String,
  message: String,
  phone: String,
  status: String (enum: ['new', 'read', 'replied', 'spam']),
  isRead: Boolean,
  ipAddress: String,
  userAgent: String
}
```

### Project Model
```javascript
{
  title: String,
  description: String,
  technologies: [String],
  category: String (enum: ['web', 'mobile', 'desktop', 'ai', 'other']),
  images: [{
    url: String,
    alt: String,
    isMain: Boolean
  }],
  liveUrl: String,
  githubUrl: String,
  isFeatured: Boolean,
  isPublished: Boolean,
  views: Number,
  likes: Number
}
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📝 Scripts

```bash
# Development
npm run dev

# Production
npm start

# Testing
npm test

# Linting
npm run lint

# Format code
npm run format
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Ankit Kumar**
- Email: ankitsushant9415@gmail.com
- LinkedIn: [linkedin.com/in/ankit-kumar-84550725b](https://linkedin.com/in/ankit-kumar-84550725b)
- Instagram: [@_hikinghigh_](https://instagram.com/_hikinghigh_)

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/username/ankit-portfolio-backend/issues) page
2. Create a new issue with detailed information
3. Contact me directly at ankitsushant9415@gmail.com

## 🔄 Updates

Stay updated with the latest changes by:
- Watching the repository
- Following the release notes
- Checking the changelog

---

**Happy Coding! 🚀**

# API Documentation

## Base URL
```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

## Authentication

Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### 🔐 Authentication

#### Register User
```http
POST /auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### Login User
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "avatar": "default-avatar.jpg"
  }
}
```

#### Get Current User
```http
GET /auth/me
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "avatar": "default-avatar.jpg",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Update User Details
```http
PUT /auth/updatedetails
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "John Smith",
  "email": "johnsmith@example.com"
}
```

#### Update Password
```http
PUT /auth/updatepassword
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword123"
}
```

#### Forgot Password
```http
POST /auth/forgotpassword
```

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

#### Reset Password
```http
PUT /auth/resetpassword/:resettoken
```

**Request Body:**
```json
{
  "password": "newpassword123"
}
```

#### Logout
```http
POST /auth/logout
Authorization: Bearer <token>
```

---

### 📧 Contact

#### Submit Contact Form
```http
POST /contact
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'm interested in working with you on a project.",
  "phone": "+1234567890"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for your message! I will get back to you soon.",
  "data": {
    "id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Project Inquiry"
  }
}
```

#### Get All Contacts (Admin Only)
```http
GET /contact?page=1&limit=10&status=new&search=john
Authorization: Bearer <admin-token>
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `status`: Filter by status (new, read, replied, spam)
- `isRead`: Filter by read status (true/false)
- `search`: Search in name, email, or subject

**Response:**
```json
{
  "success": true,
  "count": 5,
  "pagination": {
    "next": {
      "page": 2,
      "limit": 10
    }
  },
  "data": [
    {
      "id": "60f7b3b3b3b3b3b3b3b3b3b3",
      "name": "John Doe",
      "email": "john@example.com",
      "subject": "Project Inquiry",
      "message": "I'm interested in working with you...",
      "status": "new",
      "isRead": false,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "timeAgo": "2 hours ago"
    }
  ]
}
```

#### Get Single Contact (Admin Only)
```http
GET /contact/:id
Authorization: Bearer <admin-token>
```

#### Update Contact Status (Admin Only)
```http
PUT /contact/:id
Authorization: Bearer <admin-token>
```

**Request Body:**
```json
{
  "status": "replied",
  "replyMessage": "Thank you for your inquiry. I'll get back to you soon."
}
```

#### Delete Contact (Admin Only)
```http
DELETE /contact/:id
Authorization: Bearer <admin-token>
```

#### Get Contact Statistics (Admin Only)
```http
GET /contact/stats/overview
Authorization: Bearer <admin-token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "total": 25,
    "unread": 5,
    "newMessages": 3,
    "replied": 15,
    "recent": 8
  }
}
```

---

### 🚀 Projects

#### Get All Projects (Public)
```http
GET /projects?page=1&limit=6&category=web&featured=true&search=react
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 6)
- `category`: Filter by category (web, mobile, desktop, ai, other)
- `featured`: Filter featured projects (true/false)
- `search`: Search in title, description, or technologies
- `tags`: Filter by tags (comma-separated)

**Response:**
```json
{
  "success": true,
  "count": 3,
  "pagination": {
    "next": {
      "page": 2,
      "limit": 6
    }
  },
  "data": [
    {
      "id": "60f7b3b3b3b3b3b3b3b3b3b3",
      "title": "EventLink",
      "description": "A pan-India web-based application...",
      "shortDescription": "Pan-India event collaboration platform",
      "technologies": ["React", "Node.js", "MongoDB"],
      "category": "web",
      "images": [
        {
          "url": "https://example.com/image.jpg",
          "alt": "EventLink Platform",
          "isMain": true
        }
      ],
      "liveUrl": "https://eventlink-demo.com",
      "githubUrl": "https://github.com/ankit-kumar/eventlink",
      "isFeatured": true,
      "isPublished": true,
      "views": 150,
      "likes": 25,
      "tags": ["web", "collaboration", "events"],
      "createdAt": "2024-01-01T00:00:00.000Z",
      "duration": 75,
      "formattedStartDate": "1/1/2024",
      "formattedEndDate": "3/15/2024"
    }
  ]
}
```

#### Get Single Project (Public)
```http
GET /projects/:id
```

#### Create Project (Admin Only)
```http
POST /projects
Authorization: Bearer <admin-token>
```

**Request Body:**
```json
{
  "title": "E-commerce Website",
  "description": "A full-stack e-commerce platform...",
  "shortDescription": "Modern e-commerce solution",
  "technologies": ["React", "Node.js", "MongoDB"],
  "category": "web",
  "images": [
    {
      "url": "https://example.com/image.jpg",
      "alt": "E-commerce Platform",
      "isMain": true
    }
  ],
  "liveUrl": "https://example.com",
  "githubUrl": "https://github.com/username/project",
  "demoUrl": "https://demo.example.com",
  "features": [
    {
      "title": "User Authentication",
      "description": "Secure user login and registration"
    }
  ],
  "challenges": ["Scalability", "Security"],
  "solutions": ["Microservices", "JWT Authentication"],
  "startDate": "2024-01-01",
  "endDate": "2024-03-15",
  "status": "completed",
  "isFeatured": true,
  "isPublished": true,
  "order": 1,
  "tags": ["web", "e-commerce", "fullstack"],
  "client": "Tech Company",
  "teamSize": 3,
  "role": "Full Stack Developer"
}
```

#### Update Project (Admin Only)
```http
PUT /projects/:id
Authorization: Bearer <admin-token>
```

#### Delete Project (Admin Only)
```http
DELETE /projects/:id
Authorization: Bearer <admin-token>
```

#### Get All Projects (Admin Only)
```http
GET /projects/admin/all?page=1&limit=10&isPublished=true&category=web
Authorization: Bearer <admin-token>
```

#### Get Project Statistics (Admin Only)
```http
GET /projects/stats/overview
Authorization: Bearer <admin-token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "total": 10,
    "published": 8,
    "featured": 3,
    "totalViews": 1250,
    "recent": 2,
    "categoryStats": [
      {
        "_id": "web",
        "count": 5
      },
      {
        "_id": "mobile",
        "count": 3
      }
    ]
  }
}
```

#### Like Project (Authenticated Users)
```http
POST /projects/:id/like
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "likes": 26
  }
}
```

---

### 📤 Upload

#### Upload Single Image (Admin Only)
```http
POST /upload/image
Authorization: Bearer <admin-token>
Content-Type: multipart/form-data
```

**Form Data:**
- `image`: Image file (jpeg, jpg, png, gif, webp, svg)

**Response:**
```json
{
  "success": true,
  "data": {
    "url": "https://res.cloudinary.com/cloud-name/image/upload/v1234567890/folder/image.jpg",
    "public_id": "folder/image",
    "width": 1200,
    "height": 800,
    "format": "jpg",
    "size": 150000
  }
}
```

#### Upload Multiple Images (Admin Only)
```http
POST /upload/images
Authorization: Bearer <admin-token>
Content-Type: multipart/form-data
```

**Form Data:**
- `images`: Multiple image files (max 10)

#### Delete Image from Cloudinary (Admin Only)
```http
DELETE /upload/image/:public_id
Authorization: Bearer <admin-token>
```

#### Delete Local Image (Admin Only)
```http
DELETE /upload/local/:filename
Authorization: Bearer <admin-token>
```

#### Get Upload Statistics (Admin Only)
```http
GET /upload/stats
Authorization: Bearer <admin-token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "local": {
      "count": 15,
      "totalSize": 2500000
    },
    "cloudinary": "Configured"
  }
}
```

---

### 👨‍💼 Admin

#### Get Dashboard Overview (Admin Only)
```http
GET /admin/dashboard
Authorization: Bearer <admin-token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "overview": {
      "totalUsers": 5,
      "totalContacts": 25,
      "totalProjects": 10,
      "publishedProjects": 8,
      "unreadMessages": 5,
      "totalViews": 1250
    },
    "recent": {
      "contacts": 8,
      "projects": 2
    },
    "recentContacts": [...],
    "recentProjects": [...],
    "contactStatusStats": [...],
    "projectCategoryStats": [...]
  }
}
```

#### Get All Users (Admin Only)
```http
GET /admin/users?page=1&limit=10&role=admin&isActive=true&search=john
Authorization: Bearer <admin-token>
```

#### Get Single User (Admin Only)
```http
GET /admin/users/:id
Authorization: Bearer <admin-token>
```

#### Update User (Admin Only)
```http
PUT /admin/users/:id
Authorization: Bearer <admin-token>
```

**Request Body:**
```json
{
  "name": "John Smith",
  "email": "johnsmith@example.com",
  "role": "admin",
  "isActive": true
}
```

#### Delete User (Admin Only)
```http
DELETE /admin/users/:id
Authorization: Bearer <admin-token>
```

#### Create User (Admin Only)
```http
POST /admin/users
Authorization: Bearer <admin-token>
```

**Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "password123",
  "role": "user"
}
```

#### Get System Statistics (Admin Only)
```http
GET /admin/stats
Authorization: Bearer <admin-token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "users": {
      "total": 5,
      "active": 4,
      "admins": 1
    },
    "contacts": {
      "total": 25,
      "unread": 5,
      "new": 3
    },
    "projects": {
      "total": 10,
      "published": 8,
      "featured": 3
    },
    "recent": {
      "users": 1,
      "contacts": 8,
      "projects": 2
    },
    "monthlyStats": [
      {
        "month": "Jan 2024",
        "contacts": 5,
        "projects": 1
      }
    ]
  }
}
```

---

### 🏥 Health Check

#### Server Health
```http
GET /health
```

**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "development"
}
```

---

## Error Responses

### Validation Error (400)
```json
{
  "success": false,
  "errors": [
    {
      "type": "field",
      "value": "",
      "msg": "Name is required",
      "path": "name",
      "location": "body"
    }
  ]
}
```

### Authentication Error (401)
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

### Authorization Error (403)
```json
{
  "success": false,
  "message": "User role user is not authorized to access this route"
}
```

### Not Found Error (404)
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### Rate Limit Error (429)
```json
{
  "success": false,
  "message": "Too many requests from this IP, please try again later."
}
```

### Server Error (500)
```json
{
  "success": false,
  "error": "Server Error"
}
```

---

## Rate Limiting

- **General API**: 100 requests per 15 minutes per IP
- **Authentication**: 5 attempts per 15 minutes per IP
- **Contact Form**: 10 submissions per hour per IP

---

## File Upload Limits

- **Single Image**: 5MB
- **Multiple Images**: 10 files, 5MB each
- **Supported Formats**: JPEG, JPG, PNG, GIF, WebP, SVG

---

## Pagination

All list endpoints support pagination with the following parameters:

- `page`: Page number (default: 1)
- `limit`: Items per page (default varies by endpoint)

Response includes pagination metadata:

```json
{
  "pagination": {
    "next": {
      "page": 2,
      "limit": 10
    },
    "prev": {
      "page": 1,
      "limit": 10
    }
  }
}
```

---

## Environment Variables

Make sure to set up the following environment variables:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/ankit-portfolio
MONGODB_URI_PROD=mongodb+srv://username:password@cluster.mongodb.net/ankit-portfolio

# JWT
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=30d

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=ankitsushant9415@gmail.com
EMAIL_PASS=your-app-specific-password

# Cloudinary (optional)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# CORS
FRONTEND_URL=http://localhost:3000
FRONTEND_URL_PROD=https://your-domain.com
```

---

## Testing the API

You can test the API using tools like:

- **Postman**: Import the collection
- **cURL**: Command line testing
- **Thunder Client**: VS Code extension
- **Insomnia**: API testing tool

### Example cURL Commands

#### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### Login User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### Submit Contact Form
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Project Inquiry",
    "message": "I am interested in working with you."
  }'
```

#### Get Projects (with token)
```bash
curl -X GET http://localhost:5000/api/projects \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

For more information, visit the [README.md](README.md) file or contact the developer at ankitsushant9415@gmail.com.

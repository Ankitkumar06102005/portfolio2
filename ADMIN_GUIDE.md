# 🚀 Portfolio Admin Panel Guide

## Prerequisites Installation

### 1. Install Node.js
- Go to [nodejs.org](https://nodejs.org/)
- Download and install the LTS version
- Restart your terminal/PowerShell after installation

### 2. Install MongoDB (Choose one option)

#### Option A: MongoDB Atlas (Recommended - Cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster (free tier)
4. Get your connection string
5. Update `.env` file with your MongoDB URI

#### Option B: MongoDB Local
1. Download MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Install and start MongoDB service

## 🛠️ Setup Instructions

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Environment
1. Copy `env.example` to `.env`
2. Update the `.env` file with your settings:
   ```env
   PORT=5000
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-secret-key
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-email-password
   ```

### Step 3: Initialize Database
```bash
npm run seed
```

### Step 4: Start the Server
```bash
npm run dev
```

## 🔐 Admin Access

### Default Admin Credentials
- **Email:** ankitsushant9415@gmail.com
- **Password:** admin123456

### Login Process
1. **Start the server:** `npm run dev`
2. **Login via API:** Send POST request to `http://localhost:5000/api/auth/login`
3. **Use the JWT token** for admin requests

## 📡 API Endpoints for Admin

### Authentication
```
POST /api/auth/login
Body: {
  "email": "ankitsushant9415@gmail.com",
  "password": "admin123456"
}
```

### Admin Dashboard
```
GET /api/admin/dashboard
Headers: Authorization: Bearer YOUR_JWT_TOKEN
```

### Manage Projects
```
GET    /api/projects/admin/all          # Get all projects
POST   /api/projects                    # Create new project
PUT    /api/projects/:id                # Update project
DELETE /api/projects/:id                # Delete project
```

### Manage Contact Submissions
```
GET    /api/contact                     # Get all contact submissions
GET    /api/contact/:id                 # Get specific submission
PUT    /api/contact/:id                 # Reply to submission
DELETE /api/contact/:id                 # Delete submission
```

### Manage Users
```
GET    /api/admin/users                 # Get all users
POST   /api/admin/users                 # Create new user
PUT    /api/admin/users/:id             # Update user
DELETE /api/admin/users/:id             # Delete user
```

### File Uploads
```
POST   /api/upload/image                # Upload single image
POST   /api/upload/images               # Upload multiple images
DELETE /api/upload/image/:public_id     # Delete image
```

## 🛠️ Testing with Postman

### 1. Login Request
```
Method: POST
URL: http://localhost:5000/api/auth/login
Headers: Content-Type: application/json
Body: {
  "email": "ankitsushant9415@gmail.com",
  "password": "admin123456"
}
```

### 2. Admin Dashboard Request
```
Method: GET
URL: http://localhost:5000/api/admin/dashboard
Headers: 
  Content-Type: application/json
  Authorization: Bearer YOUR_JWT_TOKEN_FROM_LOGIN
```

### 3. Create New Project
```
Method: POST
URL: http://localhost:5000/api/projects
Headers: 
  Content-Type: application/json
  Authorization: Bearer YOUR_JWT_TOKEN
Body: {
  "title": "New Project",
  "description": "Project description",
  "technologies": ["React", "Node.js"],
  "category": "Web Development",
  "liveUrl": "https://example.com",
  "githubUrl": "https://github.com/example",
  "isPublished": true
}
```

## 📱 Alternative: Simple Admin Interface

If you prefer a web interface, you can create a simple HTML admin panel. Here's a quick setup:

### Create `admin.html`
```html
<!DOCTYPE html>
<html>
<head>
    <title>Portfolio Admin</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .container { max-width: 1200px; margin: 0 auto; }
        .login-form, .admin-panel { margin: 20px 0; padding: 20px; border: 1px solid #ccc; }
        .hidden { display: none; }
        button { padding: 10px 20px; margin: 5px; }
        input, textarea { width: 100%; padding: 8px; margin: 5px 0; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Portfolio Admin Panel</h1>
        
        <!-- Login Form -->
        <div id="loginForm" class="login-form">
            <h2>Login</h2>
            <input type="email" id="email" placeholder="Email" value="ankitsushant9415@gmail.com">
            <input type="password" id="password" placeholder="Password" value="admin123456">
            <button onclick="login()">Login</button>
        </div>
        
        <!-- Admin Panel -->
        <div id="adminPanel" class="admin-panel hidden">
            <h2>Admin Dashboard</h2>
            <button onclick="loadDashboard()">Load Dashboard</button>
            <button onclick="loadProjects()">Manage Projects</button>
            <button onclick="loadContacts()">View Contacts</button>
            <div id="content"></div>
        </div>
    </div>

    <script>
        let token = '';
        const API_BASE = 'http://localhost:5000/api';

        async function login() {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            try {
                const response = await fetch(`${API_BASE}/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                
                const data = await response.json();
                if (data.success) {
                    token = data.token;
                    document.getElementById('loginForm').classList.add('hidden');
                    document.getElementById('adminPanel').classList.remove('hidden');
                    loadDashboard();
                } else {
                    alert('Login failed: ' + data.message);
                }
            } catch (error) {
                alert('Error: ' + error.message);
            }
        }

        async function loadDashboard() {
            try {
                const response = await fetch(`${API_BASE}/admin/dashboard`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();
                document.getElementById('content').innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
            } catch (error) {
                alert('Error loading dashboard: ' + error.message);
            }
        }

        async function loadProjects() {
            try {
                const response = await fetch(`${API_BASE}/projects/admin/all`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();
                document.getElementById('content').innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
            } catch (error) {
                alert('Error loading projects: ' + error.message);
            }
        }

        async function loadContacts() {
            try {
                const response = await fetch(`${API_BASE}/contact`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();
                document.getElementById('content').innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
            } catch (error) {
                alert('Error loading contacts: ' + error.message);
            }
        }
    </script>
</body>
</html>
```

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Initialize database with sample data
npm run seed

# Run tests
npm test
```

## 🔧 Troubleshooting

### Common Issues:
1. **Port already in use:** Change PORT in `.env` file
2. **MongoDB connection failed:** Check your MongoDB URI
3. **JWT token expired:** Login again to get a new token
4. **CORS errors:** Make sure frontend URL is correct in `.env`

### Support:
- Check the `README.md` for detailed documentation
- Review `API_DOCUMENTATION.md` for complete API reference
- Ensure all environment variables are properly set

## 🎯 Next Steps

1. Install Node.js and MongoDB
2. Run the setup commands
3. Start the server
4. Use Postman or the HTML admin interface to manage your portfolio
5. Customize the admin interface as needed
6. Deploy to production when ready

Happy Admining! 🎉

# 🚀 Quick Start Guide - Portfolio Admin Panel

## 📋 Prerequisites Checklist

Before starting, make sure you have:

- [ ] **Node.js** installed (Download from [nodejs.org](https://nodejs.org/))
- [ ] **MongoDB** set up (Choose one option below)
- [ ] **Git** (optional, for version control)

## 🗄️ MongoDB Setup (Choose One)

### Option 1: MongoDB Atlas (Recommended - Free Cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster (free tier)
4. Get your connection string
5. Update `.env` file with your MongoDB URI

### Option 2: MongoDB Local
1. Download from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Install and start MongoDB service

## ⚡ Quick Setup Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Environment
1. Copy the environment file:
   ```bash
   copy env.example .env
   ```

2. Edit `.env` file with your settings:
   ```env
   PORT=5000
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-secret-key-here
   ```

### Step 3: Initialize Database
```bash
npm run seed
```

### Step 4: Start the Server
```bash
npm run dev
```

### Step 5: Access Admin Panel
1. Open `admin.html` in your browser
2. Or go to `http://localhost:5000/admin.html`
3. Login with:
   - **Email:** ankitsushant9415@gmail.com
   - **Password:** admin123456

## 🎯 What You Can Do

### ✅ Available Features
- **Dashboard Overview** - View portfolio statistics
- **Manage Projects** - Add, edit, delete projects
- **View Contacts** - See contact form submissions
- **User Management** - Manage admin users
- **File Uploads** - Upload project images

### 🔧 Admin Credentials
- **Email:** ankitsushant9415@gmail.com
- **Password:** admin123456

## 🛠️ Troubleshooting

### Common Issues:

1. **"npm not found"**
   - Install Node.js from [nodejs.org](https://nodejs.org/)

2. **"MongoDB connection failed"**
   - Check your MongoDB URI in `.env`
   - Ensure MongoDB is running

3. **"Port 5000 already in use"**
   - Change PORT in `.env` file to 5001 or another port

4. **"CORS errors"**
   - Make sure frontend URL is correct in `.env`

### Quick Fixes:

```bash
# Kill process on port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Restart server
npm run dev

# Clear npm cache
npm cache clean --force
```

## 📱 Alternative Access Methods

### 1. Web Interface (Recommended)
- Open `admin.html` in your browser
- Most user-friendly option

### 2. Postman/API Testing
- Use the API endpoints directly
- See `API_DOCUMENTATION.md` for details

### 3. Command Line
- Use curl or similar tools
- Good for automation

## 🎉 Success Indicators

You'll know everything is working when:

1. ✅ Server starts without errors
2. ✅ Database connects successfully
3. ✅ Admin panel loads in browser
4. ✅ Login works with provided credentials
5. ✅ Dashboard shows statistics

## 📞 Need Help?

1. Check the `ADMIN_GUIDE.md` for detailed instructions
2. Review `README.md` for backend documentation
3. Check `API_DOCUMENTATION.md` for API details
4. Ensure all environment variables are set correctly

## 🚀 Next Steps

Once everything is working:

1. **Customize your projects** - Add your real projects
2. **Update contact info** - Set up email notifications
3. **Add images** - Upload project screenshots
4. **Deploy** - Move to production server
5. **Secure** - Change default passwords

---

**Happy Admining! 🎉**

Your portfolio backend is now ready to manage your professional presence online!

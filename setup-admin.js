const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Simple admin setup (for testing without database)
const adminUser = {
    name: 'Ankit Kumar',
    email: 'ankitsushant9415@gmail.com',
    password: 'admin123456',
    role: 'admin'
};

// Generate JWT token
const generateToken = (user) => {
    const payload = {
        id: 'admin-user-id',
        email: user.email,
        role: user.role
    };
    
    return jwt.sign(payload, 'your-super-secret-jwt-key-change-this-in-production', {
        expiresIn: '30d'
    });
};

// Hash password
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(12);
    return bcrypt.hash(password, salt);
};

// Setup admin
const setupAdmin = async () => {
    try {
        const hashedPassword = await hashPassword(adminUser.password);
        const token = generateToken(adminUser);
        
        console.log('=== ADMIN SETUP COMPLETE ===');
        console.log('Email:', adminUser.email);
        console.log('Password:', adminUser.password);
        console.log('Role:', adminUser.role);
        console.log('\n=== JWT TOKEN ===');
        console.log(token);
        console.log('\n=== API ENDPOINTS ===');
        console.log('Login: POST http://localhost:5000/api/auth/login');
        console.log('Admin Dashboard: GET http://localhost:5000/api/admin/dashboard');
        console.log('All Projects: GET http://localhost:5000/api/projects/admin/all');
        console.log('All Contacts: GET http://localhost:5000/api/contact');
        console.log('\n=== HEADERS FOR ADMIN REQUESTS ===');
        console.log('Authorization: Bearer ' + token);
        console.log('Content-Type: application/json');
        
    } catch (error) {
        console.error('Setup error:', error);
    }
};

setupAdmin();

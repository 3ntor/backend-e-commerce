const User = require('../models/User');

const createDefaultAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ email: 'admin@admin.com' });

    if (existingAdmin) {
      console.log('✅ Default admin already exists');
      return;
    }

    const admin = new User({
      name: 'admin',
      email: 'admin@admin.com',
      password: 'admin',
      role: 'admin'
    });

    await admin.save();
    console.log('✅ Default admin created');
  } catch (error) {
    console.error('❌ Error creating default admin:', error);
  }
};

module.exports = createDefaultAdmin;

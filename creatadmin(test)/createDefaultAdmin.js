const User = require('../models/User');

const createDefaultAdmin = async () => {
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
};

module.exports = createDefaultAdmin;

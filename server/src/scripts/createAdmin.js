const bcrypt = require('bcryptjs');
const User = require('../models/user');
const sequelize = require('../config/database');

async function createAdmin() {
  try {
    await sequelize.sync();

    const hashedPassword = await bcrypt.hash('admin', 10);

    const [adminUser, created] = await User.findOrCreate({
      where: { email: 'admin@admin.com' },
      defaults: {
        name: 'Admin',
        password: hashedPassword,
        role: 'admin'
      }
    });

    if (!created) {
      adminUser.password = hashedPassword;
      await adminUser.save();
      console.log('Admin user password updated:', adminUser.email);
    } else {
      console.log('Admin user created successfully:', adminUser.email);
    }

    process.exit(0);
  } catch (error) {
    console.error('Error managing admin user:', error);
    process.exit(1);
  }
}

createAdmin();

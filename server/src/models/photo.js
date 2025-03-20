const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = require('./user');

const Photo = sequelize.define('Photo', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  travelDays: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  recommendation: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending'
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  }
});

Photo.belongsTo(User, { foreignKey: 'userId' });

module.exports = Photo;

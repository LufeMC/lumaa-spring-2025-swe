const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL); 
const bcrypt = require('bcrypt');

const User = sequelize.define('users', 
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // has to be unique 
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, // cant be null
    },
  },
  {
    freezeTableName: true, 
    timestamps: true, 
    updatedAt: false, 
    createdAt: 'created_at',
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  }
);

module.exports = User;

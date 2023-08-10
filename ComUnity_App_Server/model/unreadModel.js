const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

const userSchema = new mongoose.Schema({
  user: String,
  unreadMessage: [
    {
      chatId: String,
      unreadMessage: { type: Number, default: 0 }
    }
  ],
}, {
  timestamps: true
});

// Creating and exporting model
const User = mongoose.model('Unread', userSchema);
module.exports = User;

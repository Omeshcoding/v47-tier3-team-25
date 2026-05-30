import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      default: null,
    },

    role: {
      type: String,
      enum: ['admin', 'customer', 'dealer'],
      default: 'customer',
    },

    provider: {
      type: String,
      enum: ['credentials', 'google'],
      default: 'credentials',
    },

    googleId: {
      type: String,
      default: null,
    },

    image: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

export default mongoose.models.users || mongoose.model('users', userSchema);

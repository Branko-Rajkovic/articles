const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required.'],
    trim: true,
    maxLength: [100, 'Name can have maximum 100 characters.'],
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    trim: true,
    unique: true,
    maxLength: [200, 'Email can have maximum 200 characters.'],
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: { type: String, default: '' },
  password: {
    type: String,
    required: [true, 'Please provide a valid password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm the password.'],
    validate: {
      //it validates only on saving and creating
      validator: function (el) {
        return el === this.password;
      },
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 8);

  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  inputPassword,
  userPassword
) {
  return await bcrypt.compare(inputPassword, userPassword);
};

userSchema.methods.updatedAccount = function (JWTTimestamp) {
  console.log(this.updatedAt, JWTTimestamp);
  if (this.updatedAt && parseInt(this.updatedAt.getTime()) > JWTTimestamp)
    return true;
  return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;

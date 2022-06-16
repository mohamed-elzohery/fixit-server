const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const { isEmail, isMobilePhone } = require('validator');

const userSchema = new Schema(
  {
    email: {
      type: String,
      validate: {
        validator: isEmail,
        message: 'Enter a valid email',
      },
      unique: true,
      required: [true, 'Email is required'],
    },
    password: {
      type: String,
      required: [true, 'password is required'],
      minlength: [8, 'Password is at least 8 charater'],
    },
    username: {
      type: String,
      match: [/^[^0-9][a-zA-Z0-9_]+$/, "Invalid username"],
      required: [true, 'username is required'],
    },
    role: {
      type: String,
      enum: ['user', 'freelancer', 'admin'],
      default: 'user'
    },
    address: {
        type: String,
        required: [true, 'address is requried'],
        maxlength: [150, "address shouldn't exceed 150 chars long"],
        minlength: [10, "address shouldn't be less than 10 chars long"],
    },
    phone: {
        type: String,
        required: [true, 'Phone is requried'],
        validate: {
            validator: isMobilePhone,
            message: 'Enter valid phone number'
        }
    }
  },
  { timestamps: true }
);

// Hash password
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  next();
});

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.createToken = function () {
    console.log(process.env.JWT_AGE)
  return jwt.sign({ id: this._id, email: this.email }, process.env.JWT_KEY, {
    expiresIn: +process.env.JWT_AGE / 1000,
  });
};

const userModel = model('users', userSchema);

module.exports = userModel;
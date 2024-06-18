const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      min: 6,
      max: 255,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      trim: true,
      match: [/.+\@.+\..+/, "Please provide a valid email address"],
      min: 6,
      max: 255,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      min: [6, "Password must be at least 6 characters long"],
      max: 125,
    },
    phone: {
      type: String,
      required: [true, "Please provide a phone number"],
      default: "+94",
      min: [10, "Phone number must be at least 10 characters long"],
      max: 13,
    },
    username: {
      type: String,
      //  required: [true, "Please provide a username"],
      min: 6,
      max: 255,
    },
    photo: {
      type: String,
      required: [true, "Please provide a photo"],
      default: "empty-profile.png",
    },
  },
  { timestamps: true }
);

// hash the password
UserSchema.pre("save", async function (next) {
  // hash the password only if it has been modified (or is new)
  if (!this.isModified("password")) {
    next();
  }

  //hashedpassword
  const salt = await bycrypt.genSalt(10);
  const hashedPassword = await bycrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

const User = mongoose.model("User", UserSchema);
module.exports = User;

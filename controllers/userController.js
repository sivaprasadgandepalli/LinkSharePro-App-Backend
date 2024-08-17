const userModel = require("../models/user");
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.G_MAIL,
    pass: process.env.APP_PASSWORD
  }
});

async function handleUserRegister(req, res) {
  const { email, password } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    await userModel.create({ email, password: hashedPassword });

    const mailOptions = {
      from: process.env.G_MAIL,
      to: email,
      subject: 'Welcome to LinkSharePRO Service. Your Account is Successfully Created.',
      html: `
        <p>Dear User,</p>
        <h3>Welcome to LinkSharePRO!</h3>
        <p>We are thrilled to have you on board. Your account has been successfully created. You are now a part of our community dedicated to sharing links.</p>
        <p>Best regards,</p>
        <p>The LinkSharePRO team.</p>
      `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    return res.status(201).json({ message: "User account created successfully!" });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function hashPassword(password) {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw error;
  }
}

async function handleUserLogin(req, res) {
  try {
    const token = req.token;
    const userData = req.userData;
    return res.status(200).json({ token, message: "Logged in successfully!", user: userData });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function handleUpdateProfile(req, res) {

  try {
    const updates = {};
    if (req.body.firstName) {
      updates.firstName = req.body.firstName;
    }
    if (req.body.lastName) {
      updates.lastName = req.body.lastName;
    }
    if (req.body.profileImage) {
      updates.profileImage = req.body.profileImage;
    }
    if (req.body.newEmail) {
      updates.newEmail = req.body.newEmail;
    }
    const id = req.body.id;
    console.log(req.body);
    const updatedUser = await userModel.findOneAndUpdate(
      { _id: id },
      { $set: updates },
      { new: true }
    );

    console.log('Profile updated');
    return res.status(200).json({ _id: updatedUser._id, firstName: updatedUser.firstName, lastName: updatedUser.lastName, email: updatedUser.email });
  } catch (error) {
    console.error('Error updating profile:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  handleUserRegister,
  handleUserLogin,
  handleUpdateProfile,
};

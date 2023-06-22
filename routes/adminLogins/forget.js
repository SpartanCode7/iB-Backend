const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const nodemailer = require('nodemailer')
const { v4: uuidv4 } = require('uuid')

const app = express()
app.use(bodyParser.json())

// Create a temporary storage for password reset tokens
const passwordResetTokens = {}

// Endpoint for handling the forgot password request
router.post('/admin/forget-password', (req, res) => {
  const { email } = req.body

  // Validate the email address
  const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)

  if (!isValidEmail) {
    return res.status(400).json({ message: 'Invalid email address' })
  }

  // Generate a password reset token
  const token = uuidv4()
  passwordResetTokens[email] = token

  // Send the password reset email
  const transporter = nodemailer.createTransport({
    // Configure your email provider here
    // For example, using Gmail SMTP:
    service: 'Gmail',
    auth: {
      user: 'codewithpassion7@gmail.com',
      pass: 'Cxcspartan@143',
    },
  })

  const mailOptions = {
    from: 'codewithpassion7@gmail.com',
    to: email,
    subject: 'Password Reset',
    text: `Click the following link to reset your password: http://localhost:3000/reset-password?token=${token}`,
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
      return res.status(500).json({ message: 'Failed to send password reset email' })
    }

    console.log('Password reset email sent:', info.response)
    res.status(200).json({ message: 'Password reset email sent successfully' })
  })
})

// Endpoint for handling the password reset
router.post('/admin/reset-password', (req, res) => {
  const { email, token, newPassword } = req.body

  // Verify the password reset token
  if (!passwordResetTokens[email] || passwordResetTokens[email] !== token) {
    return res.status(400).json({ message: 'Invalid password reset token' })
  }

  // Update the password with the new one
  // Your code for updating the password goes here

  // Remove the used password reset token
  delete passwordResetTokens[email]

  return res.status(200).json({ message: 'Password reset successful' })
})

module.exports = router
const nodemailer = require("nodemailer");
const cron = require("node-cron");

function sendReminderEmail (userEmail, reservationDate) {
  // Create a nodemailer transporter
  const transporter = nodemailer.createTransport({
    // Configure your email service
    // Example for Gmail
    service: "gmail",
    auth: {
      user: "forcoworkingreservation@gmail.com",
      pass: "forCoworkingReservation123",
    },
  });

  // Email content
  const mailOptions = {
    from: "forcoworkingreservation@gmail.com",
    to: userEmail,
    subject: "Coworking Reservation Reminder",
    text: `This is a reminder for your coworking reservation scheduled for ${reservationDate}.`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending reminder email:", error);
    } else {
      console.log("Reminder email sent:", info.response);
    }
  });
};

// Function to schedule reminder
exports.scheduleReminder = (userEmail, reservationDate) => {
  // Calculate the reminder date (1 day before reservation date)
  const reminderDate = new Date(reservationDate);
  reminderDate.setDate(reminderDate.getDate() - 1);

  // Schedule reminder using node-cron
  cron.schedule(`0 9 * * *`, () => {
    // Schedule reminder every day at 9:00 AM
    const currentDate = new Date();
    if (currentDate.toDateString() === reminderDate.toDateString()) {
      sendReminderEmail(userEmail, reservationDate);
    }
  });
};

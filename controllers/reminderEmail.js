const nodemailer = require("nodemailer");
const cron = require("node-cron");

const CoworkingSpace = require("../models/CoworkingSpace");
const User = require("../models/User");

async function sendReminderEmail(userEmail, reservationDetail) {
  const coworkingSpace = await CoworkingSpace.findById(
    reservationDetail.coworkingSpace
  );
  const user = await User.findById(reservationDetail.user);
  const reservationDate = reservationDetail.reserveDate;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "forcoworkingreservation@gmail.com",
      pass: "aqzv yuws xzpz voaz",
    },
  });

  const mailOptions = {
    from: "forcoworkingreservation@gmail.com",
    to: userEmail,
    subject: "Coworkingspace's Reservation Reminder",
    text: `Dear ${user.name}
    This is a reminder for your coworking reservation scheduled at ${coworkingSpace.name} on ${reservationDate}
    number of rooms: ${reservationDetail.numberOfRoom} 
    address: ${coworkingSpace.address} 
    open time - close time: ${coworkingSpace.openTime} - ${coworkingSpace.closeTime} 
    for contact: ${coworkingSpace.telephone}
    Best regards,
    My sugar`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending reminder email:", error);
    } else {
      console.log("Reminder email sent:", info.response);
    }
  });
}

exports.scheduleReminder = (userEmail, reservationDetail) => {
  const currentDate = new Date();
  const reminderDate = new Date(reservationDetail.reserveDate);

  reminderDate.setDate(reminderDate.getDate() - 1);

  //If less than 1 day, send remainder email now
  if (reminderDate < currentDate) {
    sendReminderEmail(userEmail, reservationDetail);
  } else {
    cron.schedule('0 0 * * *', () => {
      const currentDate = new Date();
      if (currentDate === reminderDate) {
        sendReminderEmail(userEmail, reservationDetail);
      }
    });
  }
};

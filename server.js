/** @format */

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
//Load env vars
dotenv.config({ path: './config/config.env' });
//Connect to database
connectDB();
//Route files
const coworkingSpaces = require('./routes/coworkingSpace');
const reservations = require('./routes/reservation');
const auth = require('./routes/auth');

const app = express();

//Body parser
app.use(express.json());

//Mount routers
app.use('/api/v1/coworkingSpaces', coworkingSpaces);
app.use('/api/v1/reservations', reservations);
app.use('/api/v1/auth', auth);

const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(
    'Server running in ',
    process.env.NODE_ENV,
    ' mode on port ',
    PORT
  )
);

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  //Close server & exit process
  server.close(() => process.exit(1));
});

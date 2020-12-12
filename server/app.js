const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const loginSignupRoutes = require('./routes/loginSignupRoutes')
const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')
const itemRoutes = require('./routes/itemRoutes')
const commentRoutes = require('./routes/commentRoutes')
// const cors = require('cors')
const morgan = require('morgan')

const app = express();

// middleware
// const whitelist = ['http://localhost:3000', 'http://localhost:3001', 'https://csc309-fab.herokuapp.com']
// const corsOptions = {
//   origin: function (origin, callback) {
//     console.log("** Origin of request " + origin)
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       console.log("Origin acceptable")
//       callback(null, true)
//     } else {
//       console.log("Origin rejected")
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
// app.use(cors(corsOptions))

// app.use(cors());
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('tiny'))
// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require("body-parser");
app.use(bodyParser.json());


// database connection
const dbURI = 'mongodb+srv://developer:dev123@cluster0.8ofdo.mongodb.net/fab';
// mongoose.connect(dbURI || process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
//   .then(() => app.listen(process.env.PORT || 3001))
//   .catch((err) => console.log(err));
mongoose.connect(dbURI || process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })

mongoose.connection.on('connected', () => {
  console.log('connected')
})

// routes

app.use(loginSignupRoutes);
app.use('/api', userRoutes);
app.use('/api', postRoutes);
app.use('/api', itemRoutes);
app.use('/api', commentRoutes);
app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../client/build', 'index.html')));

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.resolve(__dirname, '../client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}

const PORT = process.env.PORT || 3001
app.listen(PORT, console.log(`listening ${PORT}`));
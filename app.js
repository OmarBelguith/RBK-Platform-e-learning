const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const config = require('config');
const morgan = require('morgan');


// setting the environment, we've set it's settings in the .env.<env name> file
// require('custom-env').env('dev')
app.use(morgan('combined'));
// Normal express config defaults
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('./routes'));
// app.use(require('./Services'))

// Connecting to database
mongoose.connect(process.env.MONGODB_URI || config.get('MONGODB_URI'), {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
// Bind connection to error event (to get notification of connection errors)
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.once('open', console.info.bind(console, 'Connected to MongoDB'));

// finally, let's start our server...
const server = app.listen(process.env.PORT || 3000, function (req, res) {
  console.log('Listening on port ' + server.address().port);
});

process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected on app termination');
    process.exit(0);
  });
});

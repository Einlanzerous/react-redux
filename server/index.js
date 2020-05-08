const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const router = require('./router');
const { username, password } = require('./creds');
const mongoDBUrl = `ds027748.mlab.com:27748/auth_server`;

// DB Setup
console.log('Logging into MongoDB as', username, 'via local credentials');
mongoose.connect(
  `mongodb://${username}:${password}@${mongoDBUrl}`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// App Setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log(`Server listening on port ${port}`);

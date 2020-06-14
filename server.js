const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect database
connectDB(); //just call the function

// init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello');
});

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 5000;
// process.env.PORT because we wanna to deploy to heroku, this will look for an environment
// variable called PORT

// if dont have environment variable set, will to look to 5000 port, this var is for heroku

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
// callback, a function that call yourself

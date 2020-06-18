const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Connect database
connectDB(); //just call the function

// init middleware, like th eold body parser
app.use(express.json({ extended: false }));

// app.get('/', (req, res) => {
//   res.send('Hello');
// });

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  // set specific folder to the our public folder or static folder
  app.use(express.static('client/build'));
  // set index.html to be our static file

  // Server that index.html file
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
// process.env.PORT because we wanna to deploy to heroku, this will look for an environment
// heroku will look to process.env.PORT
// variable called PORT

// if dont have environment variable set, will to look to 5000 port, this var is for heroku

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
// callback, a function that call yourself

// preparing for deploy in heroku, we could build with npm build and push that
// or we could build it on the server using post build script - we used that
// and that will do it on the server

// heroku-postbuild will run post build after push

// to do that, 1 - set de prod env to false
// this is because we cant run react build script, with production is true
// it'will be pushed put back to production afterwards

// 2 - install the depedendecies on the client side because we're not pushing node_modules

// 3 - npm run build on the server

// now take care for our server.js
// because its not setup to server that build to the index.html

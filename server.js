const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello');
});

const PORT = process.env.PORT || 5000;
// process.env.PORT because we wanna to deploy to heroku, this will look for an environment
// variable called PORT

// if dont have environment variable set, will to look to 5000 port, this var is for heroku

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
// callback, a function that call yourself

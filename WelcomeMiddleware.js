const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});

const welComeMiddleware = (req, res, next) => {
    console.log('Welcome to my website');
    next();
}

app.use(welComeMiddleware);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

const express = require('express');

const app = express();
const books = []; // array of book objects acting as storage

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const checkAdmin = (req, res, next) => {
    console.log(req.query)
    if(req.query.admin === 'true'){
        next();
    } else{
        res.status(400).send('Should be admin');
    }
}

//Routes
app.get('/', (req,res) => {
    res.send(`Welcome to BookHub!`);
});

app.post('/cart/add', checkAdmin, (req,res) => {
    console.log(req.body)
    if(req.body.book!=undefined){
        books.push(req.body.book)
        res.send(`Book added New List- ${books}`);
    }
    else{
        res.send('Failed to add Book');
    }
});

app.delete('/cart/remove', checkAdmin, (req,res)=>{
    res.send(`All Book List removed Succesfully`)
})

app.delete('/cart/remove/:id', checkAdmin, (req,res)=>{
    const id = req.params.id;
    const currentBook = books[id]
    if(currentBook != undefined){
        books.splice(id, 1);
        res.send(`Book Removed New List- ${books}`);
    }
    else{
        res.send(`Book with the ${id} is not found`)
    }
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

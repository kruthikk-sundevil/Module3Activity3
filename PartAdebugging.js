const express = require('express');

const app = express();
const students = []; // array of students objects acting as storage

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const getSpecificStudent = (req, res) => {
    const id = req.params.id;

    const currentStudent = students[id]
    res.send(`Student with the ${id} is ${currentStudent.fname} ${currentStudent.mname} ${currentStudent.lname}`);
}

const getStudents = (req, res) => {
    res.send(students);
}
const addStudent = (req, res) => {
    const student = req.body;
    students.push(student);
    res.send(`Student with the name ${student.fname} ${student.mname} ${student.lname} added to the database`);
}

const updateStudent = (req, res) => {
    const id = req.params.id;
    const student = req.body;
    students[id] = student;
    res.send(`Student with the id ${id} has been updated`);
}

const deleteStudent = (req, res) => {
    const id = req.params.id;
    const student = students[id];
    student.splice(id, 1);
    res.send(`Student with the id ${id} has been deleted`);
}

//  routes handlers CRUD interfaces
//  for every request, we have a response
app.get('/students/:id', getSpecificStudent); // get all students functions

app.get('/students', getStudents); // get all students functions
app.post('/students', addStudent); // add student function

app.put('/students/:id', updateStudent); //update student function
app.delete('/students/:id', deleteStudent); //delete student function

app.use('/', function(req, res, next) {
    console.log('Request Url:' + req.url);
    res.send('Hello');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

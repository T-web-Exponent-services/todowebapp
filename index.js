
const mongoose=require('mongoose');
const users=require('./routes/users');
const login=require('./routes/login');
const lists=require('./routes/lists');
const express=require('express');
const app=express();

mongoose.connect('mongodb://localhost/todo')
    .then(()=> console.log('Connected to MongoDb...'))
    .catch(err =>console.log('Could not connect to MongoDB'))



app.use(express.json());
app.use('/api/users',users);
app.use('/api/login',login);
app.use('/api/lists',lists);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
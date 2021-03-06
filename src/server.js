'use strict';
const express=require('express');
const errorHandler = require('../src/error-handlers/500');
const notFoundHandler = require('../src/error-handlers/404.js');
const logger = require('../src/middlewares/logger');
const validatror =require('../src/middlewares/validator');
const app=express();

// Global Middleware
app.use(logger);
app.use(express.json());

app.get('/person',validatror,(req,res)=>{
    const person =req.query.name;
    res.json({name:person});
})

app.get('/',(req,res)=>{
    res.status(200).send('Welcom to Our Home Page');
})
app.get('/info',(req,res)=>{
    res.status(200).json({
        name:'Mohammad Alazzam',
        age:27
    });
})



app.get('/bad-request', (req,res)=> {
    throw new Error('manual error');
});

app.get('/bad-request-2', (req,res)=> {
    let arr;
    arr.push(2);
});

function start(port){
    app.listen(port,()=>console.log('Server Connect at PORT'+port));
}

// Handlers -> Middlewares
app.use('*', notFoundHandler);
app.use(errorHandler);
// Modularity 
 
module.exports={
    app:app,
    start:start
}
// I  forget and did the mearge in local this is a pull request 
// for the sake of lab02 grading 

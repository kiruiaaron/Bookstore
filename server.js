const express = require('express');
const app=express();
require('dotenv').config();
const path = require('path')



const BookRouter = require('./src/routes/BooksRoutes')
const MemberRouter = require('./src/routes/MemberRoute')
const LoanRouter = require('./src/routes/LoanRoute')

app.get('/',(req,res)=>{
    res.send('Bookstore')
})


const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`server running at port ${PORT}`))


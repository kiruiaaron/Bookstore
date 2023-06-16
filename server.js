const express = require('express');
const app=express();
const path = require('path')
require('dotenv').config();

app.use(express.json())
const BookRouter = require('./src/routes/BooksRoutes')
const MemberRouter = require('./src/routes/MemberRoute')
const LoanRouter = require('./src/routes/LoanRoute.js')

app.get('/',(req,res)=>{
    res.send('Bookstore')
})
app.use(LoanRouter)

const PORT = process.env.PORT ||5000;

app.listen(PORT,()=>console.log(`server running at port ${PORT}`))


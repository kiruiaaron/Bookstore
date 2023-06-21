const express = require('express')
const {
    connectToDatabase,
    getMember, getMemberId,
    createNewMember,
    getMembersWithBorrowedBook,
    loginMember
} = require('../controllers/MemberController');
const newUserMiddleware = require('../middlewares/newUserMiddleware');

const MemberRouter = express.Router();

MemberRouter.get('/', connectToDatabase)
MemberRouter.get('/members', getMember)
MemberRouter.get('/members/:id', getMemberId)
MemberRouter.get('/loan', getMembersWithBorrowedBook)
MemberRouter.post('/newmember',newUserMiddleware, createNewMember)

MemberRouter.post('/login',loginMember)

module.exports = MemberRouter;

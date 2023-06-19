const express = require('express')
const {
    connectToDatabase,
    getMember, getMemberId,
    createNewMember,
    getMembersWithBorrowedBook,
    loginMember
} = require('../controllers/MemberController')

const MemberRouter = express.Router();

MemberRouter.get('/', connectToDatabase)
MemberRouter.get('/members', getMember)
MemberRouter.get('/members/:id', getMemberId)
MemberRouter.get('/loan', getMembersWithBorrowedBook)
MemberRouter.post('/newmember', createNewMember)

MemberRouter.get('/login',loginMember)

module.exports = { MemberRouter };

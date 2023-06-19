const mssql = require('mssql');
const config = require('../config/config');
const bcrypt = require('bcrypt');


async function connectToDatabase() {
    try {
        await mssql.connect(config);
        console.log('Database connection successful');
    } catch (error) {
        console.error('Database connection error:', error);
        console.error('Stack trace:', error.stack);
    }
}

async function getMember(req, res) {
    let sql = await mssql.connect(config)
    if (sql.connect) {
        let result = await sql.query("SELECT * FROM MEMBERS")
        res.status(400).json({
            success: "true",
            message: "All members",
            result: result.recordset
        })
    }
}
//get a member by id
async function getMemberId(req, res) {
    let sql = await mssql.connect(config)
    if (sql.connect) {
        const { id } = req.params
        let result = await sql.request()
            .input('id', Number(id))
            .execute('select_member_id');
        res.status(400).json({
            success: "true",
            message: "Member",
            result: result.recordset
        })
    }
}

// Authenticate email and password
async function loginMember(req, res) {
    let sql = await mssql.connect(config)
    if (sql.connect) {
        const { EmailAddress, Password } = req.body
        let result = await sql.request()
            .input('EmailAddress', EmailAddress)
            .execute('select_member_Email')
        let user = result.recordset[0]
        if (user) {
            let password_match = await bcrypt.compare(Password,user.Password)
            password_match ? res.status(200).json({ success: "true", message: "Login Successful" })
                 : res.status(404).json({
                     success: "false",
                     message: "Authentication failed !!"
                 })
        } else {
            res.status(404).json({
                success: "false",
                message: "no result"
            })
        }


    } else {
        res.status(404).json({
            success: "false",
            message: "Internal Server problem "
        })
    }
}




async function createNewMember(req, res) {
    const sql = await mssql.connect(config);
    if (sql.connected) {
        const { Name, EmailAddress, Password } = req.body;

        const hashedPassword = await bcrypt.hash(Password, 8)

        const result = await sql.request()
            .input('Name', Name)
            .input('EmailAddress', EmailAddress)
            .input('Password', hashedPassword)
            .execute('add_New_Member');

        res.status(200).json({
            success: true,
            message: 'New member added',
        });
    }
}


async function getMembersWithBorrowedBook(req, res) {
    let sql = await mssql.connect(config)
    if (sql.connect) {
        let result = await sql.request()
            .execute('getMembersWithBorrowedBook')

        res.status(200).json({
            success: 'true',
            message: 'Members with borrowed books',
            result: result.recordset
        })
    } else {
        res.status(200).json({
            success: 'false',
            message: 'Failed to fetch members with borrowed books',

        })
    }
}



module.exports = {
    connectToDatabase,
    getMember,
    getMemberId,
    createNewMember,
    getMembersWithBorrowedBook,
    loginMember
};

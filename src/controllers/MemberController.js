const mssql = require('mssql');
const config = require('../config/config');
const bcrypt = require('bcrypt');
const { tokenGenerator } = require("../utils/token");
const { newUserValidator } = require('../validations/newUserValidaator');


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
        let result = await sql.query("SELECT * FROM Members")
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
        const { Email, Password } = req.body
        let result = await sql.request()
            .input('Email', Email)
            .execute('select_member_Email')
        let user = result.recordset[0]
        if (user) {
            let password_match = await bcrypt.compare(Password,user.Password)
            if(password_match ){
                let token = await tokenGenerator({
                    Email: user.Email
                })
    
             res.status(200).json({ success: "true", message: "Login Successful",token })
            }else{res.status(404).json({
                     success: "false",
                     message: "Authentication failed !!"
                 })
                } 
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
    try {
        const sql = await mssql.connect(config);
        if (sql.connected) {
            //const { Name,Address,ContactNumber, Email, Password } = req.body;
            let {value} = req;
            const hashedPassword = await bcrypt.hash(Password, 8)
    
            const result = await sql.request()
                .input('Name', value.Name)
                .input('Address',value.Address)
                .input('ContactNumber',value.ContactNumber)
                .input('Email',value.Email)
                .input('Password', hashedPassword)
                .execute('add_New_Member');
    
            res.status(200).json({
                success: true,
                message: 'New member added',
                result:result.recordset
            });
        }
    } catch (error) {
        
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

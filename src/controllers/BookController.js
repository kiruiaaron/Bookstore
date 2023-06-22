const mssql = require("mssql");
const config = require("../config/config");

const {tokenVerifier} = require('../utils/token');

// create a new book



// get a book by BookID 
async function fetchBookById(req, res) {
    let sql = await mssql.connect(config);
    const { id } = req.params;
    if (sql.connected) {
      let result = await sql.query(
        `SELECT * FROM library_management_system.Books WHERE BookID = ${id}`
      );
      console.log(result);
      res.json({
        success: true,
        message: "fetched the book successfully",
        data: result.recordset,
      });
    } catch (error) {
        console.log(error.message);

        if(error.message.includes('token')|| error.message.includes('invalid')){
        res.status(403).json({
          success: false,
          message:'Log in again'
        })
        }
    }
   
  }
}

// list all available books
// list all available books

// list all available books
// async function allAvailableBooks(req, res) {
//   let sql = await mssql.connect(config);
//   let token = req.headers['authorization'].split(" ")[1]
//   if (sql.connected) {
//     let result = await sql.query("SELECT * FROM Books");
//     console.log(result);
//     res.json({
//       success: true,
//       message: "listed all available books ok",
//       data: result.recordset,
//     });
//   }
// }

// list all available books
// list all available books

// list all available books
    async function allAvailableBooks(req, res) {
    let sql = await mssql.connect(config);
    
    if (sql.connected) {
        let result = await sql.query("SELECT * FROM library_management_system.Books");
        console.log(result);
        res.json({
            success: true,
            message: "listed all available books ok",
            data: result.recordset,
        });
    }
}

module.exports = {
    allAvailableBooks,
    fetchBookById,
};

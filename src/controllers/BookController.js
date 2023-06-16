const mssql = require('mssql');
const config=require('../config/config')

// create a new book



// get a book by id or ISBN
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
    }
  }


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
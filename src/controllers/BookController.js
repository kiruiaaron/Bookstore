const mssql = require("mssql");
const config = require("../config/config");

const {tokenVerifier} = require('../utils/token');

// create a new book
async function createBook(req, res) {
  try {
    const sql = await mssql.connect(config);
    if (sql.connected) {
      const { Title, Athor, PublicationYear, Status } = req.body;
      let results = await sql
        .request()
        .input("Title", Title)
        .input("Athor", Athor)
        .input("PublicationYear", PublicationYear)
        .input("Status", Status)
        .execute("createNewBook"); // name of stored procedure

      res.status(201).json({
        status: true,
        message: "Book created successfully",
        books: results.recordset,
      });
    } else {
      res.status(400).json({
        status: false,
        message: "Failed",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Failed to create Book",
      error: error.message,
    });
  }
}


// get a book by id or ISBN
async function fetchBookById(req, res) {
  let sql = await mssql.connect(config);
  const { id } = req.params;
  if (sql.connected) {
    try {
      let result = await sql.query(`SELECT * FROM Books WHERE BookID = ${id}`);
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
      try {
         
          let result = await sql.query("SELECT * FROM Books");
          console.log(result);
          res.json({
              success: true,
              message: "listed all available books ok",
              data: result.recordset,
          });

         
      } catch (error) {
        console.log(error.message);

      }

    }
}

module.exports = {
  allAvailableBooks,
  fetchBookById,
  createBook
};

const mssql = require('mssql')
const config=require('../config/config')
console.log(config)

// end point to get all loans
async function getLoans(req,res){
  const sql = await mssql.connect(config)
  if(sql.connected){
    let results=await  sql.query(`SELECT * FROM dbo.Loans`)
    let products = results.recordset;
    res.json({
     success:true,
     message: "fetched products successfully",
     results:products
    })
  }else{
     res.status(500).send("internal server error")
  }
   
 }

 

 // end point to borrow a book
    async function borrowBook(req,res){
      const sql = await mssql.connect(config)

     if(sql.connected){
      const { BookID, MemberID } = req.body;

  // Update the book status in the database
  const updateBookQuery = `UPDATE Books SET Status = 'Loaned' WHERE BookID = ${ BookID}`;
  sql.query(updateBookQuery, (error, results) => {
    if (error) {
      console.error('Error updating book status:', error);
      res.status(500).json({ message: 'Failed to borrow the book.' });
      return;
    }



    // Record the borrowing user in the database
    const recordBorrowerQuery = `UPDATE  Loans SET BookID =${BookID} WHERE MemberID = ${ MemberID}`;
    sql.query(recordBorrowerQuery, (err, result) => {
      if (err) {
        console.error('Error recording borrower:', err);
        res.status(500).json({ message: 'Failed to borrow the book.' });
        return;
      }

      // Send a response indicating the book has been borrowed successfully
      res.status(200).json({ message: 'Book borrowed successfully.' ,
                              });
    });
  });
};

  }
  
 
// endpoint to return a book
async function ReturnBook(req,res){
  const sql = await mssql.connect(config)

 if(sql.connected){
 const {  BookID } = req.body;

 // Update the book status in the database
 const updateBookQuery = `UPDATE Books SET Status = 'Available' WHERE BookID = ${ BookID}`;
 sql.query(updateBookQuery, (error, results) => {
   if (error) {
     console.error('Error updating book status:', error);
     res.status(500).json({ message: 'Failed to return the book.' });
     return;
   }

   res.status(200).json({ message: 'Book returned successfully.' ,
                            results:results});
 });
}
}


module.exports = {getLoans, borrowBook,ReturnBook}





function findAuthorById(authors, id) {
  let found = {};
  found = authors.find((author) => author.id === id);
  return found;
}

function findBookById(books, id) {
  let found = {};
  found = books.find((book) => book.id === id);
  return found;
}

function partitionBooksByBorrowedStatus(books) {
  const trueArr = [];
  const falseArr = [];
  const combinedArr = [];
  
  for (let bookKey of books) {
    if (!bookKey.borrows[0].returned) {
      falseArr.push(bookKey);
    } else {
      trueArr.push(bookKey);
    }
  }
  combinedArr.push(falseArr, trueArr);
  return combinedArr;
}


function getBorrowersForBook(book, accounts) {
  let finalArray = [];
  let bookBorrow = book.borrows;
  for (let i = 0 ; i <bookBorrow.length; i++) {
    let user = accounts.find(user => user.id === bookBorrow[i].id);  
    let borrowObject = {...bookBorrow[i],...user};
    finalArray.push(borrowObject);
  }
  return finalArray.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};

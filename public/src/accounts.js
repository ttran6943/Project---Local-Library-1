function findAccountById(accounts, id) {
    let found = [];
    found = accounts.find((account) => account.id === id);
    return found;
}

function sortAccountsByLastName(accounts) {
  let byLastName = [];
  byLastName = accounts.sort((userA, userB) => userA.name.last.toLowerCase() > userB.name.last.toLowerCase() ? 1 : -1);
  return byLastName;
}

function getTotalNumberOfBorrows({id}, books) {
  let booksBorrowed = 0
   for (bookKey of books) {
   for (user of bookKey.borrows){
     if (user.id === id) {
        booksBorrowed++;
     }
  }
  }
  return booksBorrowed;
}

function getBooksPossessedByAccount(account, books, authors) {
  let accountId = account.id;
  let bookCheckouts = books.filter(book => book.borrows[0].id === accountId);
  for (let i=0; i < bookCheckouts.length; i++) {
    bookCheckouts[i].author = authors.find(author =>  bookCheckouts[i].authorId === author.id); 
  }
    return bookCheckouts;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};

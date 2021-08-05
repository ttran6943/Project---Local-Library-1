function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let isBorrowed = 0;
  for (let borrow in books) {
    if (!books[borrow].borrows[0].returned) {
      isBorrowed++;
    }
  }
  return isBorrowed;
}

//function getMostCommonGenres(books) {
//   let returnArr = [];
//   let returnObj = {};
//   let count = 0;
//   //books.filter((books) => books.genre)
//   for (let key in books) {
//     if (!returnArr.includes(books[key].genre)) {
//       returnObj['name'] = books[key].genre;
//       count++;
//       returnObj['count'] = count;
//       returnArr.push(returnObj);
//     } else {
//       count++;
//       returnObj['count'] = count;
//       returnObj['name'] = books[key].genre;
//       returnArr.push(returnObj);
//     }
//   }
//   return returnArr;
// }

function _sortObjectByValues(obj) {
  const keys = Object.keys(obj);
  //console.log(keys);
  return keys.sort((keyA, keyB) => {
    //console.log(obj[keyA],obj[keyB]);
    if (obj[keyA] > obj[keyB]) {
      return -1;
    } else if (obj[keyB] > obj[keyA]) {
      return 1;
    }
    return 0;
  });
}

function getMostCommonGenres(books) {
  let countObj = books.reduce((acc, { genre }) => {
    if (acc[genre]) {
      acc[genre] += 1;
    } else {
      acc[genre] = 1;
    }
    return acc;
  }, {});
  let sortedKeys = _sortObjectByValues(countObj);
  //console.log(sortedKeys);
  let sorted = sortedKeys
    .map((key) => ({ name: key, count: countObj[key] }))
    .slice(0, 5);
  //console.log(sorted);
  return sorted;
}

function getMostPopularBooks(books) {
  let countObj = {};
  for (let book of books) {
    if (!countObj[book.title]) {
      countObj[book.title] = book.borrows.length;
    }
  }
  let sortedKeys = _sortObjectByValues(countObj);
  let sorted = sortedKeys
    .map((key) => ({ name: key, count: countObj[key] }))
    .slice(0, 5);
  return sorted;
}

function getMostPopularAuthors(books, authors) {
  let count = books.reduce((acc, {authorId, borrows}) =>{
    if (acc[authorId]) {
      acc[authorId].push(borrows.length);
    } else {
      acc[authorId] = [borrows.length];
    }
    return acc;
  },{})
  for (let id in count) {
    const sum = count[id].reduce((a, b) => a + b);
    count[id] = sum;
  }
  const sorted = _sortObjectByValues(count);
  return sorted.map((authorId) => {
    const {
      name:{first, last},
    } = authors.find(({id}) => id === Number(authorId))
    const name = `${first} ${last}`;
    return {name, count: count[authorId]};
  }).slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};

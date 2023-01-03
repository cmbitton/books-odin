let myLibrary = [];

function Books(title, author, pageNumber, hasRead) {
  this.title = title,
    this.author = author,
    this.pageNumber = pageNumber,
    this.hasRead = hasRead
}

Books.prototype.info = function () {
  return `${this.title}, by ${this.author}, ${this.pageNumber} pages, ${this.hasRead}`;
}

function addBookToLibrary(title, author, pageNumber, hasRead) {
  const book = new Books(title, author, pageNumber, hasRead);
  myLibrary.push(book);
}

function displayBooks(){
  const mainContent = document.querySelector('main');
  for(const book of myLibrary){
    const contentBox = document.createElement('div');
    const bookTitle =  document.createElement('h2');
    const bookAuthor = document.createElement('p');
    const pageNumber = document.createElement('p');

    contentBox.classList.add('book-container');
    bookTitle.classList.add('book-title');
    bookAuthor.classList.add('book-author');
    pageNumber.classList.add('book-page-number');

    bookTitle.textContent = book.title;
    bookAuthor.textContent = book.author;
    pageNumber.textContent = book.pageNumber;

    contentBox.append(bookTitle);
    contentBox.append(bookAuthor);
    contentBox.append(pageNumber);
    mainContent.append(contentBox)
  }
}

addBookToLibrary('Great Gatsby', 'fscott', '200', false);
addBookToLibrary('Diary of a wimpy Kid', 'Jeff Kinney', '150', true);
displayBooks();
class Library {
  myLibrary = [];
  bookForm = document.querySelector('.book-form');
  newBookButton = document.querySelector('.new-book-button');
  main = document.querySelector('main');
  header = document.querySelector('header');

  addBookToLibrary(title, author, pageNumber, hasRead) {
    const book = new Books(title, author, pageNumber, hasRead);
    this.myLibrary.push(book);
  }

  removeBookFromLibrary(e){
    const bookIndex = (e.target.parentNode.getAttribute('data-book-number'));
    this.myLibrary.splice(bookIndex, 1);
    displayBooks();
  }
}

const library = new Library();

class Books {
  constructor(title, author, pageNumber, hasRead) {
    this.title = title,
      this.author = author,
      this.pageNumber = pageNumber,
      this.hasRead = hasRead;
  }
  info() {
    return `${this.title}, by ${this.author}, ${this.pageNumber} pages, ${this.hasRead}`;
  }
}

function changeReadStatus(e, book) {
  if (e.target.classList.contains('read')){
    e.target.classList.toggle('read');
    e.target.classList.add('not-read');
    e.target.textContent = 'Not Read';
    book.hasRead = false;
  }
  else{
    e.target.classList.toggle('not-read');
    e.target.classList.add('read');
    e.target.textContent = 'Have Read';
    book.hasRead = true;
  }
}

function displayBooks(){
  const mainContent = document.querySelector('.book-grid');
  mainContent.innerHTML = '';
  for(const book of library.myLibrary){
    const contentBox = document.createElement('div');
    const bookTitle =  document.createElement('h2');
    const bookAuthor = document.createElement('p');
    const pageNumber = document.createElement('p');
    const removeBook = document.createElement('button');
    const readButton = document.createElement('button');

    contentBox.classList.add('book-container');
    contentBox.setAttribute('data-book-number', library.myLibrary.indexOf(book))
    bookTitle.classList.add('book-title');
    bookAuthor.classList.add('book-author');
    pageNumber.classList.add('book-page-number');
    readButton.classList.add('read-button');
    removeBook.classList.add('remove-book-button');
    removeBook.setAttribute('type', 'button');
    removeBook.textContent = 'X'
    removeBook.addEventListener('click', (e) => {
      library.removeBookFromLibrary(e);
    })
    
    readButton.addEventListener('click', (e) => {
      changeReadStatus(e, book);
    })

    bookTitle.textContent = book.title;
    bookAuthor.textContent = book.author;
    pageNumber.textContent = `${book.pageNumber} pages`;
    if (book.hasRead) {
      readButton.textContent = 'Have Read';
      readButton.classList.add('read');
    }
    else {
      readButton.textContent = 'Not Read';
      readButton.classList.add('not-read');
    }

    readButton.addEventListener('click', (e) => {

    })
    
    contentBox.append(bookTitle);
    contentBox.append(bookAuthor);
    contentBox.append(pageNumber);
    contentBox.append(removeBook)
    contentBox.append(readButton)
    mainContent.append(contentBox)
  }
}

function toggleAddBookModal(){
  library.bookForm.classList.toggle('hidden')
}

library.newBookButton.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleAddBookModal();
  library.main.style.filter = 'brightness(50%)';
  library.header.style.filter = 'brightness(50%)';
});

//hides add book modal
window.addEventListener('click', (e) => {
  let reviewNode = e.target;
  let exitForm = true;
  while (reviewNode && reviewNode.nodeName !== 'BODY') {
    if (reviewNode.classList.contains('book-form')) {
      exitForm = false;
      break;
    }
    reviewNode = reviewNode.parentNode;
  }
  if (exitForm && !library.bookForm.classList.contains('hidden')) {
    const validationMessage = document.querySelector('.validation-message');
    if (!validationMessage.classList.contains('hidden')) validationMessage.classList.toggle('hidden')
    toggleAddBookModal();
    library.main.removeAttribute('style');
    library.header.removeAttribute('style');
  }
})

//form validation
function validateNewBookForm() {
  const title = document.querySelector('#new-book-title').value;
  return title ? true : false;
}
function displayFormValidation() {
  const formValidationMessage = document.querySelector('.validation-message');
  if (formValidationMessage.classList.contains('hidden')){
    formValidationMessage.classList.toggle('hidden');
  }
}

//adds new book to library
function addNewBook() {
  const addBookButton = document.querySelector('.add-book-button');
  const mainContent = document.querySelector('.book-grid');
  addBookButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (validateNewBookForm()) {
      const bookTitle = document.querySelector('#new-book-title');
      const bookAuthor = document.querySelector('#new-book-author');
      const pageNumber = document.querySelector('#new-book-pages');
      const hasRead = document.querySelector('#new-book-read').checked;
      library.addBookToLibrary(bookTitle.value, bookAuthor.value, pageNumber.value, hasRead);
      mainContent.innerHTML = '';
      displayBooks();
      toggleAddBookModal();
      library.main.removeAttribute('style');
      library.header.removeAttribute('style');
    }
    else{
      displayFormValidation();
    }
  })
}
addNewBook();
displayBooks();
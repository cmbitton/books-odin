let myLibrary = [];
const bookForm = document.querySelector('.book-form');
const newBookButton = document.querySelector('.new-book-button');
const main = document.querySelector('main');
const header = document.querySelector('header');


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
  const mainContent = document.querySelector('.book-grid');
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

function toggleAddBookModal(){
  bookForm.classList.toggle('hidden')
}

newBookButton.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleAddBookModal();
  main.style.filter = 'brightness(50%)';
  header.style.filter = 'brightness(50%)';
});

//hides add book modal
window.addEventListener('click', (e) => {
  let reviewNode = e.target;
  let exitForm = true;
  console.log(reviewNode.nodeName)
  while (reviewNode && reviewNode.nodeName !== 'BODY') {
    if (reviewNode.classList.contains('book-form')) {
      exitForm = false;
      break;
    }
    reviewNode = reviewNode.parentNode;
  }
  if (exitForm && !bookForm.classList.contains('hidden')) {
    const validationMessage = document.querySelector('.validation-message');
    if (!validationMessage.classList.contains('hidden')) validationMessage.classList.toggle('hidden')
    toggleAddBookModal();
    main.removeAttribute('style');
    header.removeAttribute('style');
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
    if (validateNewBookForm()) {
      console.log(e)
      const bookTitle = document.querySelector('#new-book-title');
      const bookAuthor = document.querySelector('#new-book-author');
      const pageNumber = document.querySelector('#new-book-pages');
      addBookToLibrary(bookTitle.value, bookAuthor.value, pageNumber.value);
      mainContent.innerHTML = '';
      displayBooks();
      toggleAddBookModal();
      main.removeAttribute('style');
      header.removeAttribute('style');
    }
    else{
      displayFormValidation();
    }
  })
}
addNewBook();
addBookToLibrary('Great Gatsby', 'fscott', '200', false);
addBookToLibrary('Diary of a wimpy Kid', 'Jeff Kinney', '150', true);
displayBooks();
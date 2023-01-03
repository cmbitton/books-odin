function Books(title, author, pageNumber, hasRead) {
  (this.title = title),
    (this.author = author),
    (this.pageNumber = pageNumber),
    (this.hasRead = hasRead),
    (this.info = () =>
      `${this.title}, by ${this.author}, ${pageNumber} pages, ${hasRead}`);
}

const book = new Books('the great gatsby', 'f-scott fitz', 200, 'has read')
console.log(book.info())

const displayBooks = document.querySelector('.display-books');
const addBooksBtn = document.querySelector('#add-books-btn');
const closeFormBtn = document.querySelector('#close-form-btn');
const bookFormDialog = document.querySelector('.form-container');
const bookForm = document.querySelector('#input-form');

const myLibrary = [];
let id = 1;

class Book{

    constructor(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = id++;
    }

    toggle(){
        this.read = !this.read;
        displayAllBooks();
    }
}

addBooksBtn.addEventListener('click', () => {
    bookFormDialog.showModal();
});

closeFormBtn.addEventListener('click', () => {
    bookFormDialog.close();
});

bookForm.addEventListener('submit', (e) => {
    e.preventDefault();  
    
    if (!bookForm.checkValidity()) {
        bookForm.reportValidity();  // Shows browser's validation messages
        return;
    }

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const readStatus = document.querySelector('#read').checked;

    const myBook = new Book(title, author, pages, readStatus);
    addBookToLibrary(myBook);

    bookForm.reset(); 
    bookFormDialog.close(); 
});

function addBookToLibrary(book) {
    myLibrary.push(book);
    displayAllBooks();
}

function displayAllBooks() {
    displayBooks.innerHTML = ''; // Clears previous books
    
    myLibrary.forEach((book) => {
        const books = document.createElement("div");
        books.classList.add('books');

        const title = document.createElement("h3");
        const author = document.createElement("p");
        const pages = document.createElement("p");

        title.textContent = book.title;
        author.textContent = book.author;
        pages.textContent = `${book.pages} pages`;

        const toggleRead = document.createElement("button");
        toggleRead.classList.add(book.read ? "read-btn" : "not-read-btn");
        toggleRead.textContent = book.read ? "Read" : "Not Read";
        toggleRead.addEventListener('click', () => {
            book.toggle();
            displayAllBooks();
        });

        const deleteBook = document.createElement("button");
        deleteBook.textContent = "Delete";
        deleteBook.classList.add("delete-btn");
        deleteBook.addEventListener('click', () => {
            myLibrary.splice(myLibrary.indexOf(book), 1);
            displayAllBooks();
        });

        books.append(title, author, pages, toggleRead, deleteBook);
        displayBooks.appendChild(books);
    });
}

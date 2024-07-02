const addButton = document.getElementById('add-book')

addButton.addEventListener(onclick, ()=>{
    //Display the form
})

const myLibrary = [];

function Book(title, author, pages, read_status){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read_status = read_status;
}

function addBookToLibrary(Book){
    this.myLibrary = [Book]
}

const book1 = new Book('dfdfd', 'dfdfd', 12, 'yes')

console.log(book1)
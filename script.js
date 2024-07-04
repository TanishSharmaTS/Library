const addButton = document.getElementById('add-book')
const dialog = document.getElementById('form-container')

addButton.addEventListener('click', () => {
    dialog.show();
})

const closeForm = document.getElementById('close-form-btn')

closeForm.addEventListener('click', () => {
    dialog.close();
})

let form = document.getElementById('myform')
const myLibrary = [];

function Book(title, author, pages, read_status) {
    this.id = Book.id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read_status = read_status;
    Book.id++;
}

Object.defineProperty(Book, 'id', {
    value: 0,
    writable: true,
    enumerable: true,
})

function addBookToLibrary(newBook) {
    myLibrary.push(newBook)
}


form.addEventListener('submit', (e) => {

    e.preventDefault();
    const titleInput = document.getElementById('title').value
    const authorInput = document.getElementById('author').value
    const pagesInput = document.getElementById('pages').value
    const readStatusInput = document.getElementById('read_status').checked === true ? 'read' : 'not_read'

    const newBook = new Book(titleInput, authorInput, pagesInput, readStatusInput)

    addBookToLibrary(newBook)
    form.reset()
    dialog.close();
    displayBooks()
})


Book.prototype.toggleButton = function () {
    this.read_status = this.read_status === 'read' ? 'not_read' : 'read'
}

function deleteBook(BookId) {
    let index = myLibrary.findIndex((book) => book.id === BookId)
    if (index !== -1) {
        myLibrary.splice(index, 1)
    }
}

const lists = document.getElementById('book-list')

function displayBooks() {
    lists.textContent = ''
    myLibrary.forEach(element => {
        const listItem = document.createElement('div')
        listItem.classList.add('books')

        const title = document.createElement('h3')
        title.textContent = element.title

        const author = document.createElement('p')
        author.textContent = element.author

        const pages = document.createElement('p')
        pages.textContent = element.pages

        const read_status = document.createElement('button')
        const read_status_text = document.createElement('span')
        read_status_text.textContent = element.read_status === 'read' ? 'Read' : 'Not Read'

        read_status.appendChild(read_status_text)
        read_status.classList.add(element.read_status === 'read' ? 'read' : 'not-read')

        const deleteBtn = document.createElement('button')
        deleteBtn.textContent = "Remove Book"
        deleteBtn.classList.add('delete-btn')


        read_status.addEventListener('click', () => {
            element.toggleButton()
            displayBooks()
        })

        deleteBtn.addEventListener('click', () => {
            deleteBook(element.id)
            displayBooks()
        })

        listItem.appendChild(title)
        listItem.appendChild(author)
        listItem.appendChild(pages)
        listItem.appendChild(read_status)
        listItem.appendChild(deleteBtn)
        lists.appendChild(listItem)

    });
}

// Demo Books

const book1 = new Book('Atomic Habits', 'James Clear', 255, 'read')
const book2 = new Book('The Alchemist', 'Paulo Coelho', 158, 'not_read')

myLibrary.push(book1)
myLibrary.push(book2)

displayBooks()
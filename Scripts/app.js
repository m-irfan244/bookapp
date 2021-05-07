// Book Constructor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI Constructor 
function UI(){}

UI.prototype.addBookToList = function(book){
    const list = document.getElementById('book-list');

    // create tr element

    const row = document.createElement('tr')

    // insert cols

    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `

list.appendChild(row)
}

// Validate
UI.prototype.showAlert = function(message, className){
    // create div
    const div = document.createElement('div');

    // add classes
    div.className = `alert ${className}`;

    // add text
    div.appendChild(document.createTextNode(message));

    // get parent

    const container = document.querySelector('.container');

    // Get form
    const form = document.querySelector('#book-form')

    // insert alert
    container.insertBefore(div, form);

    // time out
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000)

}

// Delete Books
UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}

// clear Fields
UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

// Event Listeners for book add

const bookForm = document.getElementById('book-form');

bookForm.addEventListener('submit', function(e){
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value

    // Instantiate Book
        const book = new Book(title, author, isbn);

    // Instantiate UI
        const ui = new UI();

    // validate 
    if(title === "" || author === "" || isbn === "") {
        ui.showAlert('Please fill in all fields', 'error')

    } else {
            // Add book to List
                ui.addBookToList(book); 

            // Added successfully
                ui.showAlert('Book Added!', 'success')
        
            // clear fields
        
            ui.clearFields();

    }        
    e.preventDefault();
});

// Event listener for Book remove

document.getElementById('book-list').addEventListener('click', function(e){

    // Instantiate UI
    const ui = new UI();

    // delete Book
    ui.deleteBook(e.target);

    // show alert
    ui.showAlert('Book Deleted!', 'success')

    e.preventDefault();
})


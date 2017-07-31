import React from 'react'
import Book from './Book'


function BookShelf(props) {

        return (
         <div className="bookshelf">
            <h2 className="bookshelf-title">{props.title}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
              {props.books.map((book, id) => (
                <li  key={id} className='book-list-item'>
                  <Book
                    book={book}
                    onMoveBook={props.onMoveBook}
                    shelf={props.shelf}
                    getBookShelf={props.getBookShelf}
                  />
                </li>
              ))}
              </ol>
            </div>
          </div>



        )// end of return

}// end of class


export default BookShelf

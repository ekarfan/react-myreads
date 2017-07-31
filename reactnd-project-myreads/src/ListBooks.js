import React from 'react';
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'



function ListBooks(props) {
  
    const shelves = [
    {
      id: 'currentlyReading',
      title: 'Currently Reading',
      books: props.books.filter(book => book.shelf === 'currentlyReading')

    },
    {
      id: 'wantToRead',
      title: 'Want To Read',
      books: props.books.filter(book => book.shelf === 'wantToRead')
    },
    {
      id: 'read',
      title: 'Read',
      books: props.books.filter(book => book.shelf === 'read')
    }
    ]

 
    
   return (
      <div className="list-books">
        <div className="list-books-title">
            <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
            <div>
            {shelves.map(shelf => (
              <BookShelf 
                title={shelf.title} 
                books={shelf.books} 
                shelf={props.selectedShelf}
                onMoveBook={props.onMoveBook}
                getBookShelf={props.getBookShelf}
              />
            ))}

            </div>
            <div className="open-search">
              <Link
              to='/search'
              >Add a Book</Link>
            </div>
        </div>
      </div>
    )
}

export default ListBooks

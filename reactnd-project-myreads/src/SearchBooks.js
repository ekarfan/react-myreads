import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import Book from './Book'

class SearchBooks extends Component {

  static prpTypes={
    books: PropTypes.array.isRequired
  }

  state = {
    query: ''
  }

  updateQuery =(query)=>{
    this.setState({query})
    this.props.onSearchBook(query)
  }


  clearQuery = () => {
    this.setState({ query: '' })
  }




  render() {
    const{ books, onMoveBook, shelf, getBookShelf }=this.props
    const { query } = this.state

    let showingBooks
    if (query) {
      const match = new RegExp(escapeRegExp(query),'i')
      showingBooks = books.filter((book) => match.test(book.title) || match.test(book.authors))
    } 
    else {
      showingBooks = []
    }
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to='/'
            className='close-search'
            >close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>

        <div className="search-books-results">
          <ol className="books-grid">
              {showingBooks.map((book, id) => (
                  <li key={id}>
                    <Book
                      book={book}
                      onMoveBook={onMoveBook}
                      shelf={shelf}
                      getBookShelf={getBookShelf}
                    />
                  </li>
              ))}

          </ol>
        </div>
      </div>
    )
  }
}
export default SearchBooks

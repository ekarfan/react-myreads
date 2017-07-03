import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'

class SearchBooks extends Component {
  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  render() {
    const { books } = this.props
    const { query } = this.state
    let showingBooks
    if (query) {
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      showingBooks = books.filter((book) => match.test(book))
    } else {
      showingBooks = books
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
            <input
              className='search-books-input-wrapper'
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
            <Link
              to='/search'
               className='search-book'
            >Search Book</Link>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {showingBooks.map((book) => (
              <li key={book.id} className='book-list-item'>

                <div className='contact-details'>
                  <p>{book.author}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}
export default SearchBooks

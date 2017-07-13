import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'


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
    const{ books, onMoveBook }=this.props
    const { query } = this.state

    let showingBooks
    if (query) {
      const match = new RegExp(escapeRegExp(query),'i')
      showingBooks = books.filter((book) => match.test(book.title) || match.test(book.authors))
    } else {
      showingBooks = []
    }
    console.log(showingBooks)
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

            {showingBooks.length !== 0 && showingBooks.map((book, i) => (
              <li  key={book.id} className='book-list-item'>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193,
                      backgroundImage: `url(${book.imageLinks.thumbnail})`
                      }}>
                    </div>
                    <div className="book-shelf-changer">
                      <select value={book.shelf}
                        onChange={event=>onMoveBook(book,event.target.value)}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{ book.title }</div>
                  <div className="book-authors">{ book.authors }</div>
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

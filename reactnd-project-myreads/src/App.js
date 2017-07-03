import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'

import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
    books: []
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }
  searchBook(book) {
    BooksAPI.search(book).then(book => {
      this.setState(state => ({
        books: state.books.concat([ book ])
      }))
    })
  }
  render() {
    return (
      <div className="app">
        <Route path='/search' render={({ history }) => (
          <SearchBooks
            onSearchBooks={(book) => {
              this.searchBook(book)
              history.push('/')
            }}
          />
        )}/>
        <Route path='/' render={() => (
            <ListBooks
            />
        )}/>
      </div>
    )
  }
}

export default BooksApp

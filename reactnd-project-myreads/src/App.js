import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {

  state = {
    books: [],
    selectedShelf: '',
    searchResults: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  moveBook=(book,shelf)=>{
    this.setState({selectedShelf: shelf})
    this.setState({selectedShelf: shelf})
        if (book.shelf !== shelf) {
            book.shelf = shelf
            BooksAPI.update(book, shelf).then((res) => {
                this.setState((state, props) => ({
                    books: state.books.filter(b => b.id !== book.id).concat([book]) }))
            })
        } 
        else return book

        console.log(book)
        console.log(this.state.books)
  }

  
  getBookShelf = (book) => {
    const existingBook = this.state.books.find(b => b.id === book.id)
    if (existingBook) return existingBook.shelf
    return book.shelf
  }

  searchBook = (query) => {
    this.setState({ query: query.trim() })
    BooksAPI.search(query, 20).then((res) => {
      this.setState({ searchResults: res })
    }).catch(function(e){
            console.log('error',e)
          })
  }


  render() {
    const{ books, searchResults, selectedShelf }=this.state
    return (
      <div className="app">
        <Route exact path='/search' render={() => (
            <SearchBooks
            books={searchResults}
            shelf={selectedShelf}
            onSearchBook={this.searchBook}
            getBookShelf={this.getBookShelf}
            onMoveBook={(book,shelf)=>{
                    this.moveBook(book,shelf)
                  }}/>
        )}/>
        <Route exact path='/' render={() => (
            <ListBooks
            books={books}
            selectedShelf={selectedShelf}
            getBookShelf={this.getBookShelf}
            onMoveBook={(book,shelf)=>{
                    this.moveBook(book,shelf)}}/>

        )}/>
      </div>
    )
  }
}

export default BooksApp

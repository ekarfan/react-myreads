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
      //console.log(books)
      this.setState({ books })
    })
  }

  getAllBooks() {
    BooksAPI.getAll().then((books) => {
      //console.log(books)
      this.setState({ books })
    })
  }

  moveBook=(book,shelf)=>{
    //console.log(book)
    //console.log(shelf)
    this.setState({shelf: shelf})
    if(shelf){
        BooksAPI.update(book, shelf).then (()=> {
          //console.log(books)
          BooksAPI.getAll().then((books) => {
            console.log(books)
            this.setState({ books })
          })
        }).catch(function(e){
          console.log('error',e)
        })
    }

  }

  createBook(bookid) {
    BooksAPI.get(bookid).then(book => {
      this.setState(state => ({
        books: state.books.concat([ book ])
      }))
    })
  }

  searchBook = (query) => {
    this.setState({ query: query.trim() })
    BooksAPI.search(query, 20).then((books) => {
      console.log(books)
      this.setState({ books: books })
    }).catch(function(e){
            console.log('error',e)
          })
  }


  render() {
    const{books}=this.state
    return (
      <div className="app">
        <Route exact path='/search' render={({ history }) => (
            <SearchBooks
            books={books}
            shelf={books.shelf}
            onSearchBook={this.searchBook}
            onMoveBook={(book,shelf)=>{
                    this.moveBook(book,shelf)
                    history.push('/')
                  }}/>
        )}/>
        <Route exact path='/' render={() => (
            <ListBooks
            books={books}
            shelf={books.shelf}
            onMoveBook={(book,shelf)=>{
                    this.moveBook(book,shelf)}}/>

        )}/>
      </div>
    )
  }
}

export default BooksApp

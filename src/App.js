import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ShelfContainer from './ShelfContainer'
import {Route, Link} from 'react-router-dom';
import ResultsContainer from './ResultsContainer'

class BooksApp extends React.Component {
  state ={
    Shelves:["Currently reading","Want to read","Read"],
    Books:[],
    Searchresults:[],
    Val:""
}

componentDidMount(){
    const storedbooks = localStorage.getItem("Books")
    const storedshelves = localStorage.getItem("Shelves")
    if (storedbooks && storedbooks.length != 0){
      this.setState(()=>({
        Shelves: JSON.parse(storedshelves),
        Books: JSON.parse(storedbooks)
      }))
    } else {
      BooksAPI.getAll().then( (books) =>{
          this.setState({
              Books: books
          })
      }
      )
    }
   
}

addShelf = (shelf) => {
    const newShelves = [...this.state.Shelves,shelf]
    this.setState((prevState) => ({
        Shelves: newShelves
    }))
    localStorage.setItem("Shelves",JSON.stringify(newShelves))
}

removeShelf = (shelf) => {
  const remainingshelves=this.state.Shelves.filer(item => item != shelf)
  this.setState((prevState) => ({
    Shelves: remainingshelves
}))
  localStorage.setItem("Shelves",JSON.stringify(remainingshelves))
}

updateVal = (val) => {
  BooksAPI.search(val).then((res)=>{
      this.setState(()=> ({
        Val: val,
        Searchresults: Array.isArray(res) ? res : []
      }))
     
  })
 

}

updateBook = (book,shelf) => {
    if (shelf != book.shelf){
      BooksAPI.update(book,shelf).then((bookreturned) =>{
        const allBooks = this.state.Books.filter((item) => item!=book)
        book.shelf = shelf
        this.setState(()=>({
          Books: allBooks.concat(book)
        }))
        localStorage.setItem("Books",JSON.stringify(allBooks.concat(book)))
        })
      }
    }  

  render() {
    return (
      <div className="app">
        <Route path='/search' render={({history}) => (
          <div className="search-books">
          <div className="search-books-bar">
            <button className="close-search" onClick={() => history.push('/')}>Close</button>
            <div className="search-books-input-wrapper">
              <input type="text" placeholder="Search by title or author" value={this.state.val} onChange={(e)=>this.updateVal(e.target.value)}/>
            </div>
          </div>
          <ResultsContainer results={this.state.Searchresults} shelves={this.state.Shelves} updateBook={this.updateBook}/>
        </div>
        )} />

        <Route exact path='/' render={()=> (
         <div className="list-books">
         <div className="list-books-title">
           <h1>MyReads</h1>
         </div>
         <ShelfContainer books={this.state.Books} 
          shelves={this.state.Shelves} 
          updateBook={this.updateBook} 
          addShelf={this.addShelf} 
          removeShelf={this.removeShelf}/>
         <div className="open-search">
            <Link to='/search'><button>Add a book </button></Link>
         </div>
       </div>
        )} />
      </div>
    )
  }
}

export default BooksApp

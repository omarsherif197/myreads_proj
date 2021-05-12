import React from 'react'
import Book from "./Book"

class ResultsContainer extends React.Component{

    render(){
        return(
            <div className="search-books-results">
            <ol className="books-grid">
                {this.props.results.map((book)=>(
                    <Book key={book.id} book={book} shelves={this.props.shelves} updateBook={this.props.updateBook} />
                ))}
            </ol>
          </div>
        )  
    }
}

export default ResultsContainer
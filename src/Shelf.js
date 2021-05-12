import React from 'react'
import Book from "./Book"

class Shelf extends React.Component{

    removeShelf= () => {
        this.props.removeShelf(this.props.name)
    }

    render(){
        return(
            <div className='bookshelf'>
                <h2 className="bookshelf-title">{this.props.name}</h2>
                <button onClick={this.removeShelf} style={{float: "right"}}>Remove Shelf</button>
                <div className="bookshelf-books">
                <ol className="books-grid">
                    {this.props.books.map((book)=> (
                        <Book key={book.id} book={book} shelves={this.props.shelves} updateBook={this.props.updateBook} />
                    ))}
                </ol>

                </div>
            </div>
        )
    }

}

export default Shelf;
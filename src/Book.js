import React from 'react'
import ShelfContainer from './ShelfContainer';

class Book extends React.Component{

    convertname = (shelf) => {
        let shelfname = shelf.split(" ").map((x) => (x.charAt(0).toUpperCase()+x.slice(1)))
        shelfname[0] = shelfname[0].toLowerCase()
        shelfname = shelfname.join("");
        return shelfname
    }
    updateBook = (newshelf) => {
        this.props.updateBook(this.props.book,newshelf);
    }

    render(){
        return(
            <li>
                <div className="book">
                    <div className="book-top">
                    <div className="book-cover" style={{ width: 128, 
                    height: 193, 
                    backgroundImage: this.props.book.imageLinks ?`url(${this.props.book.imageLinks.smallThumbnail})` : 'none' }}></div>
                    <div className="book-shelf-changer">
                        <select onChange= {(e) => this.updateBook(e.target.value)}>
                        <option value="move" disabled>Move to...</option>
                        {this.props.shelves.map((shelf) =>(
                            <option key={shelf+"1"} value={this.convertname(shelf)}>{shelf}</option>
                        ))}
                        <option value="none">None</option>
                        </select>
                    </div>
                    </div>
                    <div className="book-title">{this.props.book.title}</div>
                    <div className="book-authors">{this.props.book.author}</div>
                </div>
            </li>
        )
    }

}

export default Book;
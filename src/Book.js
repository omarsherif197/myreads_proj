import React from 'react'
import ShelfContainer from './ShelfContainer';

class Book extends React.Component{

    state= {
        shelvescamelcase: []
    }

    componentDidMount(){
        console.log(this.props.shelves.map((shelf) => (this.convertname(shelf))))
    }

    convertname = (shelf) => {
        let shelfname = shelf.split(" ").map((x) => (x.charAt(0).toUpperCase()+x.slice(1)))
        shelfname[0] = shelfname[0].toLowerCase()
        shelfname = shelfname.join("");
        return shelfname
    }

    updateBook = (newshelf) => {
        this.props.updateBook(this.props.book,newshelf);
    }

    bookshelfis = () => {
        let camelshelves = this.props.shelves.map((shelf) => (this.convertname(shelf)))
        if (this.props.book.shelf){
            for (let i =0 ; i< camelshelves.length; i++){
                if (camelshelves[i] == this.props.book.shelf){
                    return this.props.shelves[i]
                }
            }
        } else {
            return "None"
    }
    }

    render(){
        let mainshelf = this.bookshelfis()
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
                        <option key={mainshelf+"1"} value={this.convertname(mainshelf)}> {mainshelf}</option>
                        {this.props.shelves.map((shelf) =>{
                            if (shelf != mainshelf){
                                return <option key={shelf+"1"} value={this.convertname(shelf)}>{shelf}</option>
                            }
                        }
                        )}
                        {mainshelf != "None" ? <option value="none">None</option> : null }
                        </select>
                    </div>
                    </div>
                    <div className="book-title">{this.props.book.title}</div>
                    <div className="book-authors">{this.props.book.authors}</div>
                </div>
            </li>
        )
    }

}

export default Book;
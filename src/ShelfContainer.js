import React from 'react'
import AddShelf from './AddShelf'
import Shelf from "./Shelf"

class ShelfContainer extends React.Component{

    inShelf = (shelf) => {
        let shelfname = shelf.split(" ").map((x) => (x.charAt(0).toUpperCase()+x.slice(1)))
        shelfname[0] = shelfname[0].toLowerCase()
        shelfname = shelfname.join("");
        let lst= []
        for(let x of this.props.books){
            if (x.shelf == shelfname){
                lst.push(x)
            }
        }
        return lst;
    }
    
    render(){
        return(
            <div className="list-books-content"> 
                <AddShelf onAdd={this.props.addShelf} />
                 {this.props.shelves.map((shelf)=> (
                     <Shelf key={shelf} name={shelf} 
                     books={this.inShelf(shelf)} 
                     shelves={this.props.shelves} 
                     updateBook={this.props.updateBook} 
                     removeShelf={this.props.removeShelf} />
                 ))}
            </div>
        )
    }

}

export default ShelfContainer;
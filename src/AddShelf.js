import React from 'react'

class AddShelf extends React.Component{
    state = {
        value: ""
    }

    updateValue = (val) => {
        this.setState(() => ({
            value : val.trim()
        }))
    }

    AddShelf = (event) => {
        event.preventDefault()
        this.props.onAdd(this.state.value)
        this.updateValue("")
    }

    render(){
        return(
            <div>
                <form onSubmit= {this.AddShelf} style={{textAlign: "center"}}>
                    <input type="text" placeholder="Add a shelf" value={this.state.value} onChange={(e) => (this.updateValue(e.target.value))} />
                    <button>Add shelf</button>
                </form>
            </div>
        )
    }

}

export default AddShelf;
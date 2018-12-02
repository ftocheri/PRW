import React, {Component} from 'react'
import { FaTrashAlt } from 'react-icons/fa'

class ItemList extends Component {
    render() {
        return (
            <li key={this.props.id} className="list">
                <span className="entry name">{this.props.val.item}</span>
                <span className="entry amount">{this.props.val.amount}</span>
                <button className="dBtn" onClick={this.props.delMe}><FaTrashAlt /></button>
            </li>
        )
    }
}

export default ItemList
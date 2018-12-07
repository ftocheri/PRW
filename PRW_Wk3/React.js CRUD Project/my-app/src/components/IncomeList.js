import React, {Component} from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { FaEdit } from 'react-icons/fa'

class IncomeList extends Component {
    render() {
        return (
            <li key={this.props.id} className="list">
                <span className="entry name">{this.props.val.source}</span>
                <span className="entry amount">{this.props.val.total}</span>
                <button className="eBtn" onClick={this.props.editMe}><FaEdit /></button>
                <button className="dBtn" onClick={this.props.delMe}><FaTrashAlt /></button>
            </li>
        )
    }
}

export default IncomeList
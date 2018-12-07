import React, { Component } from 'react'
import ItemList from '../components/ItemList'
import { FaPlus } from 'react-icons/fa'

class Bills extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchString: "",
            exList: []
        }
        this.addItem = this.addItem.bind(this)
        this.changeItem = this.changeItem.bind(this)
        this.changeAmount = this.changeAmount.bind(this)
        this.removeItem = this.removeItem.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        if (localStorage.getItem('exList')) {
            let exList = JSON.parse(localStorage.getItem('exList'))
            this.setState({ 
                exList: exList
            })
            this.refs.search.focus()
        }
    }
    
    handleChange() {
        this.setState({
            searchString: this.refs.search.value
        })
    }

    changeItem(e) {
        e.preventDefault()
        this.setState({ item: e.target.value })
    }

    changeAmount(e) {
        e.preventDefault()
        let nAmount = e.target.value
        nAmount = parseFloat(nAmount).toFixed(2)
        this.setState({ amount: nAmount })
    }

    addItem(e) {
        let exList = this.state.exList
        if (this.state.item === null) {
            alert('Please enter the item name.')
            return false
        }
        if (this.state.amount === 0) {
            alert('Please enter a valid amount.')
            return false
        }
        if (isNaN(this.state.amount)) {
            alert('The amount must be a number.')
            return false
        }
        this.state.exList.push({ 'item': this.state.item, 'amount': "$" + this.state.amount })
        this.setState({ exList: this.state.exList })
        localStorage.setItem('exList', JSON.stringify(exList))
    }

    removeItem(key) {
        let exList = this.state.exList
        this.state.exList.splice(key, 1)
        this.setState({ exList: this.state.exList })
        localStorage.setItem('exList', JSON.stringify(exList))
    }

    render() {
        let myItems = this.state.exList.map((val, key) => {
            return <ItemList val={val} key={key} id={key} delMe={() => this.removeItem(key)} />
        })
        let search = this.state.searchString.trim().toLowerCase()
        if(search.length > 0) {
            myItems = myItems.filter(function(item) {
                return item.props.val.item.match(search)
            })
        }
        return (
            <main className="ItemList">
                <section className="add">
                    <h2>Bills</h2>
                    <h2>Add New Item</h2>
                    <form name="myForm">
                        <p>
                            <input type="text" name="item" placeholder="Item Name" onChange={this.changeItem} />
                            <input type="text" name="amount" placeholder="Item Amount" onChange={this.changeAmount} />
                            <button type="submit" className="aBtn" onClick={this.addItem}><FaPlus /></button>
                        </p>
                    </form>
                </section>
                <section className="newList">
                    <h2>Current Item List</h2>
                    <article className="content">
                    <input type="text" className="search" value={this.state.searchString} ref="search" onChange={this.handleChange} placeholder="Search..." />
                    <ul className="expenseCont">{myItems}</ul>
                    </article>
                </section>
            </main>
        )
    }
}
export default Bills
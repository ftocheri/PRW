import React, { Component } from 'react'
import ItemList from '../components/ItemList'
import { FaPlus } from 'react-icons/fa'

class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            exList: [
                {
                    item: "Tacos",
                    amount: "$3.50",
                }
            ],
        }
        this.addItem = this.addItem.bind(this)
        this.changeItem = this.changeItem.bind(this)
        this.changeAmount = this.changeAmount.bind(this)
        this.removeItem = this.removeItem.bind(this)
    }

    componentDidMount() {
        if (localStorage.getItem('exList')) {
            let exList = JSON.parse(localStorage.getItem('exList'))
            this.setState({ exList: exList })
        }
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
        return (
            <main className="ItemList">
                <section className="add">
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
                        <ul className="expenseCont">{myItems}</ul>
                    </article>
                </section>
            </main>
        )
    }
}
export default Main
import React, { Component } from 'react'
import IncomeList from '../components/IncomeList'
import { FaPlus } from 'react-icons/fa'

class Income extends Component {
    constructor(props) {
        super(props)

        this.state = {
            iList: [],
        }
        this.addItem = this.addItem.bind(this)
        this.changeItem = this.changeItem.bind(this)
        this.changeAmount = this.changeAmount.bind(this)
        this.editItem = this.editItem.bind(this)
        this.removeItem = this.removeItem.bind(this)
    }

    componentDidMount() {
        if (localStorage.getItem('iList')) {
            let iList = JSON.parse(localStorage.getItem('iList'))
            this.setState({ iList: iList })
        }
    }

    changeItem(e) {
        e.preventDefault()
        this.setState({ source: e.target.value })
    }

    changeAmount(e) {
        e.preventDefault()
        let nAmount = e.target.value
        nAmount = parseFloat(nAmount).toFixed(2)
        this.setState({ total: nAmount })
    }

    addItem(e) {
        let iList = this.state.iList
        if (this.state.source === null) {
            alert('Please enter the income source.')
            return false
        }
        if (this.state.total === 0) {
            alert('Please enter a valid amount.')
            return false
        }
        if (isNaN(this.state.total)) {
            alert('The amount must be a number.')
            return false
        }
        this.state.iList.push({ 'source': this.state.source, 'total': "$" + this.state.total })
        this.setState({ iList: this.state.iList })
        localStorage.setItem('iList', JSON.stringify(iList))
    }

    removeItem(key) {
        let iList = this.state.iList
        this.state.iList.splice(key, 1)
        this.setState({ iList: this.state.iList })
        localStorage.setItem('iList', JSON.stringify(iList))
    }

    editItem(val) {
        console.log(val.source)
    }

    render() {
        let myItems = this.state.iList.map((val, key) => {
            return <IncomeList val={val} key={key} id={key} editMe={() => this.editItem(val)} delMe={() => this.removeItem(key)} />
        })
        return (
            <main className="ItemList">
                <section className="add">
                    <h2>Income</h2>
                    <h2>Add New Income</h2>
                    <form name="myForm">
                        <p>
                            <input type="text" name="income" placeholder="Income Source" onChange={this.changeItem} />
                            <input type="text" name="amount" placeholder="Income Amount" onChange={this.changeAmount} />
                            <button type="submit" className="aBtn" onClick={this.addItem}><FaPlus /></button>
                        </p>
                    </form>
                </section>
                <section className="newList">
                    <h2>Current Income List</h2>
                    <article className="content">
                        <ul className="expenseCont">{myItems}</ul>
                    </article>
                </section>
            </main>
        )
    }
}
export default Income
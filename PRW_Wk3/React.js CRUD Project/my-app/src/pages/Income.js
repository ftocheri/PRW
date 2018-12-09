import React, { Component } from 'react'
import IncomeList from '../components/IncomeList'
import { FaPlus } from 'react-icons/fa'
import { FaEdit } from 'react-icons/fa'

class Income extends Component {
    constructor(props) {
        super(props)

        this.state = {
            iList: [],
            location: ""
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

    editItem(key) {
        let iList = this.state.iList
        document.getElementById("myForm").style.display = "block"
        document.getElementById('eIncome').value = key.source;
        key.total = key.total.slice(1);
        document.getElementById('eAmount').value = key.total;
        for(let i=0; i < iList.length; i++) {
            if(iList[i].source == key.source && iList[i].total == key.total) {
                this.state.location = i
            }
        }
    }

    updateItem() {
        let iList = this.state.iList
        let location = this.state.location
        let uSource = document.getElementById('eIncome').value
        let uTotal = document.getElementById('eAmount').value
        if (uSource === null || uSource == "") {
            alert('Please enter the income source.')
            return false
        }
        if (uTotal === 0) {
            alert('Please enter a valid amount.')
            return false
        }
        if (isNaN(uTotal)) {
            alert('The amount must be a number.')
            return false
        }
        this.state.iList[location] = ({'source': uSource, 'total': "$" + uTotal})
        this.setState({iList: this.state.iList})
        localStorage.setItem('iList', JSON.stringify(iList))
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
                <section className="form-popup" id="myForm">
                    <form className="form-container">
                        <h2>Edit</h2>
                        <input type="text" id="eIncome" name="income" placeholder="Income Source" onChange={this.changeItem} />
                        <input type="text" id="eAmount" name="amount" placeholder="Income Amount" onChange={this.changeAmount} />
                        <button type="submit" className="aBtn" onClick= {() => this.updateItem()}><FaEdit /></button>
                    </form>
                </section>
            </main>
        )
    }
}
export default Income
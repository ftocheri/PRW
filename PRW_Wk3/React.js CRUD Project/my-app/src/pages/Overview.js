import React, { Component } from 'react'
import { Chart } from 'react-google-charts'

const dataSource = []
const otherDataSource = []
class Overview extends Component {
    constructor(props) {
        super(props)

        this.state = {
            iList: [],
            exList: []
        }
    }
    componentDidMount() {
        if (localStorage.getItem('iList')) {
            let iList = JSON.parse(localStorage.getItem('iList'))
            for (let i = 0; i < iList.length; i++) {
                let convertedItem = parseFloat(iList[i].total.substr(1))
                dataSource.push(convertedItem)
            }
            console.log(dataSource)
            this.setState({
                iList: iList
            })
        }
        if (localStorage.getItem('exList')) {
            let exList = JSON.parse(localStorage.getItem('exList'))
            for (let i = 0; i < exList.length; i++) {
                let convertedItem = parseFloat(exList[i].amount.substr(1))
                otherDataSource.push(convertedItem)
            }
            console.log(otherDataSource)
            this.setState({
                exList: exList
            })
        }
    }
    addToPrevious(x, y) {
        let total
        total = x + y
        return total
    }
    render() {
        let bPointOne = this.addToPrevious(dataSource[1], dataSource[0])
        let bPointTwo = this.addToPrevious(dataSource[2], bPointOne)
        let bPointThree = this.addToPrevious(dataSource[3], bPointTwo)
        let bPointFour = this.addToPrevious(dataSource[4], bPointThree)
        let iPointOne = this.addToPrevious(otherDataSource[1], otherDataSource[0])
        let iPointTwo = this.addToPrevious(otherDataSource[2], iPointOne)
        let iPointThree = this.addToPrevious(otherDataSource[3], iPointTwo)
        let iPointFour = this.addToPrevious(otherDataSource[4], iPointThree)
        return (
            <div className={"chart-container"}>
                <Chart
                    width={'600px'}
                    height={'400px'}
                    chartType="LineChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['x', 'Income', 'Expenses'],
                        [0,0,0],
                        [1,dataSource[0], otherDataSource[0]],
                        [2,bPointOne, iPointOne],
                        [3,bPointTwo, iPointTwo],
                        [4,bPointThree, iPointThree],
                        [5,bPointFour, iPointFour],
                    ]}
                    options={{
                        hAxis: {
                            title: 'Changes',
                        },
                        vAxis: {
                            title: 'Amount',
                        },
                        title: 'Last 5 Withdrawals and Deposits'
                    }}
                    rootProps={{ 'data-testid': '1' }}
                />
            </div>
        )
    }
}
export default Overview
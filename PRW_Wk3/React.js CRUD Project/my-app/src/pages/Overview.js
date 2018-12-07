import React, { Component } from 'react'
import { Chart } from 'react-google-charts'

const dataSource = []
const options = {
    title: "Income and Bills",
    hAxis: { title: "Dollars" },
    vAxis: { title: ""}
}
class Overview extends Component {
    constructor(props) {
        super(props)

        this.state = {
            iList: [],
            exList: []
        }
    }
    componentDidMount() {
        if(localStorage.getItem('iList')) {
            let iList = JSON.parse(localStorage.getItem('iList'))
            for(let i=0; i < iList.length; i++) {
                dataSource.push(iList[i].total)
            }
            this.setState({
                iList: iList
            })
        }
        if (localStorage.getItem('exList')) {
            let exList = JSON.parse(localStorage.getItem('exList'))
            for(let i =0; i < exList.length; i++) {
                dataSource.push(exList[i].amount)
            }
            console.log(dataSource)
            this.setState({ 
                exList: exList
            })
        }
    }
    render() {
        return(
            <div className={"my-pretty-chart-container"}>
                <Chart
                    chartType="LineChart"
                    dataSource={dataSource}
                    width="80%"
                    height="400px"
                    legendToggle
                />
            </div>
        )
    }
}
export default Overview
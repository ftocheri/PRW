import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

import Bills from '../pages/Bills'
import Income from '../pages/Income'
import Overview from '../pages/Overview'

class Main extends Component {
    render() {
        return(
            <section className="content main-content">
                <Route exact path='/Bills' component={Bills} />
                <Route exact path='/Income' component={Income} />
                <Route exact path='/Overview' component={Overview} />
            </section>
        );
    }
}
export default Main
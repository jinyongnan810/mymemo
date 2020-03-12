import React, { Component } from 'react'
import List from './List'
import Content from './Content'

export class Dashboard extends Component {
    render() {
        return (
            <div className="container-fluid pt-5 h100">
                <div className="row">
                    <List />
                    <Content />

                </div>
            </div>
        )
    }
}

export default Dashboard

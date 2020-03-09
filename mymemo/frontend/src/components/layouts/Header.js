import React, { Component } from 'react'

export class Header extends Component {
    render() {
        return (
            <div className="navbar navbar-dark fixed-top bg-dark p-0 shadow">
                <a className="navbar-brand col-2 mr-0" href="#">My Memo</a>

                <ul className="navbar-nav px-3 col-4 text-right">
                    <li className="nav-item text-nowrap">
                        <a className="nav-link" href="#">Sign out</a>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Header

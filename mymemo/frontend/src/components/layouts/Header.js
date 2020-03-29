import React, { Component } from 'react'
import Axios from 'axios'
import { logout_user } from '../../actions/auth'
import PropTypes from "prop-types";
import { connect } from "react-redux";
export class Header extends Component {
    static propTypes = {
        logout_user: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired
    };
    render() {
        return (
            <div className="navbar navbar-dark fixed-top bg-dark p-0 shadow">
                <a className="navbar-brand col-2 mr-0" href="#">My Memo</a>

                <ul className="navbar-nav px-3 col-4 text-right">
                    <li className="nav-item text-nowrap">
                        {
                            this.props.auth.isAuthenticated ? <a className="nav-link" href="#" onClick={() => { this.props.logout_user() }}>Sign out</a> : ''
                        }

                    </li>
                </ul>
            </div>
        )
    }
}
const mapStateToAuth = (state) => ({
    auth: state.auth
});

export default connect(mapStateToAuth, { logout_user })(Header);

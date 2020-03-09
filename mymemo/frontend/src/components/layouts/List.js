import React, { Component } from 'react'


import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getMemos } from '../../actions/memo'
import store from "../../store";
export class List extends Component {
    static propTypes = {
        memos: PropTypes.array.isRequired,
        getMemos: PropTypes.func.isRequired
    }
    componentDidMount() {
        this.props.getMemos();
    }
    render() {
        return (
            <nav className="col-2 d-none d-block bg-light sidebar">
                <div className="sidebar-sticky">
                    <ul className="nav flex-column">
                        <input className="form-control form-control-dark col-11 mx-auto" aria-label="Search" type="text" placeholder="Search"></input>
                        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-1 mb-1 text-muted">

                            <a className="d-flex align-items-center text-muted text-decoration-none" aria-label="Add a new report" href="#">
                                <span>Add Memo</span>&nbsp;&nbsp;
                                <svg xmlns="http://www.w3.org/2000/svg" className="feather feather-plus-circle" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>
                            </a>
                        </h6>


                        {
                            this.props.memos.map(memo => (
                                <li className="nav-item memo-item" key={memo.id}>
                                    <a className="nav-link active" href="#">
                                        {memo.title}
                                    </a>
                                </li>
                            ))
                        }


                    </ul>
                </div>
            </nav>
        )
    }
}
const mapStateToProps = (state) => ({
    memos: state.memos.memos
})

export default connect(mapStateToProps, { getMemos })(List)

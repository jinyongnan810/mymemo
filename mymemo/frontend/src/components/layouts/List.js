import React, { Component } from 'react'


import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getMemos, saveMemo } from '../../actions/memo'
import store from "../../store";
import * as types from "../../actions/types"
export class List extends Component {
    static propTypes = {
        memos: PropTypes.array.isRequired,
        currentMemo: PropTypes.object.isRequired,
        getMemos: PropTypes.func.isRequired,
        saveMemo: PropTypes.func.isRequired,
    }
    state = { currentId: null }
    componentDidUpdate(preProps) {
        if (preProps.currentMemo != this.props.currentMemo) {
            this.setState({ currentId: this.props.currentMemo.id })
        }
    }
    componentDidMount() {
        this.props.getMemos();
    }
    selectMemo = (id) => {
        store.dispatch({ type: types.SELECT_MEMO, payload: id })
    }
    startEditTitle = (e, id) => {
        e.stopPropagation();
        const newState = {};
        newState[id + '-titleEdit'] = true
        this.setState(newState)
        $(`#memo-${id}`).focus();
    }
    endEditTitle = (e, id) => {
        e.stopPropagation();
        const newState = {};
        newState[id + '-titleEdit'] = false
        this.setState(newState);
        const memo = this.props.memos.find(memo => memo.id == id);
        const title = $(`#memo-${id}`).html().replace('<br>', '').trim();
        if (title) {
            console.log(`title:${title}.`)
            this.props.saveMemo({ id: memo.id, title: title });
        } else {
            $(`#memo-${id}`).html(memo.title);
        }

    }
    render() {
        return (
            <nav className="col-2 d-none d-block bg-light sidebar">
                <div className="sidebar-sticky">
                    <ul className="nav flex-column">
                        <input className="form-control form-control-dark col-11 mx-auto" aria-label="Search" type="text" placeholder="Search"></input>
                        <h6 className="sidebar-heading d-flex mx-auto px-3 mt-1 mb-1 text-muted">
                            <a className="d-flex align-items-center text-muted text-decoration-none" aria-label="Add a new report" href="#">
                                <span>Add Memo</span>&nbsp;&nbsp;
                                <svg xmlns="http://www.w3.org/2000/svg" className="feather feather-plus-circle" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>
                            </a>
                        </h6>


                        {
                            this.props.memos.map(memo => (
                                <li className={memo.id == this.state.currentId ? "memo-active memo-item px-3" : "memo-item px-3"} key={memo.id} onClick={() => this.selectMemo(memo.id)}>
                                    <a className="active memo-title" id={"memo-" + memo.id} href="#" contentEditable={this.state[memo.id + '-titleEdit'] ? 'true' : 'false'}>
                                        {memo.title}
                                    </a>
                                    {
                                        this.state[memo.id + '-titleEdit'] ?
                                            (<div className="edit-title-done" onClick={(e) => this.endEditTitle(e, memo.id)}>done</div>)
                                            : (<div className="edit-title" onClick={(e) => this.startEditTitle(e, memo.id)} >edit</div>)
                                    }


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
    memos: state.memos.memos,
    currentMemo: state.memos.currentMemo
})

export default connect(mapStateToProps, { getMemos, saveMemo })(List)

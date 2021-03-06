import React, { Component } from 'react'


import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getMemos, saveMemo, addMemo, deleteMemo } from '../../actions/memo'
import store from "../../store";
import * as types from "../../actions/types"
export class List extends Component {
    static propTypes = {
        memos: PropTypes.array.isRequired,
        currentMemo: PropTypes.object,
        getMemos: PropTypes.func.isRequired,
        saveMemo: PropTypes.func.isRequired,
    }
    state = { currentId: null, search: null, marking: {}, memos: [] }
    componentDidUpdate(preProps) {
        if (preProps.currentMemo != this.props.currentMemo) {
            this.setState({ currentId: this.props.currentMemo ? this.props.currentMemo.id : null })
        }
        if (preProps.memos != this.props.memos) {
            this.setState({ memos: this.props.memos })
        }

    }
    componentDidMount() {
        this.props.getMemos();
    }
    selectMemo = (id) => {
        store.dispatch({ type: types.SELECT_MEMO, payload: id })
    }
    onChange = (e, id) => {
        const title = e.target.value

        if (title) {
            const memos = this.state.memos.slice()
            memos.map(memo => {
                if (memo.id == id) {
                    memo.title = title
                }
            })
            this.setState({ memos: memos })
        }
    }
    editTitle = (e, id) => {
        const title = e.target.value
        this.props.saveMemo({ id: id, title: title });

    }
    addMemo = () => {
        this.props.addMemo();
    }
    delMemo = (e, id) => {
        e.stopPropagation();
        if (confirm('Are you sure to delete this memo?')) {
            this.props.deleteMemo(id);
        }
    }
    search = (text, e) => {
        const searchText = text.trim();
        const newMarking = {};
        if (searchText) {
            this.props.memos.map(memo => {
                if (memo.title.toUpperCase().indexOf(searchText.toUpperCase()) > -1 || memo.content.toUpperCase().indexOf(searchText.toUpperCase()) > -1) {
                    newMarking[memo.id] = true;
                } else {
                    newMarking[memo.id] = false;
                }
            })
        }
        this.setState({ marking: newMarking });
        if (e) {
            store.dispatch({ type: types.SEARCH_CHANGED, payload: text })
        }

    }

    render() {
        return (
            <nav className="col-2 d-none d-block bg-light sidebar">
                <div className="sidebar-sticky">
                    <ul className="nav flex-column">
                        <input id="memo-search" onChange={(e) => this.search(e.target.value, e)} className="form-control form-control-dark col-11 mx-auto" aria-label="Search" type="text" placeholder="Search"></input>
                        <h6 className="sidebar-heading d-flex mx-auto px-3 mt-1 mb-1 text-muted">
                            <a className="d-flex align-items-center text-muted text-decoration-none" aria-label="Add a new report" href="#" onClick={() => this.addMemo()}>
                                <span>Add Memo</span>&nbsp;&nbsp;
                                <svg xmlns="http://www.w3.org/2000/svg" className="feather feather-plus-circle" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>
                            </a>
                        </h6>


                        {
                            this.state.memos.map(memo => (
                                <li className={memo.id == this.state.currentId ? ("memo-active memo-item px-3 " + (this.state.marking[memo.id] ? "memo-marking" : "")) : ("memo-item px-3 " + (this.state.marking[memo.id] ? "memo-marking" : ""))} key={memo.id} id={memo.id} onClick={() => this.selectMemo(memo.id)}>
                                    <input className="memo-title" id={"memo-" + memo.id} value={memo.title} onChange={e => { this.onChange(e, memo.id) }} onBlur={(e) => { this.editTitle(e, memo.id) }} />
                                    <div className="memo-delete" onClick={(e) => { this.delMemo(e, memo.id) }}>×</div>
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

export default connect(mapStateToProps, { getMemos, saveMemo, addMemo, deleteMemo })(List)

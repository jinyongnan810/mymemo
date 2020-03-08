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
            <ul>
                {this.props.memos.map((memo) => (
                    <li key={memo.id}>{memo.title}</li>
                ))}
            </ul>

        )
    }
}
const mapStateToProps = (state) => ({
    memos: state.memos.memos
})

export default connect(mapStateToProps, { getMemos })(List)

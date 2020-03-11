import React, { Component } from 'react'
import { saveMemo } from '../../actions/memo'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown'
export class Content extends Component {
    static propTypes = {
        currentMemo: PropTypes.object.isRequired,
        saveMemo: PropTypes.func.isRequired,
    }
    state = { id: null, content: null }
    componentDidUpdate(preProps) {
        if (preProps.currentMemo != this.props.currentMemo) {
            if (this.props.currentMemo) {
                this.setState({ id: this.props.currentMemo.id, content: this.props.currentMemo.content })
            } else {
                this.setState({ id: null, content: null })
            }
        }

    }
    render() {
        return (
            <main className="col-10 ml-auto px-4" role="main">
                <ReactMarkdown source={this.state.content} />
            </main>
        )
    }
}
const mapStateToProps = (state) => ({
    currentMemo: state.memos.currentMemo
})

export default connect(mapStateToProps, { saveMemo })(Content)

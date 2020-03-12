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
    state = { id: null, content: null, editing: false }
    componentDidUpdate(preProps) {
        if (preProps.currentMemo != this.props.currentMemo) {
            if (this.props.currentMemo) {
                if (this.state.editing) {
                    const newContent = $(".memo-editor").val()
                    this.props.saveMemo({ id: this.state.id, content: newContent });
                    this.setState({ editing: false })
                }
                this.setState({ id: this.props.currentMemo.id, content: this.props.currentMemo.content, editing: false })
            } else {
                this.setState({ id: null, content: null, editing: false })
            }
        }

    }
    toggleEdit = () => {
        if (this.state.id) {
            if (!this.state.editing) {
                $(".memo-editor").val(this.state.content).focus();
            } else {
                const newContent = $(".memo-editor").val()
                this.props.saveMemo({ id: this.state.id, content: newContent });
                this.setState({ content: newContent });
            }
            this.setState({ editing: !this.state.editing })

        }
    }
    render() {
        return (
            <main className="col-10 ml-auto px-4 memo-container" role="main" >
                <button className="memo-edit-btn btn btn-outline-primary" onClick={() => this.toggleEdit()}>{this.state.editing ? "done" : "edit"}</button>
                <div className={this.state.editing ? "memo-content-raw memo-content-show" : "memo-content-raw memo-content-hide"}>
                    <textarea className="memo-editor" disabled={!this.state.editing}>
                    </textarea>
                </div>
                <div className={this.state.editing ? "memo-content memo-content-hide" : "memo-content memo-content-show"}>
                    <ReactMarkdown source={this.state.content} />
                </div>
            </main>
        )
    }
}
const mapStateToProps = (state) => ({
    currentMemo: state.memos.currentMemo
})

export default connect(mapStateToProps, { saveMemo })(Content)

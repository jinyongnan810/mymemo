import React, { Component } from 'react'
import { saveMemo } from '../../actions/memo'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown/with-html'
export class Content extends Component {
    static propTypes = {
        currentMemo: PropTypes.object.isRequired,
        searching: PropTypes.string.isRequired,
        saveMemo: PropTypes.func.isRequired,
    }
    state = { id: null, content: null, editing: false, searching: "", searchingMarked: "" }
    componentDidUpdate(preProps) {
        if (preProps.currentMemo != this.props.currentMemo || preProps.currentMemo.content != this.props.currentMemo.content) {
            if (this.props.currentMemo) {
                if (this.state.editing) {
                    const newContent = $(".memo-editor").val()
                    this.props.saveMemo({ id: this.state.id, content: newContent });
                    this.setState({ editing: false })
                }
                this.setState({ id: this.props.currentMemo.id, content: this.props.currentMemo.content, editing: false, searchingMarked: this.props.currentMemo.content })
            } else {
                this.setState({ id: null, content: null, editing: false })
            }
            console.log("hello");
            this.getMarked();
            console.log("hello2");
        }
        if (this.props.searching != preProps.searching) {
            this.getMarked();
        }
    }
    getMarked = () => {
        const content = this.props.currentMemo.content;
        if (this.props.searching && content) {
            const searching = this.props.searching;
            const reg = new RegExp();
            reg.compile(searching, 'ig');
            const ltReg = /</g;
            const gtReg = />/g;
            let split = content.split(reg)
            let matches = content.match(reg)
            let marked = ""
            for (let i = 0; i < split.length - 1; i++) {
                const ltCount = split[i].match(ltReg);
                const gtCount = split[i].match(gtReg);
                if ((ltCount != null && gtCount != null && ltCount.length != gtCount.length) || (ltCount == null && gtCount == null))
                    marked += split[i] + `<span class="memo-marking-word">${matches[i]}</span>`
                else
                    marked += split[i] + matches[i]
            }
            marked += split[split.length - 1]
            this.setState({ searchingMarked: marked });
        } else {
            this.setState({ searchingMarked: content });
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
            <main className="col-10 ml-auto px-4 memo-container" role="main" onDoubleClick={() => this.toggleEdit()}>
                <button className="memo-edit-btn btn btn-outline-primary" onClick={() => this.toggleEdit()}>{this.state.editing ? "done" : "edit"}</button>
                <div className={this.state.editing ? "memo-content-raw memo-content-show" : "memo-content-raw memo-content-hide"}>
                    <textarea className="memo-editor" disabled={!this.state.editing}>
                    </textarea>
                </div>
                <div className={this.state.editing ? "memo-content memo-content-hide" : "memo-content memo-content-show"}>
                    {console.log(`hi:${this.state.searchingMarked}`)}
                    <ReactMarkdown source={this.state.searchingMarked} escapeHtml={false} />
                </div>
            </main>
        )
    }
}
const mapStateToProps = (state) => ({
    currentMemo: state.memos.currentMemo,
    searching: state.memos.searching
})

export default connect(mapStateToProps, { saveMemo })(Content)

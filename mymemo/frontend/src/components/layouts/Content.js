import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { saveMemo } from '../../actions/memo'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown/with-html'
import DropToUpload from 'react-drop-to-upload';
import Axios from 'axios';
import CodeBlock from '../common/CodeBlock'
import { createMessage, returnErrors } from '../../actions/messages'
export class Content extends Component {
    static propTypes = {
        currentMemo: PropTypes.object,
        searching: PropTypes.string.isRequired,
        saveMemo: PropTypes.func.isRequired,
    }
    state = { id: null, content: null, editing: false, searching: "", searchingMarked: "", fullscreen: false }
    componentDidUpdate(preProps) {
        if (!this.props.currentMemo) {
            return
        }
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
            this.getMarked();
        }
        if (this.props.searching != preProps.searching) {
            this.getMarked();
        }
    }
    getMarked = () => {
        const content = this.props.currentMemo ? this.props.currentMemo.content : '';
        // if (this.props.searching && content) {
        //     const searching = this.props.searching;
        //     const reg = new RegExp();
        //     reg.compile(searching, 'ig');
        //     const ltReg = /<|\(|\[/g;
        //     const gtReg = />|\)|\]/g
        //     let split = content.split(reg)
        //     let matches = content.match(reg)
        //     let marked = ""
        //     for (let i = 0; i < split.length - 1; i++) {
        //         const ltCount = split[i].match(ltReg);
        //         const gtCount = split[i].match(gtReg);
        //         if ((ltCount != null && gtCount != null && ltCount.length != gtCount.length) || (ltCount == null && gtCount == null))
        //             marked += split[i] + `<span class="memo-marking-word">${matches[i]}</span>`
        //         else
        //             marked += split[i] + matches[i]
        //     }
        //     marked += split[split.length - 1]
        //     this.setState({ searchingMarked: marked });
        // } else {
        this.setState({ searchingMarked: content });
        // }
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
    handleDrop(files) {
        var data = new FormData();
        data.append('id', this.props.currentMemo.id)
        files.forEach((file, index) => {
            if (file.size < 10485760 && file.size > 0) {
                data.append('file_field', file);
            }
        });
        let config = {
            headers: {
                "X-CSRFToken": $("[name=csrfmiddlewaretoken]").val(),
            }
        }
        Axios.post('/upload', data, config)
            .then((res) => {
                const files = res.data;
                files.map(file => {
                    const split = file.name.split('.')
                    const ext = split[split.length - 1]
                    const isImage = ['jpg', 'jpeg', 'png'].indexOf(ext) > -1
                    let downloadLink;
                    if (isImage) {
                        downloadLink = ` ![${file.name}](${file.url})`
                    } else {
                        downloadLink = ` [${file.name}](${file.url})`
                    }
                    this.insertToCursor(downloadLink)
                    dispatch(createMessage('upload success!'))
                })
            })
            .catch((err) => {
                dispatch(returnErrors(err.response.data, err.response.status));
            })
        // fetch('/upload', {
        //     method: 'POST',
        //     body: data
        // });
        $(".memo-file-drop").removeClass("memo-file-drop-dragenter")
    }
    componentDidMount() {
        const filedrop = document.querySelector(".memo-file-drop");
        if (!filedrop) return
        const dom = ReactDOM.findDOMNode(filedrop)
        dom.addEventListener('dragenter', this.onDragEnter)
        dom.addEventListener('dragover', this.onDragEnter)
        dom.addEventListener('dragleave', this.onDragLeave)

        const filedropParent = document.querySelector(".memo-content-raw");
        const domParent = ReactDOM.findDOMNode(filedropParent)
        domParent.addEventListener('dragenter', this.onDragEnter)
        domParent.addEventListener('dragover', this.onDragEnter)
        // domParent.addEventListener('dragleave', this.onDragLeave)

        const textarea = document.querySelector(".memo-editor");
        const textareaDom = ReactDOM.findDOMNode(textarea)
        textareaDom.addEventListener('focus', this.onDragLeave)
    }
    onDragEnter = (e) => {
        // e.stopPropagation();
        $(".memo-file-drop").addClass("memo-file-drop-dragenter")
    }
    onDragLeave = (e) => {
        // e.stopPropagation();
        $(".memo-file-drop").removeClass("memo-file-drop-dragenter")
    }
    onKeyDown = (e) => {
        var keyCode = e.keyCode || e.which;
        // allow tab
        if (keyCode == 9) {
            e.preventDefault();
            this.insertToCursor("\t")
        }
        // save
        if (event.ctrlKey || event.metaKey) {
            if (keyCode == 83) {
                e.preventDefault();
                this.toggleEdit();
            }
        }

        // color
        if (event.ctrlKey) {
            if (keyCode == 84) {
                e.preventDefault();
                this.insertColor()
            }
        }

        // link
        if (event.ctrlKey) {
            if (keyCode == 76) {
                e.preventDefault();
                this.insertLink()
            }
        }


    }
    toggleFullScreen = () => {
        $(".row").toggleClass('memo-fullscreen')
        this.setState({ fullscreen: !this.state.fullscreen })
    }
    insertToCursor = (text) => {
        let textarea = $(".memo-editor")[0]
        let start = textarea.selectionStart;
        let end = textarea.selectionEnd;

        $(textarea).val($(textarea).val().substring(0, start)
            + text
            + $(textarea).val().substring(end));

        textarea.selectionStart = start + 1
        textarea.selectionEnd = start + 1;
    }
    insertColor = () => {
        const text1 = "<span style='color:skyblue'>";
        const text2 = "</span>"
        const cursorStart = 19
        const cursorEnd = 26
        this.insertToCursorSide(text1, text2, cursorStart, cursorEnd)
    }
    insertLink = () => {
        const text1 = "[";
        const text2 = "]()"
        const cursorStart = null
        const cursorEnd = null
        this.insertToCursorSide(text1, text2, cursorStart, cursorEnd)
    }
    insertToCursorSide = (text1, text2, cursorStart, cursorEnd) => {
        let textarea = $(".memo-editor")[0]
        let start = textarea.selectionStart;
        let end = textarea.selectionEnd;
        let length = end - start;

        $(textarea).val($(textarea).val().substring(0, start)
            + text1
            + $(textarea).val().substring(start, end)
            + text2
            + $(textarea).val().substring(end));
        if (cursorStart) {
            textarea.selectionStart = start + cursorStart
            textarea.selectionEnd = start + cursorEnd;
        } else {
            textarea.selectionStart = start + 1 + length + 2
            textarea.selectionEnd = textarea.selectionStart
        }

    }


    render() {
        return (
            this.props.currentMemo ?
                (<main className="col-10 ml-auto px-4 memo-container" role="main" onDoubleClick={() => this.toggleEdit()}>
                    <div className="memo-btns">
                        <button className="memo-fullscreen-btn btn btn-outline-success" onClick={() => this.toggleFullScreen()}>{this.state.fullscreen ? "cancel fullscreen" : "fullscreen"}</button>
                        <button className="memo-edit-btn btn btn-outline-primary" onClick={() => this.toggleEdit()}>{this.state.editing ? "done" : "edit"}</button>
                    </div>

                    <div className={this.state.editing ? "memo-content-raw memo-content-show" : "memo-content-raw memo-content-hide"}>
                        <textarea className="memo-editor" disabled={!this.state.editing} onKeyDown={e => this.onKeyDown(e)}>
                        </textarea>
                        <DropToUpload onDrop={(files) => this.handleDrop(files)} className="memo-file-drop">
                            <span>Drop file here to upload</span>
                        </DropToUpload>

                    </div>
                    <div className={this.state.editing ? "memo-content memo-content-hide" : "memo-content memo-content-show"}>
                        <ReactMarkdown source={this.state.searchingMarked} escapeHtml={false} linkTarget='_blank' renderers={{ code: CodeBlock }} />
                    </div>

                </main>)
                :
                (<main></main>)
        )
    }
}
const mapStateToProps = (state) => ({
    currentMemo: state.memos.currentMemo,
    searching: state.memos.searching
})

export default connect(mapStateToProps, { saveMemo })(Content)

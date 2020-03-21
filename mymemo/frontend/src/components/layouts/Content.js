import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { saveMemo } from '../../actions/memo'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown/with-html'
import DropToUpload from 'react-drop-to-upload';
import Axios from 'axios';
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
            this.getMarked();
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
                let config = {
                    headers: {
                        "X-CSRFToken": $("[name=csrfmiddlewaretoken]").val(),
                    }
                }
                const newContent = $(".memo-editor").val()
                this.props.saveMemo({ id: this.state.id, content: newContent, config: config });
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
        console.log(`form:${JSON.stringify(data)}`)
        let config = {
            headers: {
                "X-CSRFToken": $("[name=csrfmiddlewaretoken]").val(),
            }
        }
        Axios.post('/upload', data, config)
            .then((res) => {
                const files = res.data;
                console.log(`files:${JSON.stringify(files)}`)
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
                    let content = $(".memo-editor").val();
                    content += downloadLink;
                    $(".memo-editor").val(content)
                })
            })
            .catch((e) => {
                console.log(`e:${JSON.stringify(e.message)}`)
            })
        // fetch('/upload', {
        //     method: 'POST',
        //     body: data
        // });
        $(".memo-file-drop").removeClass("memo-file-drop-dragenter")
    }
    componentDidMount() {
        const filedrop = document.querySelector(".memo-file-drop");
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


    render() {
        return (
            <main className="col-10 ml-auto px-4 memo-container" role="main" onDoubleClick={() => this.toggleEdit()}>
                <button className="memo-edit-btn btn btn-outline-primary" onClick={() => this.toggleEdit()}>{this.state.editing ? "done" : "edit"}</button>
                <div className={this.state.editing ? "memo-content-raw memo-content-show" : "memo-content-raw memo-content-hide"}>
                    <textarea className="memo-editor" disabled={!this.state.editing}>
                    </textarea>
                    <DropToUpload onDrop={(files) => this.handleDrop(files)} className="memo-file-drop">
                        <span>Drop file here to upload</span>
                    </DropToUpload>

                </div>
                <div className={this.state.editing ? "memo-content memo-content-hide" : "memo-content memo-content-show"}>
                    {console.log(`hi:${this.state.searchingMarked}`)}
                    <ReactMarkdown source={this.state.searchingMarked} escapeHtml={false} linkTarget='_blank' />
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

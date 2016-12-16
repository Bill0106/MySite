import * as React from 'react';
import * as showdown from 'showdown';
import { browserHistory } from 'react-router';
import axios from 'axios';

import { BlogProps, BlogState } from '../interface/blog';

export class Blog extends React.Component<BlogProps, BlogState> {
    constructor(props) {        
        super(props);

        this.state = {
            id: '',
            file: '',
            title: '',
            image: '',
            summary: '',
            markdown_contents: '',
            html_contents: '',
            url: '',
            game_id: '',
            published: false,
        }
    }

    handleUpload(e) {
        e.preventDefault();
        let data = new FormData();
        data.append('file', this.state.file);

        axios.post('/blogs/upload', data)
            .then(response => {
                if (response.data.success) {
                    let state = this.state;
                    state['url'] = response.data.data.name;
                    state['markdown_contents'] = response.data.data.markdown;
                    state['html_contents'] = response.data.data.html;
                    this.setState(state);
                }
            })
    }

    handleChange(e) {
        let converter = new showdown.Converter();
        converter.setOption('noHeaderId', 'true');
        let state = this.state;
        let name = e.target.name;

        switch (name) {
            case 'file':
                state['file'] = e.target.files[0];
                break;
            case 'markdown_contents':
                let html = converter.makeHtml(e.target.value);
                state['html_contents'] = html;
                state['markdown_contents'] = e.target.value;
                break;
            default:
                state[e.target.name] = e.target.value
                break;
        }

        this.setState(state);
    }

    handleSubmit(e) {
        e.preventDefault();
        let url = '/blogs/';
        if (this.props.params['url'] != 'add') {
            url = url + this.props.params['url'];
        }

        axios.post(url, this.state)
            .then(response => {
                if (response.data.success) {
                    browserHistory.push('/admin/blogs');
                }
            })
    }

    componentDidMount() {
        if (this.props.params['url'] != 'add') {
            axios.get('/blogs/' + this.props.params['url'])
                .then(response => {
                    let data = response.data;
                    let pattern = /\<p\>(.*)\<\/p\>/;
                    let html = response.data.html_contents;
                    let matches = pattern.exec(html);
                    
                    this.setState({
                        id: data._id,
                        file: '',
                        title: data.title,
                        image: data.image,
                        summary: data.summary ? data.summary : matches[1],
                        markdown_contents: data.markdown_contents,
                        html_contents: html,
                        url: data.url,
                        game_id: data.game_id,
                        published: data.published,
                    })
                })
        }
    }


    render() {
        if (this.state.markdown_contents != '') {
            return (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <section className="page-header">
                                <h1>Blog - Edit</h1>
                            </section>
                        </div>
                    </div>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div className="row">
                            <div className="col-sm-12">
                                <label htmlFor="title">Title:</label>
                                <div className="form-group">
                                    <input type="text" value={this.state.title} name="title" id="title" onChange={this.handleChange.bind(this)} className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <label htmlFor="url">URL:</label>
                                <div className="form-group">
                                    <input type="text" value={this.state.url} name="url" id="url" onChange={this.handleChange.bind(this)} className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <label htmlFor="game_id">Game:</label>
                                <div className="form-group">
                                    <input type="text" value={this.state.game_id} name="game_id" id="game_id" onChange={this.handleChange.bind(this)} className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <label htmlFor="summary">Summary:</label>
                                <div className="form-group">
                                    <textarea name="summary" id="summary" rows={10} className="form-control" value={this.state.summary} onChange={this.handleChange.bind(this)}></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <div>
                                        <label htmlFor="active">Active:</label>
                                    </div>
                                    <label className="checkbox-inline">
                                        <input type="checkbox" name="published" value="1" checked={this.state.published == true}
                                            onChange={this.handleChange.bind(this)} /> Publish
                                </label>
                                    <label className="checkbox-inline">
                                        <input type="checkbox" name="published" value="0" checked={this.state.published == false}
                                            onChange={this.handleChange.bind(this)} /> Unpublish
                                </label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label htmlFor="markdown_contents">Markdown Contents:</label>
                                    <textarea value={this.state.markdown_contents} className="form-control" rows={30} name="markdown_contents" onChange={this.handleChange.bind(this)} />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label htmlFor="html_contents">HTML Contents:</label>
                                    <textarea disabled value={this.state.html_contents} className="form-control" rows={30} name="html_contents" onChange={this.handleChange.bind(this)} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <button className="btn btn-success" type="submit">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            );
        } else {
            return (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <section className="page-header">
                                <h1>Blog - Add</h1>
                            </section>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <form onSubmit={this.handleUpload.bind(this)}>
                                <div className="form-group">
                                    <label htmlFor="file">Upload Blog File:</label>
                                    <input type="file" className="form-control" id="file" name="file" onChange={this.handleChange.bind(this)} />
                                </div>
                                <button className="btn btn-success" type="submit">Upload</button>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
    }
}
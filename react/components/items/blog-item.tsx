import * as React from 'react';
import { Link } from 'react-router';

import { ListItemProps } from '../../interface/list';

import { time2Date } from '../../helpers';

export class BlogItem extends React.Component<ListItemProps, {}> {
    handleDelete() {
        this.props.delete(this.props.data);
    }

    handlePublish() {
        let url = 'blogs/' + this.props.data.url;
        if (this.props.data.published) {
            url = url + '/unpublish';
        } else {
            url = url + '/publish';
        }

        this.props.func(url, this.props.data._id);
    }
    
    render() {
        return (
            <tr>
                <td>{this.props.data._id}</td>
                <td>{this.props.data.title}</td>
                <td>{this.props.data.game ? this.props.data.game.title : ''}</td>
                <td>{this.props.data.published ? 'True' : 'False'}</td>
                <td>{time2Date(this.props.data.updated_at, true)}</td>
                <td>{time2Date(this.props.data.created_at, true)}</td>
                <td>
                    <Link to={'/admin/blogs/' + this.props.data.url} className="btn btn-primary">Edit</Link>
                    <button className="btn btn-danger" type="button" onClick={this.handleDelete.bind(this)}>Delete</button>
                    <button className="btn btn-success" type="button" onClick={this.handlePublish.bind(this)}>{this.props.data.published ? 'Unpublish' : 'Publish'}</button>
                </td>
            </tr>
        )
    }
}
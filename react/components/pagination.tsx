import * as React from 'react';
import { Link } from 'react-router';

import { PaginationProps } from '../interface/pagination';

export class Pagination extends React.Component<PaginationProps, {}> {
    render() {
        let pages = Math.ceil(this.props.total / this.props.per);
        let indent = [];
        for (let i = 0; i < pages; i++) {
            let url = '/admin' + this.props.link + '?page=' + (i + 1);
            let isActive = this.props.current == i + 1 ? 'active' : '';
            indent.push(<li key={i} className={isActive}><Link to={url}>{i + 1}</Link></li>)
        }

        return (
            <nav aria-label="Page navigation">
                <ul className="pagination">
                    {indent}
                </ul>
            </nav>
        )
    }
}
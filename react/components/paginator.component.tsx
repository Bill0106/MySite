import * as React from 'react';
import { Link } from 'react-router';

import { PaginatorProps } from '../interface/page.interface';

class Pagination extends React.Component<PaginatorProps, {}> {
    render() {
        const { total, per, current, path } = this.props;
        let pages = Math.ceil(total / per);
        let indent = [];
        for (let i = 0; i < pages; i++) {
            let active = false;
            let url = path;
            if (i > 0) {
                url = path + '?page=' + (i + 1);
            }

            if ((!current && i === 0) || (current && current == i + 1)) {
                active = true;
            }

            indent.push(<li key={i} className={active ? 'active' : ''}><Link to={url}>{i + 1}</Link></li>);
        }

        return (
            <div className="row">
                <div className="col-sm-12">
                    <ul className="pagination">
                        {indent}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Pagination;
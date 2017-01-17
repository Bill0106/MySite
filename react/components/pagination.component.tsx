import * as React from 'react';

interface PaginationProps extends React.Props<any> {
    total: number;
    per: number;
    current: number;
    clickEvent: any;
}

class Pagination extends React.Component<PaginationProps, void> {
    handleClick(e) {
        e.preventDefault();
        const { clickEvent } = this.props;
        clickEvent(parseInt(e.target.text));
    }

    render() {
        const { total, per, current } = this.props;
        const pages = Math.ceil(total / per);

        return (
            <ul className="pagination">
                {
                    Array(pages).fill(null).map((_, i) => {
                        return (
                            <li className={i + 1 === current ? 'active' : ''} key={i}>
                                <a href="#" onClick={this.handleClick.bind(this)} >{i + 1}</a>
                            </li>
                        );
                    })
                }
            </ul>
        );
    }
}

export default Pagination;
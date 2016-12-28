import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import Alert from './alert.component';
import PageHeader from './page-header.component';
import Paginator from './paginator.component';
import GamesItem from './games-item.component';

interface ListProps extends RouteComponentProps<void, void> {
    type: string;
    list: any;
    getList: any;
    postDelete: any;
}

class List extends React.Component<ListProps, void> {
    componentWillMount() {
        const { type } = this.props;
        document.title = type + ' | Admin';
    }

    componentDidMount() {
        const { getList, location, list } = this.props;
        const page = location.query['page'] ? parseInt(location.query['page']) : 1;

        if (list.fetchedPages.indexOf(page) < 0) {
            getList(location.query['page']);
        }
    }

    componentWillUpdate(nextProps) {
        const { location } = nextProps;
        const { getList, list } = this.props;
        const page = location.query['page'] ? parseInt(location.query['page']) : 1;

        if (this.props.location.query['page'] != location.query['page'] && list.fetchedPages.indexOf(page) < 0) {
            getList(location.query['page']);
        }
    }

    handleItems(item, key): any {
        const { type, postDelete } = this.props;
        let element = null;
        switch (type) {
            case 'Games':
                element = <GamesItem key={key} data={item} delete={() => postDelete(item.url)} />
                break;
            default:
                break;
        }

        return element
    }

    handleContent(list, type, page): any {
        if (list.isFetching || list.error) {
            return '';
        }

        const _page = page ? parseInt(page) : 1;
        const per = (type == 'Hearthstonr-Matches') ? 100 : 30;
        const index = list.fetchedPages.indexOf(_page);
        if (index < 0) {
            return '';
        }

        const start = per * index;
        const items = list.items.slice(start, start + per);
        let indent = [];
        items.map((item, key) => {
            indent.push(this.handleItems(item, key));
        });

        return (
            <div className="row">
                <div className="col-sm-12">
                    <table className="table table-bordered admin-table-list">
                        <tbody>{indent}</tbody>
                    </table>
                </div>
            </div>
        );
    }

    render() {
        const { list, type, location } = this.props;

        return (
            <div className="container-fluid">
                <PageHeader title={type} button={true} total={list.total} />
                <Alert fetch={list} />
                {this.handleContent(list, type, location.query['page'])}
                <Paginator total={list.total} path={location.pathname} current={location.query['page']} per={type == 'Hearthstonr-Matches' ? 100 : 30} />
            </div>
        );
    }
}

export default List;
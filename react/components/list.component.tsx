import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Alert from './alert.component';
import PageHeader from './page-header.component';
import Paginator from './paginator.component';
import GamesItem from './games-item.component';
import GourmetsItem from './gourmets-item.component';
import HearthstoneSeasonsItem from './hearthstone-seasons-item.component';
import HearthstoneDecksItem from './hearthstone-decks-item.component';

interface ListProps extends RouteComponentProps<void, void> {
    type: string;
    list: any;
    getList: any;
    postDelete: any;
    activeDeck: any;
    inactiveDeck: any;
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

    componentWillReceiveProps(nextProps) {
        const { location } = nextProps;
        const { getList, list } = this.props;
        const page = location.query['page'] ? parseInt(location.query['page']) : 1;

        if (this.props.location.query['page'] !== location.query['page'] && list.fetchedPages.indexOf(page) < 0) {
            getList(location.query['page']);
        }
    }

    handleItems(item: any, key: number): any {
        const { type, postDelete } = this.props;

        switch (type) {
            case 'Games':
                return <GamesItem key={key} data={item} delete={() => postDelete(item.url)} />;
            case 'Gourmets':
                return <GourmetsItem key={key} data={item} delete={() => postDelete(item._id)} />;
            case 'Hearthsonte-Seasons':
                return <HearthstoneSeasonsItem key={key} data={item} delete={() => postDelete(item.url)} />;
            case 'Hearthsonte-Decks':
                const { inactiveDeck, activeDeck } = this.props;
                return <HearthstoneDecksItem key={key} data={item} delete={() => postDelete(item._id)} active={() => activeDeck(item._id)} inactive={() => inactiveDeck(item._id)} />;
            default:
                return '';
        }
    }

    handleContent(list: any, type: string, page: string): any {
        const _page = page ? parseInt(page) : 1;
        const per = (type === 'Hearthstonr-Matches') ? 100 : 30;
        const index = list.fetchedPages.indexOf(_page);

        const start = per * index;
        const items = list.items.slice(start, start + per);

        return items;
    }

    render() {
        const { list, type, location } = this.props;
        const { isFetching, error } = list;
        const items = this.handleContent(list, type, location.query['page']);

        return (
            <div className="container-fluid">
                <PageHeader title={type} button={true} total={list.total} />
                <Alert isFetching={isFetching} error={error} isPosting={false} posted={false} />
                <div className="row">
                    <div className="col-sm-12">
                        <table className="table table-bordered admin-table-list">
                            <tbody>
                                {
                                    items.map((item, key) => {
                                        return this.handleItems(item, key);
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <Paginator total={list.total} path={location.pathname} current={location.query['page']} per={type === 'Hearthstonr-Matches' ? 100 : 30} />
            </div>
        );
    }
}

export default List;
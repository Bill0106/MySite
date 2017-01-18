import * as React from 'react';
import { RouteComponentProps, browserHistory } from 'react-router';
import Alert from './alert.component';
import PageHeader from './page-header.component';
import Pagination from './pagination.component';
import GamesItem from './games-item.component';
import GourmetsItem from './gourmets-item.component';
import HearthstoneSeasonsItem from './hearthstone-seasons-item.component';
import HearthstoneDecksItem from './hearthstone-decks-item.component';
import HearthstoneMatchesItem from './hearthstone-matches-item.component';

interface ListProps extends RouteComponentProps<void, void> {
    type: string;
    list: any;
    decks: any;
    getList: any;
    getDecks: any;
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

        if (!list.fetchedPages.includes(page)) {
            getList(location.query['page']);
        }
    }

    componentWillReceiveProps(nextProps) {
        const { location, type } = nextProps;
        const { getList, list, getDecks } = this.props;
        const nextDecks = nextProps.decks;
        const thisDecks = this.props.decks;
        const page = location.query['page'] ? parseInt(location.query['page']) : 1;

        if (this.props.location.query['page'] !== location.query['page']
        && !list.fetchedPages.includes(page)) {
            getList(location.query['page']);
        }

        if (type === 'Hearthstone-Matches' && list.fetchedPages.includes(page)) {
            const index = list.fetchedPages.indexOf(page);
            const start = 100 * index;
            const items = list.items.slice(start, start + 100);
            const idsSet = new Set(items.map(e => e.deck_id));
            const ids = Array.from(idsSet).filter(id => thisDecks.items.findIndex(e => e._id === id) < 0);

            if (ids.length && !nextDecks.isFetching) {
                getDecks(ids);
            }
        }
    }

    handleItems(item: any, key: number): any {
        const { type, postDelete } = this.props;

        switch (type) {
            case 'Games':
                return <GamesItem key={key} data={item} delete={() => postDelete(item.url)} />;
            case 'Gourmets':
                return <GourmetsItem key={key} data={item} delete={() => postDelete(item._id)} />;
            case 'Hearthstone-Seasons':
                return <HearthstoneSeasonsItem key={key} data={item} delete={() => postDelete(item.url)} />;
            case 'Hearthstone-Decks':
                const { inactiveDeck, activeDeck } = this.props;
                return <HearthstoneDecksItem key={key} data={item} delete={() => postDelete(item._id)} active={() => activeDeck(item._id)} inactive={() => inactiveDeck(item._id)} />;
            case 'Hearthstone-Matches':
                const { decks } = this.props;
                const deck = decks.items.find(e => e._id === item.deck_id);
                return <HearthstoneMatchesItem key={key} data={item} deck={deck} delete={() => postDelete(item._id)} />;
            default:
                return '';
        }
    }

    handleContent() {
        const { list, location, type } = this.props;
        const { query } = location;
        const page = query && query['page'] ? parseInt(query['page']) : 1;
        const per = (type === 'Hearthstone-Matches') ? 100 : 30;
        const index = list.fetchedPages.indexOf(page);
        const start = per * index;
        const items = list.items.slice(start, start + per);

        return items;
    }

    handlePagination(i) {
        const { type } = this.props;
        const url = `/admin/${type.toLowerCase()}${i === 1 ? '' : `?page=${i}`}`;
        browserHistory.push(url);
    }

    render() {
        const { list, type, location } = this.props;
        const { isFetching, error } = list;
        const items = this.handleContent();

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
                <div className="row">
                    <div className="col-sm-12">
                        <Pagination clickEvent={this.handlePagination.bind(this)} total={list.total}
                                    current={parseInt(location.query['page']) || 1}
                                    per={type === 'Hearthstone-Matches' ? 100 : 30} />
                    </div>
                </div>
            </div>
        );
    }
}

export default List;
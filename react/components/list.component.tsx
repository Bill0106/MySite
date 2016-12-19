import * as React from 'react';

import { ListProps } from '../interface/list.interface';
import Error from './error.component';
import PageHeader from './page-header.component';
import Paginator from './paginator.component';
import GamesItem from './games-item.component';

class List extends React.Component<ListProps, void> {
    componentDidMount() {
        const { getList, location, type } = this.props;
        document.title = type + ' - ' + document.title;
        getList(location.query['page']);
    }

    componentWillReceiveProps(nextProps) {
        const { location } = nextProps;
        const { getList } = this.props;

        if (this.props.location.query['page'] != location.query['page']) {
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
    
    handleContent(list): any {
        if (list.error) {
            return <Error status={list.error.status} text={list.error.data} />;
        } else if (list.fetched) {
            let indent = [];
            list.items.list.map((item, key) => {
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
        } else {
            return 'Loading';
        }
    }

    render() {
        const { list, type, location } = this.props;
        const currentPage = location.query['page'];
        
        return (
            <div className="container-fluid">
                <PageHeader title={type} button={true} total={list.items.total} />
                {this.handleContent(list)}
                <Paginator total={list.items.total} path={location.pathname} current={location.query['page']} per={type == 'Hearthstonr-Matches' ? 100 : 30} />
            </div>
        );
    }
}

export default List;
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import PageHeader from './page-header.component';
import Alert from './alert.component';
import Form from './form.component';

interface ItemProps extends RouteComponentProps<void, void> {
    list: any;
    item: any;
    type: string;
    fields: any;
    initItemCreate: any;
    getItem: any;
    setItem: any;
    createItem: any;
    updateItem: any;
    changeItem: any;
}

class Item extends React.Component<ItemProps, void> {
    componentWillMount() {
        const { initItemCreate, type, params } = this.props;

        if (Object.values(params).indexOf('add') < 0) {
            document.title = `Edit - ${type} | Admin`;
        } else {
            document.title = `Add - ${type} | Admin`;
        }

        initItemCreate();
    }

    componentDidMount() {
        const { params, type, list, getItem, setItem } = this.props;
        const { items } = list;
        const key = (type == 'Game') ? 'url' : 'id';

        let item = this.handleItemSearch();

        if (item) {
            setItem(item);
        } else if (params[key] != 'add') {
            getItem(params[key]);
        }
    }

    componentWillUpdate(nextProps, nextState) {
        const { item, setItem } = nextProps;
        const obj = this.handleItemSearch();

        if (!item.data && obj) {
            setItem(obj);
        }
    }

    handleItemSearch() {
        const { type, list, params } = this.props;
        const { items } = list;

        switch (type) {
            case 'Game':
                return items.find(v => v.url == params['url']);
            default:
                return null;
        }
    }

    handlePost() {
        const { item, createItem, updateItem, params } = this.props;

        if (Object.values(params).indexOf('add') < 0) {
            updateItem(item.data);
        } else {
            createItem(item.data);
        }

        window.scrollTo(0, 0);
    }

    render() {
        const { fields, item, changeItem } = this.props;

        return (
            <div className="container-fluid">
                <Form fields={fields} data={item.data} change={(f, v) => changeItem(f, v)} submit={this.handlePost.bind(this)} />
            </div>
        );
    }
}

export default Item;
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

        let item = this.handleItemSearch();

        if (item) {
            setItem(item);
        } else if (Object.values(params).indexOf('add') < 0) {
            getItem(params);
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

        if (type === 'Gourmet') {
            return items.find(v => v._id === params['id']);
        } else {
            return items.find(v => v.url === params['url']);
        }
    }

    handlePost() {
        const { item, createItem, updateItem, params } = this.props;

        if (Object.values(params).indexOf('add') < 0) {
            updateItem(item.data, params);
        } else {
            createItem(item.data);
        }

        window.scrollTo(0, 0);
    }

    render() {
        const { type, fields, item, list, changeItem } = this.props;
        const { isFetching, isPosting, posted, error } = list;
        const title = `${item.data ? 'Edit' : 'Add'} - ${type}`;

        return (
            <div className="container-fluid">
                <PageHeader title={title} />
                <Alert isPosting={isPosting} isFetching={isFetching} posted={posted} error={error} />
                <Form fields={fields} data={item.data} change={(f, v) => changeItem(f, v)} submit={this.handlePost.bind(this)} />
            </div>
        );
    }
}

export default Item;
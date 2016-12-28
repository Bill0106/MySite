import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { GourmetFields } from '../../config/fields/gourmet';
import PageHeader from './page-header.component';
import Alert from './alert.component';
import Form from './form.component';

interface GourmetPageProps extends RouteComponentProps<void, void> {
    gourmet: any;
    getGourmet: any;
    createGourmet: any;
    updateGourmet: any;
    changeField: any;
    initGourmetCreate: any;
}

class GourmetPage extends React.Component<GourmetPageProps, void> {
    componentDidMount(nextProps, nextState) {
        const { initGourmetCreate, params, getGourmet } = this.props;

        if (params['id'] == 'add') {
            initGourmetCreate();
        } else {
            getGourmet(params['id']);
        }
    }

    handlePost() {
        const { createGourmet, updateGourmet, gourmet, params } = this.props;

        if (params['id'] == 'add') {
            createGourmet(gourmet.item);
        } else {
            createGourmet(gourmet.item);
        }

        window.scrollTo(0, 0);
    }

    render() {
        const { gourmet, params, changeField } = this.props;

        if (gourmet.fetched) {
            document.title = gourmet.item.food + ' - Gourmet | Admin';
        } else {
            document.title = 'Add - Gourmet | Admin';
        }

        return (
            <div className="container-fluid">
                <PageHeader title={params['id'] == 'add' ? 'Add Gourmet' : gourmet.item.food } />
                <Alert fetch={gourmet} />
                <Form fields={GourmetFields} data={gourmet.item} change={(f, v) => changeField(f, v)} submit={this.handlePost.bind(this)} />
            </div>
        );
    }
}

export default GourmetPage;
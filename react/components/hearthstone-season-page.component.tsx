import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { HearthstoneSeasonFields } from '../../config/fields/hearthstone-season';
import PageHeader from './page-header.component';
import Alert from './alert.component';
import Form from './form.component';

interface HearthstoneSeasonPageProps extends RouteComponentProps<void, void> {
    season: any;
    getSeason: any;
    createSeason: any;
    updateSeason: any;
    initSeasonCreate: any;
    changeField: any;
}

class HearthstoneSeasonPage extends React.Component<HearthstoneSeasonPageProps, void> {
    componentDidMount() {
        const { params, getSeason } = this.props;
        getSeason(params['url']);
    }

    handlePost() {
        const { createSeason, updateSeason, season, params } = this.props;

        if (params['url'] == 'add') {
            createSeason(season.item);
        } else {
            updateSeason(season.item);
        }

        window.scrollTo(0, 0);
    }
    
    render() {
        const { season, params, changeField } = this.props;

        if (season.fetched) {
            document.title = season.item.title + ' - Hearthstone Season | Admin';
        } else {
            document.title = 'Add - Games | Admin';
        }

        return (
            <div className="container-fluid">
                <PageHeader title={params['url'] == 'add' ? 'Add Hearthstone Season' : season.item.title } />
                <Alert fetch={season} />
                <Form fields={HearthstoneSeasonFields} data={season.item} change={(f, v) => changeField(f, v)} submit={this.handlePost.bind(this)} />
            </div>
        );
    }
}

export default HearthstoneSeasonPage;
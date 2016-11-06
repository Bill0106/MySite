import { RouteComponentProps } from 'react-router';
import axios from 'axios';

const LIST_PER_PAGE = 30;
export let ListPerPage = LIST_PER_PAGE;

export interface ListProps extends RouteComponentProps<{}, {}> {}

export interface ListState {
    list: any;
    total: number;
}

export interface ListMainProps {
    title: string;
    total: number;
    fields: any;
    data: any;
    per: number;
    current: number;
}

export interface ListItemProps {
    data: any;
}

export function fetchApi(url, page, callback, per = LIST_PER_PAGE) {
    let apiUrl = '/api/' + url + '?limit=' + per + (page ? '&page=' + page : '');

    axios.get(apiUrl)
        .then(response => {
            callback(response.data);
        });
}
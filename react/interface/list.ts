import { RouteComponentProps } from 'react-router';
import axios from 'axios';

export interface ListProps extends RouteComponentProps<{}, {}> {}

export interface ListState {
    list: any;
    total: number;
    page: any;
}

export interface ListTableProps {
    title: string;
    total: number;
    fields: any;
    data: any;
    per: number;
    current: number;
    delete: any;
}

export interface ListItemProps {
    data: any;
    delete: any;
    func?: any;
}
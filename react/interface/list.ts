import { RouteComponentProps } from 'react-router';

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
    active: any;
}

export interface ListItemProps {
    data: any;
    delete: any;
    func?: any;
}
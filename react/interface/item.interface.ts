import { RouteComponentProps } from 'react-router';

export interface ItemProps extends RouteComponentProps<void, void> {
    item: any;
    getItem: any
}
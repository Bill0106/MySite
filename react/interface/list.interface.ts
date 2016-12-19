import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export interface ListProps extends RouteComponentProps<void, void> {
    type: string;
    list: any;
    getList: any;
    postDelete: any;
}

export interface ListItemProps extends React.Props<any> {
    data: any;
    delete: any;
}
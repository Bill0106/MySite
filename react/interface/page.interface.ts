import * as React from 'react';

export interface PageHeaderProps extends React.Props<any> {
    title: string;
    total?: number;
    button?: boolean;
}

export interface PaginatorProps extends React.Props<any> {
    total: number;
    per: number;
    current: number;
    path: string;
}
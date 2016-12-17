import * as React from 'react';

export interface DashboardListProps extends React.Props<any> {
    counts: any;
    getCounts: any;
}

export interface DashboardItemProps {
    title: string;
    count: number;
}
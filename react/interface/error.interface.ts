import * as React from 'react';

export interface ErrorProps extends React.Props<any> {
    status: number;
    text: string;
}
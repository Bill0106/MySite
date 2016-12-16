import { RouteComponentProps } from 'react-router';

export interface GourmetProps extends RouteComponentProps<{}, {}> {}

export interface GourmetState {
    id: string;
    image: string;
    food: string;
    restaurant: string;
    date: string;
    url: string;
}
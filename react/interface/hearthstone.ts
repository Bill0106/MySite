import { RouteComponentProps } from 'react-router';

export interface SeasonProps extends RouteComponentProps<{}, {}> {}

export interface SeasonState {
    id: string;
    image: string;
    title: string;
    month: string;
    rank: number;
    url: string;
    description: string;
}
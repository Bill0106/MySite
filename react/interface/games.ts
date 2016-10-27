import { RouteComponentProps } from 'react-router';

export interface GamesProps extends RouteComponentProps<{}, {}> {}

export interface GamesState {
    list: any;
    total: number;
}

export interface GameItemProps {
    id: string;
    title: string;
    name: string;
    platform: number;
    genre: number;
}
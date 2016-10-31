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
    url: string;
}

export interface GameProps extends RouteComponentProps<{}, {}> {}

export interface GameState {
    image: string;
    title: string;
    name: string;
    developer: string;
    publisher: string;
    release_at: string;
    buy_at: string;
    rate: number;
    url: string;
    platform: number;
    genre: number;
    description: string;
}
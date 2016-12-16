import { RouteComponentProps } from 'react-router';

export interface GameProps extends RouteComponentProps<{}, {}> {}

export interface GameState {
    id: string;
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
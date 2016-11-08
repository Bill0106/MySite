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

export interface MatchState {
    decks: any;
    deck: string;
    opponent: number;
    matches: any;
    wins: number;
}
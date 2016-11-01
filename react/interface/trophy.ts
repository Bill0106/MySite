import { RouteComponentProps } from 'react-router';

export interface TrophyProps extends RouteComponentProps<{}, {}> {}

export interface TrophyState {
    id: string;
    total: number;
    earned: number;
    trophies: any;
    game_id: string;
    url: string;
}

export interface TrophyItemProps {
    index: number;
    trophy: any;
    func: any;
}
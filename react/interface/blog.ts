import { RouteComponentProps } from 'react-router';

export interface BlogProps extends RouteComponentProps<{}, {}> {}

export interface BlogState {
    id                : string;
    file              : any;
    title             : string;
    image             : string;
    summary           : string;
    markdown_contents : string;
    html_contents     : string;
    url               : string;
    game_id           : string;
    published         : boolean;
}
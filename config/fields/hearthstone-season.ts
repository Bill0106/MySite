import { HearthstoneSeasonRanked } from '../hearthstone-season-ranked';

const HEARTHSTONE_SEASON_FIELDS = [
    {
        field: 'image',
        type: 'image',
        placeholder: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=760%C3%97270&w=442&h=150',
    },
    {
        field: 'title',
        type: 'input',
    },
    {
        field: 'month',
        type: 'date',
    },
    {
        field: 'rank',
        type: 'select',
        enum: HearthstoneSeasonRanked
    },
    {
        field: 'url',
        type: 'input',
    },
    {
        field: 'description',
        type: 'text',
    }
];

export let HearthstoneSeasonFields = HEARTHSTONE_SEASON_FIELDS;
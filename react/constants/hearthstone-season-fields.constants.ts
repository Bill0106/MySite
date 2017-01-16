import { HearthstoneSeasonRanked } from '../../config/hearthstone-season-ranked';

const HearthstoneSeasonFields = [
    {
        name: 'image',
        type: 'image',
        placeholder: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=760%C3%97270&w=442&h=150',
    },
    {
        name: 'title',
        type: 'input',
    },
    {
        name: 'month',
        type: 'date',
    },
    {
        name: 'rank',
        type: 'select',
        enum: HearthstoneSeasonRanked,
    },
    {
        name: 'url',
        type: 'input',
    },
    {
        name: 'description',
        type: 'text',
    },
];

export default HearthstoneSeasonFields;
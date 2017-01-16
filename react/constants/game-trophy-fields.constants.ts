import { TrophyRarity } from '../../config/trophy-rarity';

const GameTrophyFields = [
    {
        field: 'title',
        type: 'input',
    },
    {
        field: 'description',
        type: 'input',
    },
    {
        field: 'image',
        type: 'input',
    },
    {
        field: 'date',
        type: 'date',
    },
    {
        field: 'rarity',
        type: 'select',
        enum: TrophyRarity,
    },
];

export default GameTrophyFields;
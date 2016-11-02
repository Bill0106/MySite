import { TrophyRarity } from './trophy-rarity';

const TROPHY_FIELDS = [
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
        enum: TrophyRarity
    }
];

export let TrophyFields = TROPHY_FIELDS;
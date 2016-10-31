import { gameGenres } from './game-genres';
import { gamePlatforms } from './game-playforms';

const GAME_FIELDS = [
    {
        field: 'image',
        type: 'image',
        placeholder: 'https://placeholdit.imgix.net/~text?txtsize=30&txt=570%C3%97570&w=150&h=150',
    },
    {
        field: 'title',
        type: 'input',
    },
    {
        field: 'name',
        type: 'input',
    },
    {
        field: 'developer',
        type: 'input',
    },
    {
        field: 'publisher',
        type: 'input',
    },
    {
        field: 'release_at',
        type: 'date',
    },
    {
        field: 'buy_at',
        type: 'date',
    },
    {
        field: 'rate',
        type: 'radio',
        enum: ['1', '2', '3', '4', '5']
    },
    {
        field: 'url',
        type: 'input',
    },
    {
        field: 'platform',
        type: 'select',
        enum: gamePlatforms
    },
    {
        field: 'genre',
        type: 'select',
        enum: gameGenres
    },
    {
        field: 'description',
        type: 'text',
    }
];

export let GameFields = GAME_FIELDS;
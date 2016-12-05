import { GameGenres } from '../game-genres';
import { GamePlatforms } from '../game-platforms';

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
        enum: GamePlatforms
    },
    {
        field: 'genre',
        type: 'select',
        enum: GameGenres
    },
    {
        field: 'description',
        type: 'text',
    }
];

export let GameFields = GAME_FIELDS;
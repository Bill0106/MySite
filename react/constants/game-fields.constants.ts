import { GameGenres } from '../../config/game-genres';
import { GamePlatforms } from '../../config/game-platforms';

const GAME_FIELDS = [
    {
        name: 'image',
        type: 'image',
        placeholder: 'https://placeholdit.imgix.net/~text?txtsize=30&txt=570%C3%97570&w=150&h=150',
    },
    {
        name: 'title',
        type: 'input',
    },
    {
        name: 'name',
        type: 'input',
    },
    {
        name: 'developer',
        type: 'input',
    },
    {
        name: 'publisher',
        type: 'input',
    },
    {
        name: 'release_at',
        type: 'date',
    },
    {
        name: 'buy_at',
        type: 'date',
    },
    {
        name: 'rate',
        type: 'radio',
        enum: ['1', '2', '3', '4', '5']
    },
    {
        name: 'url',
        type: 'input',
    },
    {
        name: 'platform',
        type: 'select',
        enum: GamePlatforms
    },
    {
        name: 'genre',
        type: 'select',
        enum: GameGenres
    },
    {
        name: 'description',
        type: 'text',
    }
];

export const GameFields = GAME_FIELDS;
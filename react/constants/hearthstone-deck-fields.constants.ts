import { HearthstonePlayerClasses } from '../../config/hearthstone-player-classes';

const HEARTHSTONE_DECK_FIELDS = [
    {
        name: 'name',
        type: 'input',
    },
    {
        name: 'playerClass',
        type: 'select',
        enum: HearthstonePlayerClasses,
    },
    {
        name: 'active',
        type: 'checkbox',
        enum: [
            {
                value: 1,
                name: 'Active',
            },
            {
                value: 0,
                name: 'Inactive',
            },
        ],
    },
];

export const HearthstoneDeckFields = HEARTHSTONE_DECK_FIELDS;
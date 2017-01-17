import { HearthstonePlayerClasses } from '../../config/hearthstone-player-classes';

const HearthstoneDeckFields = [
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
                value: true,
                name: 'Active',
            },
            {
                value: false,
                name: 'Inactive',
            },
        ],
    },
];

export default HearthstoneDeckFields;
import { TrophyRarity } from "../../config/trophy-rarity"

const GAME_TROPHY_FIELDS = [
    {
        field: "title",
        type: "input",
    },
    {
        field: "description",
        type: "input",
    },
    {
        field: "image",
        type: "input",
    },
    {
        field: "date",
        type: "date",
    },
    {
        field: "rarity",
        type: "select",
        enum: TrophyRarity
    }
]

export let GameTrophyFields = GAME_TROPHY_FIELDS
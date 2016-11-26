import * as mongoose from 'mongoose';

export interface IHearthstoneCard extends mongoose.Document {
    cardId      : string;
    name        : string;
    image       : string;
    cost        : number;
    playerClass : number;
    rarity      : number;
    standard    : boolean;
}

export let hearthstoneCardSchema = new mongoose.Schema({
    cardId      : String,
    name        : String,
    image       : String,
    cost        : Number,
    playerClass : Number,
    rarity      : Number,
    standard    : Boolean
})

export let repositry = mongoose.model<IHearthstoneCard>("HearthstoneCard", hearthstoneCardSchema);
import * as mongoose from 'mongoose';

export interface IHearthstoneDeck extends mongoose.Document {
    name        : string;
    playerClass : number;
    cards       : any;
    active      : boolean;
}

export let hearthstoneDeckSchema = new mongoose.Schema({
    name        : String,
    playerClass : Number,
    cards       : Array,
    active      : Boolean
})

export let repositry = mongoose.model<IHearthstoneDeck>("HearthstoneDeck", hearthstoneDeckSchema);
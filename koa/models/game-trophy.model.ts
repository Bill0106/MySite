import * as mongoose from 'mongoose';

export interface IGameTrophy extends mongoose.Document {
    game_id  : string;
    earned   : number;
    total    : number;
    trophies : any;
}

export let gameTrophySchema = new mongoose.Schema({
    game_id  : String,
    earned   : Number,
    total    : Number,
    trophies : Array
})

export let repositry = mongoose.model<IGameTrophy>('GameTrophy', gameTrophySchema);
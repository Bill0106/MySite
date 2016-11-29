import * as mongoose from 'mongoose';

export interface IGame extends mongoose.Document {
    title       : string;
    name        : string;
    publisher   : string;
    developer   : string;
    release_at  : number;
    buy_at      : number;
    rate        : number;
    image       : string;
    url         : string;
    platform    : number;
    genre       : number;
    description : number;
    trophies    : string;
}

export let gameSchema = new mongoose.Schema({
    title       : String,
    name        : String,
    publisher   : String,
    developer   : String,
    release_at  : Number,
    buy_at      : Number,
    rate        : Number,
    image       : String,
    url         : String,
    platform    : Number,
    genre       : Number,
    description : String,
    trophies    : String
});

export let repositry = mongoose.model<IGame>("Game", gameSchema);
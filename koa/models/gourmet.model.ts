import * as mongoose from 'mongoose';

export interface IGourmet extends mongoose.Document {
    food       : string;
    restaurant : string;
    date       : number;
    image      : string;
    url        : string;
}

export let gourmetSchema = new mongoose.Schema({
    food       : String,
    restaurant : String,
    date       : Number,
    image      : String,
    url        : String
})

export let repositry = mongoose.model<IGourmet>('Gourmet', gourmetSchema);
import * as mongoose from 'mongoose';

export interface IHearthstoneSeason extends mongoose.Document {
    title       : string;
    month       : number;
    rank        : number;
    image       : string;
    url         : string;
    description : string;
}

export let hearthstoneSeasonSchema = new mongoose.Schema({
    title       : String,
    month       : Number,
    rank        : Number,
    image       : String,
    url         : String,
    description : String
})

export let repositry = mongoose.model<IHearthstoneSeason>("HearthstoneSeason", hearthstoneSeasonSchema);
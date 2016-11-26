import * as mongoose from 'mongoose';

export interface IHearthstoneMatch extends mongoose.Document {
    deck_id  : string;
    opponent : number;
    result   : number;
    time     : number;
};

export let hearthstoneMatchSchema = new mongoose.Schema({
    deck_id  : String,
    opponent : Number,
    result   : Number,
    time     : Number
});

export let repositry = mongoose.model<IHearthstoneMatch>("HearthstoneMatch", hearthstoneMatchSchema);
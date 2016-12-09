import * as mongoose from 'mongoose';

export interface IBlog extends mongoose.Document {
    title             : string;
    image             : string;
    summary           : string;
    markdown_contents : string;
    html_contents     : string;
    url               : string;
    game_id           : string;
    published         : boolean;
    created_at        : number;
    updated_at        : number;
}

export let blogSchema = new mongoose.Schema({
    title             : String,
    image             : String,
    summary           : String,
    markdown_contents : String,
    html_contents     : String,
    url               : String,
    game_id           : String,
    published         : Boolean,
    created_at        : Number,
    updated_at        : Number,
});

export let repositry = mongoose.model<IBlog>("Blog", blogSchema);
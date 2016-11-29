import * as mongoose from 'mongoose';

import * as GameTrophy from '../models/game-trophy.model';
import * as Game from '../models/game.model';

const handel = async () => {
    (<any>mongoose).Promise = global.Promise;
    mongoose.connect('mongodb://localhost/database');
    mongoose.connection.on('error', console.error);

    let games = await Game.repositry.find();

    await Promise.all(games.map(async (game) => {
        if (game.trophies) {
            await dataFix(game);
        }
    }));

    process.exit();
}

async function dataFix(game: Game.IGame) {
    let trophy = await GameTrophy.repositry.findById(game.trophies);

    let newData = [];
    await trophy.trophies.map(value => {
        value.title = new Buffer(value.title).toString('base64');
        value.description = new Buffer(value.description).toString('base64');
        newData.push(value);
    });
    
    trophy.game_id = game._id;
    trophy.trophies = newData;
    await trophy.update(trophy);
    console.log('Game', game.name, 'Saved');
}

handel();
import axios from 'axios';
import * as cheerio from 'cheerio';
import * as moment from 'moment';

import * as GameTrophy from '../models/game-trophy.model';
import * as Game from '../models/game.model';

import { TrophyRarity } from '../../config/trophy-rarity';

const find = async (ctx) => {
    try {
        let game = await Game.repositry.findOne({ url: ctx.params.url });
        if (!game) {
            throw "Game Not Found";
        }

        let trophy = await GameTrophy.repositry.findOne({ game_id: game._id });
        let trophies = [];
        await trophy.trophies.map(value => {
            value.title = new Buffer(value.title, 'base64').toString();
            value.description = new Buffer(value.description, 'base64').toString();
            trophies.push(value);
        })
        trophy.trophies = trophies;

        ctx.body = trophy;
    } catch (error) {
        ctx.status = ctx.status || 500;
        ctx.body = error.message;
    }
}

const create = async (ctx) => {
    try {
        let data = ctx.request.body;
        let html = await requestPage(data.url);
        let $ = cheerio.load(html);
        let items = $("div.element div.box table.zebra tr");

        let array = [];
        let earned = 0;
        await items.each((i, element) => {
            let titleElement = $("a.bold", $(element));
            let title = titleElement.text().trim();
            let titleLength = title.length;
            let text = titleElement.parent().text().trim();
            let rarity = $("center.gradient-separator img", $(element)).attr('title');

            let date: number = 0;
            if ($("span.typo-top-date", $(element)).length > 0) {
                date = moment($("span.typo-top-date", $(element)).text().trim(), 'Do MMM YYYY').valueOf();
                earned++;
            }

            let item = {
                title: new Buffer(title).toString('base64'),
                description: new Buffer(text.substr(titleLength)).toString('base64'),
                image: $("img.trophy_image", $(element)).attr('src'),
                rarity: TrophyRarity.find(value => value.name == rarity).value,
                date: date
            };

            array.push(item);
        });

        let newData = {
            game_id: data.game_id,
            earned: earned,
            total: array.length,
            trophies: array
        }

        let trophy = new GameTrophy.repositry(newData);
        await trophy.save();

        ctx.body = {
            success: true,
            data: {
                id: trophy._id
            }
        }
    } catch (error) {
        ctx.status = ctx.status || 500;
        ctx.body = error.message;
    }
}

const update = async (ctx) => {
    try {
        let data = ctx.request.body;
        let trophies = [];
        await data.trophies.map(value => {
            value.title = new Buffer(value.title).toString('base64');
            value.description = new Buffer(value.description).toString('base64');
            value.date = moment(value.date, 'YYYY-MM-DD').valueOf();
            trophies.push(value);
        })
        data.trophies = trophies;

        await GameTrophy.repositry.findByIdAndUpdate(data.id, data);
        ctx.body = {
            success: true,
            data: {
                id: data.id
            }
        }
    } catch (error) {
        ctx.status = ctx.status || 500;
        ctx.body = error.message;
    }
}

function requestPage(url): any {
    return new Promise((resolve, reject) => {
        axios.get(url)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            })
    })
}

export default { find, create, update }
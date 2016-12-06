import * as mongoose from 'mongoose';
import axios from 'axios';

import * as Card from '../models/hearthstone-card.model';

import { Keys } from '../../config/keys';
import { HsPlayerClasses } from '../../config/hs-player-classes';
import { HsCardRarity } from '../../config/hs-card-rarity';

const CARD_TYPE = ['Spell', 'Minion', 'Weapon'];
const CARD_SET = ['Naxxramas', 'Goblins vs Gnomes'];

const handle = async () => {
    console.log('Requesting API ...');
    try {
        const data = await requestAPI();
        let cards = [];
        await Object.keys(data).map(key => {
            if (data[key].length) {
                cards = cards.concat(data[key]);
            }
        });
        cards = cards.filter(card => CARD_TYPE.indexOf(card.type) >= 0);

        (<any>mongoose).Promise = global.Promise;
        mongoose.connect('mongodb://localhost/database');
        mongoose.connection.on('error', console.error);

        let updated = 0;
        let created = 0;
        for (let item of cards) {
            let newData = {
                cardId: item.cardId,
                name: item.name,
                image: item.img,
                cost: item.cost,
                playerClass: item.playerClass == 'Neutral' ? -1 : HsPlayerClasses.find(player => player.name == item.playerClass).value,
                rarity: HsCardRarity.find(rarity => rarity.name == item.rarity).value,
                standard: CARD_SET.indexOf(item.cardSet) >= 0 ? false : true
            }

            let card = await Card.repositry.findOne({ cardId: newData.cardId });
            if (card) {
                await card.update(newData);
                updated++;
                console.log(newData.name, 'Updated!');
            } else {
                await new Card.repositry(newData).save();
                created++;
                console.log(newData.name, 'Created!');
            }
        }

        console.log('Total:', cards.length, 'Updated:', updated, 'Created:', created);
        process.exit();
    } catch (error) {
        console.log(error);
        process.exit();
    }
}

function requestAPI(): any {
    return new Promise((resolve, reject) => {
        axios.get('https://omgvamp-hearthstone-v1.p.mashape.com/cards?collectible=1', {
            headers: {
                "X-Mashape-Key": Keys.mashape
            }
        }).then(response => {
            resolve(response.data);
        }).catch(error => {
            reject(error);
        })
    })
}

handle();
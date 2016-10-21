import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { HearthstoneDeckService } from '../services/hearthstone-deck.service';
import { HearthstoneDeck } from '../models/hearthstone-deck';

@Component({
    selector: 'my-hearthstone-deck',
    templateUrl: '../../resources/views/hearthstone-deck.html',
    providers: [ HearthstoneDeckService ]
})

export class HearthstoneDeckComponent implements OnInit {
    deck: HearthstoneDeck;
    cards: any;

    constructor(
        private hearthstoneDeckService: HearthstoneDeckService,
        private router: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.router.params.forEach((params: Params) => {
            this.hearthstoneDeckService
                .getDeck(params['id'])
                .then(deck => {
                    this.deck = deck;

                    let tmp = [];
                    deck.cards.forEach((card) => {
                        if (Object.keys(tmp).indexOf(card._id) > 0) {
                            tmp[card._id].count = 2;
                        } else {
                            tmp[card._id] = {
                                card: card,
                                count: 1
                            };
                        }
                    });

                    this.cards = Object.values(tmp);
                });
        })
    }
}